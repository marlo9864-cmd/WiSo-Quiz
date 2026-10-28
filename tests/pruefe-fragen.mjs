// Prüft das Quiz, bevor es veröffentlicht wird (läuft im GitHub-Workflow, lokal: node tests/pruefe-fragen.mjs).
//  1. web/js/fragen.js: Lernziele, Aufbau jeder Aufgabe je Typ, gültige Lösungen, keine doppelten
//     Aufgaben, geschlossene <b>/<mark>-Auszeichnungen, Merkzettel vollständig
//  2. Abdeckung: jedes Lernziel mindestens 2 Fragen ohne Zusatz, Zusatzanteil höchstens 25 %
//  3. web/js/quiz.js und web/sw.js: Syntax
//  4. Offline-Liste in web/sw.js: jede Datei existiert, und jede Datei aus web/ steht in der Liste
//  5. PDF: der in den Metadaten hinterlegte Hash passt zur aktuellen fragen.js
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const WEB = join(ROOT, 'web');
const errors = [];
const fail = (msg) => errors.push(msg);

const MAX_ZUSATZ_ANTEIL = 0.25;
const MIN_FRAGEN_JE_LERNZIEL = 2;
const TYPEN = ['auswahl', 'zuordnung', 'reihenfolge', 'eingabe'];

// ---------------------------------------------------------------- 1. Fragen
const quelle = readFileSync(join(WEB, 'js', 'fragen.js'), 'utf8');
const sandbox = {};
try {
  vm.runInNewContext(quelle, sandbox, { filename: 'fragen.js' });
} catch (e) {
  console.error('web/js/fragen.js lässt sich nicht ausführen:\n' + e.message);
  process.exit(1);
}
const data = sandbox.QUIZ_DATA;
const isText = (t) => typeof t === 'string' && t.trim().length > 0;

function checkMarkup(text, where) {
  for (const tag of ['b', 'mark', 'strong']) {
    const open = (text.match(new RegExp('<' + tag + '>', 'g')) || []).length;
    const close = (text.match(new RegExp('</' + tag + '>', 'g')) || []).length;
    if (open !== close) fail(`${where}: <${tag}> ${open}× geöffnet, ${close}× geschlossen`);
  }
  const unknown = (text.match(/<\/?([a-z]+)[^>]*>/gi) || [])
    .map((t) => t.replace(/[<>/]/g, '').split(/\s/)[0].toLowerCase())
    .filter((t) => !['b', 'mark', 'strong', 'br'].includes(t));
  if (unknown.length) fail(`${where}: unbekannte Auszeichnung <${unknown[0]}>`);
}

function gueltigesDatum(s) {
  const m = typeof s === 'string' && s.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!m) return false;
  const [, t, mo, j] = m.map(Number);
  const d = new Date(j, mo - 1, t);
  return d.getFullYear() === j && d.getMonth() === mo - 1 && d.getDate() === t;
}

// ---- Lernziele
const lernziele = new Map();
if (!Array.isArray(data.lernziele) || data.lernziele.length === 0) {
  fail('QUIZ_DATA.lernziele fehlt oder ist leer');
} else {
  for (const l of data.lernziele) {
    const w = `Lernziel ${l && l.id}`;
    if (!isText(l.id)) { fail(`${w}: "id" fehlt`); continue; }
    if (lernziele.has(l.id)) fail(`${w}: doppelt vorhanden`);
    if (!Number.isInteger(l.kapitel)) fail(`${w}: "kapitel" muss eine ganze Zahl sein`);
    if (!isText(l.text)) fail(`${w}: "text" fehlt`);
    if (typeof l.abgeleitet !== 'boolean') fail(`${w}: "abgeleitet" muss true oder false sein`);
    lernziele.set(l.id, { ...l, fragen: 0 });
  }
}
if (!isText(data.stand) || !/^\d{4}-\d{2}$/.test(data.stand)) {
  fail('QUIZ_DATA.stand fehlt oder hat nicht das Format JJJJ-MM');
}

// ---- Kapitel und Aufgaben
let total = 0;
let zusatzAnzahl = 0;
const proKapitel = [];
const proTyp = Object.fromEntries(TYPEN.map((t) => [t, 0]));

