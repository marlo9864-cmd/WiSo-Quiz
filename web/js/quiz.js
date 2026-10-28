/* WiSo-Quiz – Quiz-Logik ohne Abhängigkeiten.
   Inhalte: js/fragen.js (globalThis.QUIZ_DATA). Fortschritt: localStorage dieses Geräts.
   Der Speicher-Schlüssel ist eigen, weil auf derselben Adresse noch das Datenschutz-Quiz liegt. */
(() => {
  'use strict';

  const app = document.getElementById('app');
  const topbar = document.getElementById('topbar');
  const bar = document.getElementById('actionbar');
  const DATA = globalThis.QUIZ_DATA;
  if (!DATA || !Array.isArray(DATA.kapitel) || !DATA.kapitel.length) {
    app.innerHTML = '<p class="load-error">Die Fragen konnten nicht geladen werden. Bitte die Seite neu laden.</p>';
    return;
  }

  // Geschützte Leerzeichen, damit „§ 622“, „Abs. 1“, „25.000 €“, „4 %“ oder „24 Werktage“
  // beim Umbruch nicht auseinanderbrechen.
  const NBSP = ' ';
  const EINHEIT = 'Stunden?|Minuten|Werktage|Arbeitstage|Kalendertage|Tagen?|Wochen?|Monaten?|Monat|Jahren?|Jahr|' +
    'Beschäftigte|Mitarbeitende|Mitglieder|Stück|Prozent|Personen|Euro';
  const nb = t => String(t)
    .replace(/\b(z|u|d)\. (B|a|h)\./g, '$1.' + NBSP + '$2.')
    .replace(/\b(Art|Abs|Nr|lit|Aufg|Kap|Satz)\. (?=[\dIVXa-j])/g, '$1.' + NBSP)
    .replace(/(§§?) (?=\d)/g, '$1' + NBSP)
    .replace(/(\d) (€|%)/g, '$1' + NBSP + '$2')
    .replace(new RegExp('(\\d) (' + EINHEIT + ')\\b', 'g'), '$1' + NBSP + '$2');

  const KAP = DATA.kapitel.map(k => ({ nr: k.nr, titel: nb(k.titel), bereich: nb(k.bereich) }));
  const LZ = (DATA.lernziele || []).map(l => ({ id: l.id, kapitel: l.kapitel, text: nb(l.text), abgeleitet: !!l.abgeleitet }));
  const LZ_BY_ID = Object.fromEntries(LZ.map(l => [l.id, l]));

  const QS = [];
  for (const k of DATA.kapitel) {
    for (const f of k.fragen) {
      const q = {
        id: k.nr + '-' + f.nr,
        kap: k.nr,
        nr: f.nr,
        typ: f.typ,
        lernziel: f.lernziel || null,
        zusatz: !!f.zusatz,
        zusatzGrund: nb(f.zusatzGrund || ''),
        ctx: (f.sachverhalt || []).map(nb),
        frage: nb(f.frage),
        bg: nb(f.begruendung)
      };
      if (f.typ === 'auswahl') {
        q.opts = f.antworten.map(nb);
        q.key = f.loesung.slice().sort((a, b) => a - b);
        q.neg = !!f.negativ;
      } else if (f.typ === 'zuordnung') {
        q.optionen = f.optionen.map(nb);
        q.aussagen = f.aussagen.map(nb);
        q.key = f.loesung.slice();
      } else if (f.typ === 'reihenfolge') {
        q.schritte = f.schritte.map(nb);
        q.key = f.loesung.slice();
      } else if (f.typ === 'eingabe') {
        q.art = f.art;
        q.einheit = f.einheit || '';
        q.key = f.loesung;
        q.toleranz = typeof f.toleranz === 'number' ? f.toleranz : 0;
      }
      QS.push(q);
    }
  }
  const BY_ID = Object.fromEntries(QS.map(q => [q.id, q]));
  const LETTERS = 'ABCDEFGH';
  const STORE = 'wiso-quiz:v1';
  const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const kapVon = KAP[0].nr, kapBis = KAP[KAP.length - 1].nr;
  const ZUSATZ_N = QS.filter(q => q.zusatz).length;

  const ICON = {
    check: '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.4l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    x: '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    back: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M10 3.5L5.5 8l4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const standText = () => {
    if (!DATA.stand) return '';
    const [j, m] = String(DATA.stand).split('-');
    return m ? m + '/' + j : j;
  };

  // ---------------------------------------------------------------- Zustand
  const fresh = () => ({ view: 'start', filter: 'all', shuffle: false, zusatz: true, run: null, review: null, last: null, history: {} });
  let state = fresh();

  const isFilter = f => typeof f === 'string' &&
    (f === 'all' || f === 'wrong' || f === 'extra' ||
      KAP.some(k => String(k.nr) === f) ||
      (f.startsWith('lz:') && LZ_BY_ID[f.slice(3)]));

  const clampIdx = (i, n) => Math.min(Math.max(0, i | 0), n - 1);
  const validIds = ids => Array.isArray(ids) && ids.length > 0 && ids.every(id => BY_ID[id]);

  // Eine Antwort je Aufgabentyp aus dem Speicher säubern
  function cleanSel(q, raw) {
    if (q.typ === 'auswahl') {
      return Array.isArray(raw) ? raw.filter(n => Number.isInteger(n) && n >= 1 && n <= q.opts.length) : [];
    }
    if (q.typ === 'zuordnung') {
      const n = q.optionen.length;
      return q.aussagen.map((_, i) => {
        const v = Array.isArray(raw) ? raw[i] : null;
        return Number.isInteger(v) && v >= 1 && v <= n ? v : null;
      });
    }
    if (q.typ === 'reihenfolge') {
      const n = q.schritte.length;
      const ok = Array.isArray(raw) && raw.length === n &&
        raw.every(v => Number.isInteger(v) && v >= 1 && v <= n) && new Set(raw).size === n;
      return ok ? raw.slice() : q.schritte.map((_, i) => i + 1);
    }
    return typeof raw === 'string' ? raw.slice(0, 40) : '';
  }
  const leereSel = q => cleanSel(q, null);

  function sanitize(s) {
    const out = fresh();
    if (!s || typeof s !== 'object') return out;
    if (isFilter(s.filter)) out.filter = s.filter;
    out.shuffle = !!s.shuffle;
    out.zusatz = s.zusatz !== false;
    if (s.history && typeof s.history === 'object') {
      for (const [id, v] of Object.entries(s.history)) {
        if (BY_ID[id] && typeof v === 'boolean') out.history[id] = v;
      }
    }
    if (s.run && validIds(s.run.ids)) {
      const sel = {}, done = {};
      for (const id of s.run.ids) {
        sel[id] = cleanSel(BY_ID[id], s.run.sel ? s.run.sel[id] : null);
        if (s.run.done && s.run.done[id]) done[id] = true;
      }
      out.run = { ids: s.run.ids.slice(), idx: clampIdx(s.run.idx, s.run.ids.length), sel, done, finished: !!s.run.finished };
    }
    if (s.review && validIds(s.review.ids)) {
      out.review = { ids: s.review.ids.slice(), idx: clampIdx(s.review.idx, s.review.ids.length), from: s.review.from === 'result' ? 'result' : 'start' };
    }
    if (s.last && typeof s.last.score === 'number' && typeof s.last.total === 'number' && Array.isArray(s.last.wrong)) {
      out.last = { score: s.last.score, total: s.last.total, wrong: s.last.wrong.filter(id => BY_ID[id]) };
    }
    if (['start', 'quiz', 'result', 'review', 'notes', 'goals'].includes(s.view)) out.view = s.view;
    if (out.view === 'quiz' && (!out.run || out.run.finished)) out.view = 'start';
    if (out.view === 'result' && (!out.run || !out.run.finished)) out.view = 'start';
    if (out.view === 'review' && !out.review) out.view = 'start';
    if (out.filter === 'wrong' && !(out.last && out.last.wrong.length)) out.filter = 'all';
    return out;
  }
  function load() {
    try { const raw = localStorage.getItem(STORE); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) { /* ohne Speicher läuft das Quiz trotzdem */ }
  }

  // ---------------------------------------------------------------- Auswerten
  // "1.050.000", "1.050.000,50", "1050000" und "1050000.5" werden alle verstanden
  const zahl = s => {
    const t = String(s).trim().replace(/[\s€%]/g, '');
    if (!t) return null;
    let norm;
    if (t.includes(',')) norm = t.replace(/\./g, '').replace(',', '.');
    else if (/^-?\d{1,3}(\.\d{3})+$/.test(t)) norm = t.replace(/\./g, ''); // Punkte als Tausendertrennzeichen
    else norm = t;
    if (!/^-?\d+(\.\d+)?$/.test(norm)) return null;
    const v = Number(norm);
    return Number.isFinite(v) ? v : null;
  };
  // Zahl in deutscher Schreibweise: 1.050.000 bzw. 1.234,56
  const zahlText = n => {
    const [ganz, rest] = String(n).split('.');
    const mitPunkten = ganz.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return rest ? mitPunkten + ',' + rest : mitPunkten;
  };
  const loesungText = q => (q.art === 'datum' ? q.key : zahlText(q.key)) + (q.einheit ? NBSP + q.einheit : '');
  const datum = s => {
    const m = String(s).trim().match(/^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/);
    if (!m) return null;
    const [, t, mo, j] = m.map(Number);
    const d = new Date(j, mo - 1, t);
    if (d.getFullYear() !== j || d.getMonth() !== mo - 1 || d.getDate() !== t) return null;
    return String(t).padStart(2, '0') + '.' + String(mo).padStart(2, '0') + '.' + j;
  };

  function hasAnswer(q, sel) {
    if (q.typ === 'auswahl') return (sel || []).length > 0;
    if (q.typ === 'zuordnung') return (sel || []).every(v => v !== null);
    if (q.typ === 'reihenfolge') return true;
    return String(sel || '').trim().length > 0;
  }
  function isRight(q, sel) {
    if (q.typ === 'auswahl') {
      const s = sel || [];
      return s.length === q.key.length && q.key.every(n => s.includes(n));
    }
    if (q.typ === 'zuordnung' || q.typ === 'reihenfolge') {
      const s = sel || [];
      return s.length === q.key.length && q.key.every((n, i) => s[i] === n);
    }
    if (q.art === 'datum') return datum(sel) !== null && datum(sel) === datum(q.key);
    const v = zahl(sel);
    return v !== null && Math.abs(v - q.key) <= q.toleranz + 1e-9;
  }

  function idsFor(filter) {
    if (filter === 'wrong' && state.last && state.last.wrong.length) return state.last.wrong.slice();
    if (filter === 'extra') return QS.filter(q => q.zusatz).map(q => q.id);
    if (filter.startsWith('lz:')) {
      const id = filter.slice(3);
      return QS.filter(q => q.lernziel === id).map(q => q.id);
    }
    const imKapitel = filter === 'all' ? QS : QS.filter(q => String(q.kap) === filter);
    return imKapitel.filter(q => state.zusatz || !q.zusatz).map(q => q.id);
  }
  function shuffled(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function joinLetters(nums) {
    const l = nums.slice().sort((a, b) => a - b).map(n => LETTERS[n - 1]);
    return l.length < 2 ? l.join('') : l.slice(0, -1).join(', ') + ' und ' + l[l.length - 1];
  }
  const ref = q => 'Kap.' + NBSP + q.kap + ' · Aufgabe ' + q.nr;
  const plural = (n, one, many) => n + ' ' + (n === 1 ? one : many);
  const runWrong = run => run.ids.filter(id => !isRight(BY_ID[id], run.sel[id]));
  const runRight = run => run.ids.filter(id => run.done[id] && isRight(BY_ID[id], run.sel[id])).length;

  function startRun(ids) {
    const list = state.shuffle ? shuffled(ids) : ids.slice();
    const sel = {};
    for (const id of list) sel[id] = leereSel(BY_ID[id]);
    state.run = { ids: list, idx: 0, sel, done: {}, finished: false };
    state.view = 'quiz';
    render(true);
  }
  function finishRun() {
    const run = state.run;
    run.finished = true;
    const wrong = runWrong(run);
    state.last = { score: run.ids.length - wrong.length, total: run.ids.length, wrong };
    if (state.filter === 'wrong' && !wrong.length) state.filter = 'all';
    state.view = 'result';
    render(true);
  }
  function openReview(ids, idx, from) {
    state.review = { ids, idx, from };
    state.view = 'review';
    render(true);
  }

  // Stand je Lernziel aus dem letzten Ergebnis jeder Frage über alle Durchgänge
  function lernzielStand() {
    const zeilen = LZ.map(l => {
      const fragen = QS.filter(q => q.lernziel === l.id);
      let ok = 0, bad = 0;
      for (const q of fragen) {
        if (state.history[q.id] === true) ok++;
        else if (state.history[q.id] === false) bad++;
      }
      return { l, n: fragen.length, ok, bad, neu: fragen.length - ok - bad };
    });
    if (ZUSATZ_N) {
      const fragen = QS.filter(q => q.zusatz);
      let ok = 0, bad = 0;
      for (const q of fragen) {
        if (state.history[q.id] === true) ok++;
        else if (state.history[q.id] === false) bad++;
      }
      zeilen.push({ l: { id: 'extra', kapitel: 0, text: 'Wichtiges Prüfungswissen außerhalb der Lernziele', extra: true }, n: fragen.length, ok, bad, neu: fragen.length - ok - bad });
    }
    // Schwächste zuerst. Der Wert reicht von -1 (alles falsch) über 0 (noch nicht geübt)
    // bis +1 (alles richtig) – so stehen Fehler vor Ungeübtem und Gekonntes ganz unten.
    const wert = z => (z.ok - z.bad) / z.n;
    return zeilen.sort((a, b) => wert(a) - wert(b) || b.bad - a.bad || (a.l.id > b.l.id ? 1 : -1));
  }

  // ---------------------------------------------------------------- Bausteine
  function hideTopbar() {
    topbar.hidden = true;
    topbar.innerHTML = '';
  }
  function renderTopbar(label, ids, idx, segClass, backAct, backLabel) {
    topbar.hidden = false;
    topbar.innerHTML =
      '<div class="topbar-row">' +
        '<button type="button" class="back" data-act="' + backAct + '">' + ICON.back + '<span>' + backLabel + '</span></button>' +
        '<span class="pos">' + label + ' <strong>' + (idx + 1) + '</strong> / ' + ids.length + '</span>' +
      '</div>' +
      '<div class="track" aria-hidden="true">' + ids.map((id, i) => '<span class="seg ' + segClass(id, i) + '"></span>').join('') + '</div>';
  }

  const goalChip = q => q.zusatz
    ? '<span class="chip extra">Zusatzwissen</span>'
    : '<span class="chip">Lernziel ' + q.lernziel + '</span>';

  const questionHead = q =>
    '<p class="q-meta"><span>' + ref(q) + '</span>' + goalChip(q) + '</p>' +
    q.ctx.map(t => '<p class="q-ctx">' + t + '</p>').join('') +
    '<p class="q-text">' + q.frage + '</p>';

  function goalNote(q) {
    if (q.zusatz) {
      return q.zusatzGrund
        ? '<section class="goal-note extra"><h2 class="label">Zusatzwissen</h2><p>' + q.zusatzGrund + '</p></section>'
        : '';
    }
    const l = LZ_BY_ID[q.lernziel];
    if (!l) return '';
    return '<section class="goal-note"><h2 class="label">Lernziel ' + l.id + '</h2><p>' + l.text +
      (l.abgeleitet ? ' <span class="chip">abgeleitet</span>' : '') + '</p></section>';
  }

  // ---------- Auswahl ----------
  function optionHTML(q, n, sel, mode) {
    const L = LETTERS[n - 1];
    const isKey = q.key.includes(n);
    const picked = sel.includes(n);
    const text = q.opts[n - 1];
    if (mode === 'pick') {
      return '<button type="button" class="opt" role="checkbox" aria-checked="' + picked + '" data-act="opt" data-n="' + n + '">' +
        '<span class="box" aria-hidden="true">' + ICON.check + '</span><span class="ltr">' + L + '</span>' +
        '<span class="opt-text">' + text + '</span></button>';
    }
    let cls = 'is-idle', icon = '', tag = '';
    if (mode === 'solution') {
      if (isKey) { cls = 'is-key'; icon = ICON.check; tag = q.neg ? 'Ankreuzen · falsche Aussage' : 'Ankreuzen'; }
    } else if (isKey && picked) { cls = 'is-hit'; icon = ICON.check; tag = 'Richtig angekreuzt'; }
    else if (isKey) { cls = 'is-miss'; icon = ICON.check; tag = 'Hätte angekreuzt werden müssen'; }
    else if (picked) { cls = 'is-wrong'; icon = ICON.x; tag = 'Falsch angekreuzt'; }
    return '<div class="opt ' + cls + '" data-n="' + n + '">' +
      '<span class="box" aria-hidden="true">' + icon + '</span><span class="ltr">' + L + '</span>' +
      '<span class="opt-text">' + text + (tag ? '<span class="opt-tag">' + tag + '</span>' : '') + '</span></div>';
  }

  // ---------- Zuordnung und Reihenfolge ----------
  function chips(anzahl, gewaehlt, act, i, aktiv) {
    let out = '<div class="picks" role="group">';
    for (let n = 1; n <= anzahl; n++) {
      out += '<button type="button" class="pick" role="radio" aria-checked="' + (gewaehlt === n) +
        '" data-act="' + act + '" data-i="' + i + '" data-n="' + n + '"' + (aktiv ? '' : ' disabled') + '>' + n + '</button>';
    }
    return out + '</div>';
  }
  function zuordnungHTML(q, sel, mode) {
    const legende = '<div class="legend"><h2 class="label">Begriffe</h2><dl>' +
      q.optionen.map((o, i) => '<div class="row"><dt>' + (i + 1) + '</dt><dd>' + o + '</dd></div>').join('') +
      '</dl></div>';
    const zeilen = q.aussagen.map((a, i) => {
      const gewaehlt = sel[i];
      let cls = '', hinweis = '';
      if (mode !== 'pick') {
        const richtig = q.key[i];
        const trefferMode = mode === 'solution' ? true : gewaehlt === richtig;
        cls = trefferMode ? ' is-hit' : ' is-wrong';
        hinweis = '<span class="resolve">Richtig: ' + richtig + ' · ' + q.optionen[richtig - 1] + '</span>';
      }
      return '<div class="pair' + cls + '"><span class="pair-text">' + a + '</span>' +
        chips(q.optionen.length, mode === 'solution' ? q.key[i] : gewaehlt, 'pair', i, mode === 'pick') +
        hinweis + '</div>';
    }).join('');
    return legende + '<div class="pairs">' + zeilen + '</div>';
  }
  function reihenfolgeHTML(q, sel, mode) {
    const zeilen = q.schritte.map((s, i) => {
      const gewaehlt = mode === 'solution' ? q.key[i] : sel[i];
      let cls = '', hinweis = '';
      if (mode !== 'pick') {
        const richtig = q.key[i];
        cls = (mode === 'solution' || sel[i] === richtig) ? ' is-hit' : ' is-wrong';
        hinweis = '<span class="resolve">Richtiger Platz: ' + richtig + '</span>';
      }
      return '<div class="pair' + cls + '"><span class="pair-text">' + s + '</span>' +
        chips(q.schritte.length, gewaehlt, 'step', i, mode === 'pick') + hinweis + '</div>';
    }).join('');
    return '<div class="steps">' + zeilen + '</div>';
  }

  // ---------- Eingabe ----------
  function eingabeHTML(q, sel, mode) {
    const lsg = q.art === 'datum' ? q.key : zahlText(q.key);
    const platzhalter = q.art === 'datum' ? 'TT.MM.JJJJ' : 'Zahl';
    const wert = mode === 'solution' ? lsg : String(sel || '');
    let cls = '';
    if (mode === 'answer') cls = isRight(q, sel) ? ' is-hit' : ' is-wrong';
    else if (mode === 'solution') cls = ' is-hit';
    const hinweis = mode === 'answer' && !isRight(q, sel)
      ? '<p class="hint">Richtige Lösung: <strong>' + esc(loesungText(q)) + '</strong></p>'
      : (mode === 'pick' ? '<p class="hint">' + (q.art === 'datum' ? 'Datum im Format TT.MM.JJJJ eingeben.' : 'Nur die Zahl eingeben, Nachkommastellen mit Komma.') + '</p>' : '');
    return '<div class="entry"><div class="entry-row">' +
      '<input type="text" id="eingabe" class="' + cls.trim() + '" value="' + esc(wert) + '" placeholder="' + platzhalter + '"' +
      ' inputmode="' + (q.art === 'datum' ? 'numeric' : 'decimal') + '" autocomplete="off" aria-label="Antwort"' +
      (mode === 'pick' ? '' : ' disabled') + '>' +
      (q.einheit ? '<span class="unit">' + esc(q.einheit) + '</span>' : '') +
      '</div>' + hinweis + '</div>';
  }

  function bodyHTML(q, sel, mode) {
    if (q.typ === 'auswahl') {
      return (mode === 'pick' ? '<p class="q-hint">' + (q.key.length > 1 ? 'Alle zutreffenden Antworten antippen.' : 'Eine Antwort antippen.') + '</p>' : '') +
        '<div class="opts" role="group" aria-label="Antworten">' +
        q.opts.map((_, i) => optionHTML(q, i + 1, sel, mode)).join('') + '</div>';
    }
    if (q.typ === 'zuordnung') {
      return (mode === 'pick' ? '<p class="q-hint">Zu jeder Aussage die passende Nummer antippen.</p>' : '') + zuordnungHTML(q, sel, mode);
    }
    if (q.typ === 'reihenfolge') {
      return (mode === 'pick' ? '<p class="q-hint">Jedem Schritt seinen Platz geben – 1 kommt zuerst. Beim Antippen tauschen zwei Schritte die Plätze.</p>' : '') +
        reihenfolgeHTML(q, sel, mode);
    }
    return eingabeHTML(q, sel, mode);
  }

  function solutionText(q) {
    if (q.typ === 'auswahl') {
      const many = q.key.length > 1;
      const letters = joinLetters(q.key);
      return q.neg
        ? 'Gesucht ' + (many ? 'sind die falschen Aussagen ' : 'ist die falsche Aussage ') + letters + '.'
        : 'Richtig ' + (many ? 'sind ' : 'ist ') + letters + '.';
    }
    if (q.typ === 'zuordnung') return 'Die richtige Zuordnung ist oben grün hinterlegt.';
    if (q.typ === 'reihenfolge') return 'Die richtige Reihenfolge ist oben grün hinterlegt.';
    return 'Richtig ist ' + loesungText(q) + '.';
  }
  function verdictHTML(q, sel, mode) {
    if (mode === 'solution') {
      return '<div class="verdict info" id="verdict" tabindex="-1">' + ICON.check + '<p>' + solutionText(q) + '</p></div>';
    }
    return isRight(q, sel)
      ? '<div class="verdict ok" id="verdict" tabindex="-1" role="status">' + ICON.check + '<p><strong>Richtig.</strong> ' +
          (q.typ === 'auswahl' ? 'Alle Kreuze stimmen.' : 'Alles stimmt.') + '</p></div>'
      : '<div class="verdict bad" id="verdict" tabindex="-1" role="status">' + ICON.x + '<p><strong>Nicht ganz.</strong> ' + solutionText(q) + '</p></div>';
  }
  const whyHTML = q => '<section class="why"><h2 class="label">Begründung</h2><p>' + q.bg + '</p></section>';

  // ---------------------------------------------------------------- Ansichten
  function renderStart() {
    hideTopbar();
    const zaehle = f => idsFor(f).length;
    const options = [{ id: 'all', title: 'Alle Kapitel', sub: 'Kapitel ' + kapVon + ' bis ' + kapBis, n: zaehle('all') }].concat(
      KAP.map(k => ({ id: String(k.nr), title: 'Kapitel ' + k.nr, sub: k.titel + ' · ' + k.bereich, n: zaehle(String(k.nr)) })));
    const wrongN = state.last ? state.last.wrong.length : 0;
    if (wrongN) options.push({ id: 'wrong', title: 'Nur meine Fehler', sub: 'aus dem letzten Durchgang', n: wrongN });
    if (ZUSATZ_N) options.push({ id: 'extra', title: 'Nur Zusatzwissen', sub: 'Prüfungswissen außerhalb der Lernziele', n: ZUSATZ_N, extra: true });
    const run = state.run && !state.run.finished ? state.run : null;

    app.innerHTML =
      '<section class="hero">' +
        '<p class="eyebrow">Wirtschafts- und Sozialkunde</p>' +
        '<h1>WiSo-Quiz</h1>' +
        '<p class="lead">' + QS.length + ' praxisbezogene Aufgaben zu den ' + KAP.length + ' Themenblöcken des Kurses – Auswahl, Zuordnung, Reihenfolge und Rechenaufgaben wie in der IHK-Prüfung. Nach jeder Frage siehst du die Lösung mit Begründung und Rechtsgrundlage.</p>' +
        (DATA.stand ? '<p class="stand">Stand der Inhalte: ' + standText() + '</p>' : '') +
      '</section>' +
      (run ? '<div class="resume"><p><strong>Angefangener Durchgang:</strong> Frage ' + (run.idx + 1) + ' von ' + run.ids.length +
        ', bisher ' + runRight(run) + ' richtig.</p></div>' : '') +
      '<p class="section-label" id="lbl-filter">Welche Aufgaben?</p>' +
      '<div class="choices" role="radiogroup" aria-labelledby="lbl-filter">' +
        options.map(o => '<button type="button" class="choice' + (o.extra ? ' is-extra' : '') + '" role="radio" aria-checked="' + (state.filter === o.id) + '" data-act="filter" data-id="' + o.id + '">' +
          '<span class="dot" aria-hidden="true"></span>' +
          '<span><span class="choice-title">' + o.title + '</span><span class="choice-sub">' + o.sub + '</span></span>' +
          '<span class="count">' + o.n + '</span></button>').join('') +
      '</div>' +
      '<button type="button" class="switch-row" role="switch" aria-checked="' + state.zusatz + '" data-act="zusatz">' +
        '<span><span class="choice-title">Zusatzwissen einbeziehen</span><span class="choice-sub">' + ZUSATZ_N + ' Aufgaben außerhalb der Lernziele</span></span>' +
        '<span class="switch" aria-hidden="true"></span></button>' +
      '<button type="button" class="switch-row" role="switch" aria-checked="' + state.shuffle + '" data-act="shuffle">' +
        '<span><span class="choice-title">Reihenfolge mischen</span><span class="choice-sub">Fragen in zufälliger Reihenfolge</span></span>' +
        '<span class="switch" aria-hidden="true"></span></button>' +
      '<p class="section-label">Zum Nachlesen</p>' +
      '<div class="tools">' +
        '<button type="button" class="tool wide" data-act="goals"><strong>Lernziel-Check</strong><span>Alle ' + LZ.length + ' Lernziele mit deinem Stand – die schwächsten zuerst</span></button>' +
        '<button type="button" class="tool" data-act="review-all"><strong>Lösungen durchblättern</strong><span>Alle ' + QS.length + ' Aufgaben mit Begründung</span></button>' +
        '<button type="button" class="tool" data-act="notes"><strong>Merkzettel</strong><span>Fristen, Begriffe, Verwechslungen</span></button>' +
        (DATA.pdf ? '<a class="tool wide" href="./' + encodeURI(DATA.pdf) + '" target="_blank" rel="noopener"><strong>PDF zum Ausdrucken</strong><span>Fragen und Lösungsblatt mit Begründungen</span></a>' : '') +
      '</div>' +
      (state.last ? '<p class="last">Letzter Durchgang: ' + state.last.score + ' von ' + state.last.total + ' richtig.</p>' : '');

    const n = idsFor(state.filter).length;
    bar.innerHTML = '<div class="actionbar-in">' + (run
      ? '<button type="button" class="btn" data-act="start">Neu starten</button><button type="button" class="btn primary grow" data-act="resume">Weitermachen</button>'
      : '<button type="button" class="btn primary" data-act="start"' + (n ? '' : ' disabled') + '>Quiz starten · ' + plural(n, 'Frage', 'Fragen') + '</button>') + '</div>';
  }

  function renderQuiz() {
    const run = state.run;
    const id = run.ids[run.idx];
    const q = BY_ID[id];
    const sel = run.sel[id];
    const done = !!run.done[id];
    renderTopbar('Frage', run.ids, run.idx, (qid, i) => run.done[qid]
      ? (isRight(BY_ID[qid], run.sel[qid]) ? 'ok' : 'bad')
      : (i === run.idx ? 'cur' : ''), 'home', 'Übersicht');
    app.innerHTML = questionHead(q) +
      bodyHTML(q, sel, done ? 'answer' : 'pick') +
      (done ? verdictHTML(q, sel, 'answer') + whyHTML(q) + goalNote(q) : '');
    const isLast = run.idx === run.ids.length - 1;
    bar.innerHTML = '<div class="actionbar-in">' + (done
      ? '<button type="button" class="btn primary" data-act="next">' + (isLast ? 'Zur Auswertung' : 'Nächste Frage') + '</button>'
      : '<button type="button" class="btn primary" data-act="check" id="btn-check"' + (hasAnswer(q, sel) ? '' : ' disabled') + '>Antwort prüfen</button>') + '</div>';
    if (!done && q.typ === 'eingabe') {
      const feld = document.getElementById('eingabe');
      if (feld) {
        feld.addEventListener('input', () => {
          run.sel[id] = feld.value;
          const btn = document.getElementById('btn-check');
          if (btn) btn.disabled = !hasAnswer(q, feld.value);
          save();
        });
        feld.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && hasAnswer(q, feld.value)) { e.preventDefault(); pruefe(); }
        });
      }
    }
  }

  function renderResult() {
    hideTopbar();
    const run = state.run;
    const wrong = runWrong(run);
    const total = run.ids.length;
    const score = total - wrong.length;
    const pct = Math.round(score / total * 100);
    const rows = KAP.map(k => {
      const ids = run.ids.filter(id => BY_ID[id].kap === k.nr);
      return { name: 'Kapitel ' + k.nr + ' · ' + k.titel, n: ids.length, r: ids.filter(id => isRight(BY_ID[id], run.sel[id])).length };
    }).filter(x => x.n > 0);

    // Lernziele, bei denen in diesem Durchgang Fehler waren
    const schwach = [];
    const gesehen = new Set();
    for (const id of wrong) {
      const q = BY_ID[id];
      const key = q.zusatz ? 'extra' : q.lernziel;
      if (gesehen.has(key)) continue;
      gesehen.add(key);
      const betroffen = wrong.filter(x => (BY_ID[x].zusatz ? 'extra' : BY_ID[x].lernziel) === key).length;
      schwach.push({ key, titel: key === 'extra' ? 'Zusatzwissen' : 'Lernziel ' + key,
        text: key === 'extra' ? 'Prüfungswissen außerhalb der Lernziele' : (LZ_BY_ID[key] ? LZ_BY_ID[key].text : ''), n: betroffen });
    }
    schwach.sort((a, b) => b.n - a.n);

    app.innerHTML =
      '<section class="hero">' +
        '<p class="eyebrow">Auswertung</p>' +
        '<p class="score" id="score">' + score + '<small> / ' + total + '</small></p>' +
        '<p class="score-sub">' + pct + '% richtig · ' + (wrong.length ? plural(wrong.length, 'Fehler', 'Fehler') : 'keine Fehler') + '</p>' +
      '</section>' +
      '<div class="bars">' + rows.map(x =>
        '<div class="bar-row"><span class="name">' + x.name + '</span>' +
        '<span class="val">' + x.r + ' / ' + x.n + '</span>' +
        '<span class="bar"><span style="width:' + (x.r / x.n * 100) + '%"></span></span></div>').join('') + '</div>' +
      (schwach.length
        ? '<p class="section-label">Lernziele mit Fehlern</p><div class="goals">' + schwach.map(s =>
            '<button type="button" class="goal' + (s.key === 'extra' ? ' is-extra' : '') + '" data-act="goal-run" data-id="' + s.key + '">' +
            '<span class="gid">' + s.titel + '</span><span class="gval">' + s.n + ' Fehler</span>' +
            '<span class="gtxt">' + s.text + '</span>' +
            '<span class="gsub">Antippen, um nur diese Fragen zu üben</span></button>').join('') + '</div>'
        : '') +
      (wrong.length
        ? '<p class="section-label">Nochmal ansehen</p><div class="redo-list">' + wrong.map((id, i) => {
            const q = BY_ID[id];
            return '<button type="button" class="redo" data-act="review-wrong" data-i="' + i + '"><span class="ref">' + ref(q) + '</span>' +
              '<span class="txt">' + q.frage + '</span></button>';
          }).join('') + '</div>'
        : '<p class="lead all-right">Alle Aufgaben richtig. Für den nächsten Durchgang kannst du auf der Übersicht die Reihenfolge mischen.</p>');
    bar.innerHTML = '<div class="actionbar-in"><button type="button" class="btn" data-act="home">Übersicht</button>' + (wrong.length
      ? '<button type="button" class="btn primary grow" data-act="redo">Fehler wiederholen (' + wrong.length + ')</button>'
      : '<button type="button" class="btn primary grow" data-act="start">Neuer Durchgang</button>') + '</div>';
  }

  function renderGoals() {
    hideTopbar();
    const zeilen = lernzielStand();
    app.innerHTML =
      '<section class="hero"><p class="eyebrow">Wo stehe ich?</p><h1>Lernziel-Check</h1>' +
        '<p class="lead">Je Lernziel zählt das <strong>letzte</strong> Ergebnis jeder Frage über alle Durchgänge. Die schwächsten Lernziele stehen oben. Tippe ein Lernziel an, um nur dessen Fragen zu üben.</p></section>' +
      '<div class="goals">' + zeilen.map(z => {
        const kap = z.l.extra ? 'Zusatzwissen' : 'Kapitel ' + z.l.kapitel + ' · Lernziel ' + z.l.id;
        return '<button type="button" class="goal' + (z.l.extra ? ' is-extra' : '') + '" data-act="goal-run" data-id="' + (z.l.extra ? 'extra' : z.l.id) + '">' +
          '<span class="gid">' + kap + '</span>' +
          '<span class="gval">' + z.ok + ' / ' + z.n + '</span>' +
          '<span class="gtxt">' + z.l.text + (z.l.abgeleitet ? ' <span class="chip">abgeleitet</span>' : '') + '</span>' +
          '<span class="gbar">' +
            (z.ok ? '<span class="s-ok" style="flex:' + z.ok + '"></span>' : '') +
            (z.bad ? '<span class="s-bad" style="flex:' + z.bad + '"></span>' : '') +
            (z.neu ? '<span style="flex:' + z.neu + '"></span>' : '') +
          '</span>' +
          '<span class="gsub">' + z.ok + ' richtig · ' + z.bad + ' falsch · ' + z.neu + ' noch nicht geübt</span>' +
          '</button>';
      }).join('') + '</div>';
    bar.innerHTML = '<div class="actionbar-in"><button type="button" class="btn" data-act="home">Übersicht</button>' +
      '<button type="button" class="btn primary grow" data-act="start">Quiz starten</button></div>';
  }

  function renderReview() {
    const rv = state.review;
    const q = BY_ID[rv.ids[rv.idx]];
    const backAct = rv.from === 'result' && state.run && state.run.finished ? 'to-result' : 'home';
    renderTopbar('Lösung', rv.ids, rv.idx, (id, i) => i === rv.idx ? 'cur' : (i < rv.idx ? 'seen' : ''),
      backAct, backAct === 'to-result' ? 'Auswertung' : 'Übersicht');
    app.innerHTML = questionHead(q) +
      bodyHTML(q, leereSel(q), 'solution') +
      verdictHTML(q, leereSel(q), 'solution') + whyHTML(q) + goalNote(q);
    const isLast = rv.idx === rv.ids.length - 1;
    bar.innerHTML = '<div class="actionbar-in">' +
      '<button type="button" class="btn" data-act="prev-sol"' + (rv.idx === 0 ? ' disabled' : '') + '>Zurück</button>' +
      '<button type="button" class="btn primary grow" data-act="next-sol">' + (isLast ? 'Fertig' : 'Weiter') + '</button></div>';
  }

  function renderNotes() {
    hideTopbar();
    const N = DATA.merkzettel || {};
    const list = (rows, fn) => '<dl class="facts">' + (rows || []).map(fn).join('') + '</dl>';
    const abschnitt = (titel, rows, fn) => (rows && rows.length) ? '<h2 class="notes-h">' + titel + '</h2>' + list(rows, fn) : '';
    app.innerHTML =
      '<section class="hero"><p class="eyebrow">Zum Auswendiglernen</p><h1>Merkzettel</h1>' +
        '<p class="lead">Zahlen, Begriffe, Verwechslungen und Rechenwege aus den ' + QS.length + ' Aufgaben.</p>' +
        (DATA.stand ? '<p class="stand">Stand der Inhalte: ' + standText() + '</p>' : '') + '</section>' +
      abschnitt('Zahlen und Fristen', N.fristen, ([a, b]) => '<div class="fact"><dt>' + nb(a) + '</dt><dd>' + nb(b) + '</dd></div>') +
      abschnitt('Begriffe und Rechtsgrundlagen', N.begriffe, ([a, b, c]) => '<div class="fact"><dt>' + nb(a) + '</dt><dd><strong>' + nb(b) + '</strong><br>' + nb(c) + '</dd></div>') +
      abschnitt('Verwechslungsgefahren', N.verwechslungen, ([a, b]) => '<div class="fact"><dt class="plain">' + nb(a) + '</dt><dd>' + nb(b) + '</dd></div>') +
      abschnitt('Rechenschemata', N.rechenschemata, ([a, b]) => '<div class="fact"><dt class="plain">' + nb(a) + '</dt><dd>' + nb(b) + '</dd></div>') +
      (N.tipp ? '<section class="tip"><h2 class="label">Prüfungstipp</h2><p>' + nb(N.tipp) + '</p></section>' : '');
    bar.innerHTML = '<div class="actionbar-in"><button type="button" class="btn" data-act="home">Übersicht</button>' +
      '<button type="button" class="btn primary grow" data-act="start">Quiz starten</button></div>';
  }

  function render(toTop) {
    const v = state.view;
    if (v === 'quiz') renderQuiz();
    else if (v === 'result') renderResult();
    else if (v === 'review') renderReview();
    else if (v === 'notes') renderNotes();
    else if (v === 'goals') renderGoals();
    else renderStart();
    if (toTop) window.scrollTo(0, 0);
    save();
  }

  // Nach dem Prüfen so weit scrollen, dass die Begründung sichtbar wird – ohne das Ergebnis aus dem Blick zu schieben.
  function revealFeedback() {
    const v = document.getElementById('verdict');
    const w = app.querySelector('.why');
    if (!v || !w) return;
    const headerBottom = topbar.hidden ? 0 : topbar.getBoundingClientRect().bottom;
    const visibleBottom = window.innerHeight - bar.getBoundingClientRect().height - 12;
    const overflow = w.getBoundingClientRect().bottom - visibleBottom;
    if (overflow <= 0) return;
    const room = v.getBoundingClientRect().top - headerBottom - 12;
    const delta = Math.min(overflow, Math.max(0, room));
    if (delta > 0) window.scrollBy({ top: delta, behavior: reduced ? 'auto' : 'smooth' });
  }

  function pruefe() {
    const run = state.run;
    const id = run.ids[run.idx];
    const q = BY_ID[id];
    if (!hasAnswer(q, run.sel[id])) return;
    run.done[id] = true;
    state.history[id] = isRight(q, run.sel[id]);
    render();
    refocus('#verdict');
    revealFeedback();
  }

  // ---------------------------------------------------------------- Bedienung
  // Nur die betroffene Zeile aktualisieren, damit beim Antippen nicht die ganze Seite neu aufgebaut wird
  function markiereChips(i, gewaehlt) {
    for (const b of document.querySelectorAll('.pick[data-i="' + i + '"]')) {
      b.setAttribute('aria-checked', String(Number(b.dataset.n) === gewaehlt));
    }
  }

  function refocus(selector) {
    const el = document.querySelector(selector);
    if (el) { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } }
  }

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    const act = el.dataset.act;
    const run = state.run;
    switch (act) {
      case 'filter':
        state.filter = el.dataset.id;
        render();
        refocus('[data-act="filter"][data-id="' + state.filter + '"]');
        break;
      case 'shuffle':
        state.shuffle = !state.shuffle;
        render();
        refocus('[data-act="shuffle"]');
        break;
      case 'zusatz':
        state.zusatz = !state.zusatz;
        if (!state.zusatz && state.filter === 'extra') state.filter = 'all';
        render();
        refocus('[data-act="zusatz"]');
        break;
      case 'start':
        if (idsFor(state.filter).length) startRun(idsFor(state.filter));
        break;
      case 'resume':
        state.view = 'quiz';
        render(true);
        break;
      case 'opt': {
        const id = run.ids[run.idx];
        if (run.done[id]) return;
        const n = Number(el.dataset.n);
        const sel = (run.sel[id] || []).slice();
        const at = sel.indexOf(n);
        if (at >= 0) sel.splice(at, 1); else sel.push(n);
        run.sel[id] = sel;
        el.setAttribute('aria-checked', String(at < 0));
        const btn = document.getElementById('btn-check');
        if (btn) btn.disabled = !hasAnswer(BY_ID[id], sel);
        save();
        break;
      }
      case 'pair': {
        const id = run.ids[run.idx];
        if (run.done[id]) return;
        const i = Number(el.dataset.i);
        const sel = run.sel[id].slice();
        sel[i] = Number(el.dataset.n);
        run.sel[id] = sel;
        markiereChips(i, sel[i]);
        const btn = document.getElementById('btn-check');
        if (btn) btn.disabled = !hasAnswer(BY_ID[id], sel);
        save();
        break;
      }
      case 'step': {
        // Plätze tauschen, damit immer eine vollständige Reihenfolge entsteht
        const id = run.ids[run.idx];
        if (run.done[id]) return;
        const i = Number(el.dataset.i);
        const n = Number(el.dataset.n);
        const sel = run.sel[id].slice();
        const j = sel.indexOf(n);
        if (j >= 0 && j !== i) { sel[j] = sel[i]; }
        sel[i] = n;
        run.sel[id] = sel;
        markiereChips(i, sel[i]);
        if (j >= 0 && j !== i) markiereChips(j, sel[j]);
        save();
        break;
      }
      case 'check':
        pruefe();
        break;
      case 'next':
        if (run.idx < run.ids.length - 1) { run.idx++; render(true); } else finishRun();
        break;
      case 'home':
        state.view = 'start';
        render(true);
        break;
      case 'to-result':
        state.view = 'result';
        render(true);
        break;
      case 'goals':
        state.view = 'goals';
        render(true);
        break;
      case 'goal-run': {
        const id = el.dataset.id;
        const filter = id === 'extra' ? 'extra' : 'lz:' + id;
        const ids = idsFor(filter);
        if (!ids.length) return;
        state.filter = filter;
        startRun(ids);
        break;
      }
      case 'review-all':
        openReview(QS.map(q => q.id), 0, 'start');
        break;
      case 'review-wrong':
        openReview(runWrong(run), Number(el.dataset.i) || 0, 'result');
        break;
      case 'prev-sol':
        if (state.review.idx > 0) { state.review.idx--; render(true); }
        break;
      case 'next-sol':
        if (state.review.idx < state.review.ids.length - 1) { state.review.idx++; render(true); }
        else { state.view = state.review.from === 'result' && run && run.finished ? 'result' : 'start'; render(true); }
        break;
      case 'redo':
        startRun(state.last.wrong);
        break;
      case 'notes':
        state.view = 'notes';
        render(true);
        break;
    }
  });

  // ---------------------------------------------------------------- Start
  state = sanitize(load());
  render();

  // Offline-Cache (Service Worker) – nur über HTTPS oder lokal verfügbar
  const local = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || local)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => { /* ohne Offline-Cache weiter */ });
    });
  }
})();