if (!Array.isArray(data.kapitel) || data.kapitel.length === 0) {
  fail('QUIZ_DATA.kapitel fehlt oder ist leer');
} else {
  const seen = new Set();
  const kapitelNummern = new Set(data.kapitel.map((k) => k.nr));
  for (const l of lernziele.values()) {
    if (!kapitelNummern.has(l.kapitel)) fail(`Lernziel ${l.id}: Kapitel ${l.kapitel} gibt es nicht`);
  }

  for (const k of data.kapitel) {
    const kw = `Kapitel ${k.nr}`;
    if (!Number.isInteger(k.nr)) fail(`${kw}: "nr" muss eine ganze Zahl sein`);
    if (!isText(k.titel)) fail(`${kw}: "titel" fehlt`);
    if (!isText(k.bereich)) fail(`${kw}: "bereich" fehlt`);
    if (!Array.isArray(k.fragen) || k.fragen.length === 0) { fail(`${kw}: keine Fragen`); continue; }
    proKapitel.push({ nr: k.nr, titel: k.titel, n: k.fragen.length });

    for (const f of k.fragen) {
      total++;
      const w = `Kapitel ${k.nr}, Aufgabe ${f.nr}`;
      const id = `${k.nr}-${f.nr}`;
      if (!Number.isInteger(f.nr)) fail(`${w}: "nr" muss eine ganze Zahl sein`);
      if (seen.has(id)) fail(`${w}: doppelt vorhanden`);
      seen.add(id);

      // Typ
      if (!TYPEN.includes(f.typ)) { fail(`${w}: "typ" muss ${TYPEN.join(', ')} sein`); continue; }
      proTyp[f.typ]++;

      // Lernziel bzw. Zusatzwissen
      if (typeof f.zusatz !== 'boolean') fail(`${w}: "zusatz" muss true oder false sein`);
      if (f.zusatz) {
        zusatzAnzahl++;
        if (!isText(f.zusatzGrund)) fail(`${w}: Zusatzfrage ohne "zusatzGrund"`);
        if (f.lernziel !== null && f.lernziel !== undefined) fail(`${w}: Zusatzfrage darf kein Lernziel haben`);
      } else {
        if (!isText(f.lernziel)) fail(`${w}: "lernziel" fehlt (oder als Zusatzfrage kennzeichnen)`);
        else if (!lernziele.has(f.lernziel)) fail(`${w}: Lernziel "${f.lernziel}" gibt es nicht`);
        else {
          const l = lernziele.get(f.lernziel);
          l.fragen++;
          if (l.kapitel !== k.nr) fail(`${w}: Lernziel ${f.lernziel} gehört zu Kapitel ${l.kapitel}`);
        }
        if (f.zusatzGrund !== undefined) fail(`${w}: "zusatzGrund" nur bei Zusatzfragen`);
      }
      if (f.fundstelle !== undefined && !isText(f.fundstelle)) fail(`${w}: "fundstelle" ist leer`);

      // gemeinsame Felder
      if (f.sachverhalt !== undefined && (!Array.isArray(f.sachverhalt) || !f.sachverhalt.every(isText))) {
        fail(`${w}: "sachverhalt" muss eine Liste von Absätzen sein`);
      }
      if (!isText(f.frage)) fail(`${w}: "frage" fehlt`);
      if (!isText(f.begruendung)) fail(`${w}: "begruendung" fehlt`);

      const texte = [...(f.sachverhalt || []), f.frage, f.begruendung];

      // Felder je Typ
      if (f.typ === 'auswahl') {
        if (!Array.isArray(f.antworten) || f.antworten.length < 2 || f.antworten.length > 8 || !f.antworten.every(isText)) {
          fail(`${w}: "antworten" braucht 2 bis 8 Texte`);
        } else {
          const n = f.antworten.length;
          texte.push(...f.antworten);
          if (!Array.isArray(f.loesung) || f.loesung.length === 0) fail(`${w}: "loesung" ist leer`);
          else {
            if (!f.loesung.every((x) => Number.isInteger(x) && x >= 1 && x <= n)) fail(`${w}: "loesung" enthält Nummern außerhalb von 1–${n}`);
            if (new Set(f.loesung).size !== f.loesung.length) fail(`${w}: "loesung" enthält eine Nummer doppelt`);
            if (f.loesung.length === n) fail(`${w}: alle Antworten als richtig markiert`);
          }
        }
        if (typeof f.negativ !== 'boolean') fail(`${w}: "negativ" muss true oder false sein`);
      } else if (f.typ === 'zuordnung') {
        const okOpt = Array.isArray(f.optionen) && f.optionen.length >= 2 && f.optionen.every(isText);
        const okAus = Array.isArray(f.aussagen) && f.aussagen.length >= 2 && f.aussagen.every(isText);
        if (!okOpt) fail(`${w}: "optionen" braucht mindestens 2 Texte`);
        if (!okAus) fail(`${w}: "aussagen" braucht mindestens 2 Texte`);
        if (okOpt && okAus) {
          texte.push(...f.optionen, ...f.aussagen);
          const n = f.optionen.length;
          if (!Array.isArray(f.loesung) || f.loesung.length !== f.aussagen.length) {
            fail(`${w}: "loesung" braucht genau ${f.aussagen.length} Einträge (einen je Aussage)`);
          } else if (!f.loesung.every((x) => Number.isInteger(x) && x >= 1 && x <= n)) {
            fail(`${w}: "loesung" enthält Optionsnummern außerhalb von 1–${n}`);
          } else if (new Set(f.loesung).size < Math.min(n, f.aussagen.length) && new Set(f.loesung).size < 2) {
            fail(`${w}: alle Aussagen zeigen auf dieselbe Option`);
          }
        }
      } else if (f.typ === 'reihenfolge') {
        if (!Array.isArray(f.schritte) || f.schritte.length < 2 || !f.schritte.every(isText)) {
          fail(`${w}: "schritte" braucht mindestens 2 Texte`);
        } else {
          texte.push(...f.schritte);
          const n = f.schritte.length;
          const soll = Array.from({ length: n }, (_, i) => i + 1).join(',');
          if (!Array.isArray(f.loesung) || f.loesung.length !== n) {
            fail(`${w}: "loesung" braucht genau ${n} Einträge (einen Platz je Schritt)`);
          } else if (f.loesung.slice().sort((a, b) => a - b).join(',') !== soll) {
            fail(`${w}: "loesung" muss eine Permutation von 1–${n} sein`);
          } else if (f.loesung.join(',') === soll) {
            fail(`${w}: "loesung" entspricht der Anzeigereihenfolge – die Aufgabe wäre ohne Zutun richtig`);
          }
        }
      } else if (f.typ === 'eingabe') {
        if (f.art !== 'zahl' && f.art !== 'datum') fail(`${w}: "art" muss "zahl" oder "datum" sein`);
        if (f.einheit !== undefined && !isText(f.einheit)) fail(`${w}: "einheit" ist leer`);
        if (f.art === 'datum') {
          if (!gueltigesDatum(f.loesung)) fail(`${w}: "loesung" muss ein gültiges Datum im Format TT.MM.JJJJ sein`);
          if (f.toleranz !== undefined) fail(`${w}: "toleranz" gibt es nur bei art "zahl"`);
        } else if (f.art === 'zahl') {
          if (typeof f.loesung !== 'number' || !Number.isFinite(f.loesung)) fail(`${w}: "loesung" muss eine Zahl sein`);
          if (typeof f.toleranz !== 'number' || f.toleranz < 0) fail(`${w}: "toleranz" muss eine Zahl >= 0 sein`);
        }
        for (const feld of ['antworten', 'optionen', 'aussagen', 'schritte', 'negativ']) {
          if (f[feld] !== undefined) fail(`${w}: "${feld}" gehört nicht zum Typ "eingabe"`);
        }
      }

      for (const t of texte) if (typeof t === 'string') checkMarkup(t, w);
    }
  }

  // ---- 2. Abdeckung
  for (const l of lernziele.values()) {
    if (l.fragen < MIN_FRAGEN_JE_LERNZIEL) {
      fail(`Lernziel ${l.id} hat nur ${l.fragen} Frage(n) – mindestens ${MIN_FRAGEN_JE_LERNZIEL} nötig`);
    }
  }
  if (total && zusatzAnzahl / total > MAX_ZUSATZ_ANTEIL) {
    fail(`Zusatzanteil ${(zusatzAnzahl / total * 100).toFixed(1)} % liegt über ${MAX_ZUSATZ_ANTEIL * 100} %`);
  }

  // ---- Merkzettel
  const m = data.merkzettel;
  if (m) {
    const rows = (key, len, pflicht) => {
      if (!Array.isArray(m[key]) || (pflicht && !m[key].length) ||
          !m[key].every((r) => Array.isArray(r) && r.length === len && r.every(isText))) {
        fail(`Merkzettel: "${key}" muss Zeilen mit je ${len} Texten enthalten`);
      } else m[key].forEach((r) => r.forEach((t) => checkMarkup(t, `Merkzettel/${key}`)));
    };
    rows('fristen', 2, true);
    rows('begriffe', 3, true);
    rows('verwechslungen', 2, true);
    if (m.rechenschemata !== undefined) rows('rechenschemata', 2, false);
    if (m.tipp !== undefined) {
      if (!isText(m.tipp)) fail('Merkzettel: "tipp" ist leer');
      else checkMarkup(m.tipp, 'Merkzettel/tipp');
    }
  } else {
    fail('QUIZ_DATA.merkzettel fehlt');
  }
  if (data.pdf !== undefined && !existsSync(join(WEB, data.pdf))) fail(`PDF "${data.pdf}" fehlt in web/`);
}

// ---------------------------------------------------------------- 3. Syntax
for (const file of ['js/quiz.js', 'sw.js']) {
  try {
    new vm.Script(readFileSync(join(WEB, file), 'utf8'), { filename: file });
  } catch (e) {
    fail(`web/${file}: ${e.message}`);
  }
}

// ---------------------------------------------------------------- 4. Offline-Liste
const sw = readFileSync(join(WEB, 'sw.js'), 'utf8');
const listMatch = sw.match(/const FILES = \[([\s\S]*?)\];/);
if (!listMatch) fail('web/sw.js: Liste FILES nicht gefunden');
else {
  const listed = [...listMatch[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
  for (const f of listed) {
    if (f === './') continue;
    if (!existsSync(join(WEB, f))) fail(`web/sw.js: "${f}" steht in FILES, existiert aber nicht`);
  }
  const walk = (dir) => readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
  for (const p of walk(WEB)) {
    const rel = './' + relative(WEB, p).split(sep).join('/');
    if (rel === './sw.js' || rel.endsWith('.txt') || rel.endsWith('/.nojekyll')) continue;
    if (!listed.includes(rel)) fail(`web/sw.js: "${rel}" fehlt in FILES (sonst offline nicht verfügbar)`);
  }
}

// ---------------------------------------------------------------- 5. PDF passt zu fragen.js
const HASH = createHash('sha256').update(readFileSync(join(WEB, 'js', 'fragen.js'))).digest('hex');
if (data && data.pdf && existsSync(join(WEB, data.pdf))) {
  const roh = readFileSync(join(WEB, data.pdf)).toString('latin1');
  const gefunden = metadatenHash(roh);
  if (!gefunden) {
    fail(`PDF "${data.pdf}": kein Hash in den Metadaten – bitte mit "python tools/pdf_erstellen.py" neu erzeugen`);
  } else if (gefunden !== HASH) {
    fail(`PDF "${data.pdf}" ist veraltet (Hash ${gefunden.slice(0, 12)}…, erwartet ${HASH.slice(0, 12)}…) – bitte mit "python tools/pdf_erstellen.py" neu erzeugen`);
  }
}

// Liest /Subject bzw. /Keywords aus dem Info-Objekt – als Klartext oder als Hex-String.
function metadatenHash(roh) {
  for (const feld of ['Subject', 'Keywords']) {
    for (const m of roh.matchAll(new RegExp('/' + feld + '\\s*(?:\\(((?:\\\\.|[^\\\\)])*)\\)|<([0-9A-Fa-f\\s]+)>)', 'g'))) {
      let wert = '';
      if (m[1] !== undefined) {
        wert = m[1].replace(/\\([nrt()\\])/g, (_, c) => ({ n: '\n', r: '\r', t: '\t' }[c] || c));
      } else if (m[2] !== undefined) {
        const hex = m[2].replace(/\s/g, '');
        const bytes = Buffer.from(hex, 'hex');
        wert = bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff
          ? bytes.subarray(2).swap16().toString('utf16le')
          : bytes.toString('latin1');
      }
      const treffer = wert.match(/fragen-sha256:([0-9a-f]{64})/);
      if (treffer) return treffer[1];
    }
  }
  return null;
}

// ---------------------------------------------------------------- Ergebnis
if (errors.length) {
  console.error(`${errors.length} Problem(e) gefunden:\n- ` + errors.join('\n- '));
  process.exit(1);
}
const kapZeilen = proKapitel.map((k) => `  Kapitel ${k.nr}: ${String(k.n).padStart(3)} Aufgaben – ${k.titel}`).join('\n');
const typZeilen = TYPEN.map((t) => `  ${t.padEnd(12)} ${String(proTyp[t]).padStart(3)}`).join('\n');
console.log(
  `OK – ${total} Aufgaben geprüft, ${lernziele.size} Lernziele, ` +
  `${zusatzAnzahl} Zusatzfragen (${(zusatzAnzahl / total * 100).toFixed(1)} %).\n` +
  `Aufgaben je Kapitel:\n${kapZeilen}\n` +
  `Aufgaben je Typ:\n${typZeilen}\n` +
  `Skripte, Offline-Liste und PDF in Ordnung.`
);
