#!/usr/bin/env node
// Prerenders one static HTML page per public route into dist/ so search engines (and anyone without
// JavaScript) get real content: a title, description, canonical URL, Open Graph tags, JSON-LD and a <main>
// filled with the page's text, key facts and links. The app boots over this markup and renders the same route.
// Called from scripts/build-site.mjs; reads the same data as the app (data/*.json and js/data/*.js), never
// the network. Content is written in Bahasa Indonesia, the site's default language.
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ELEMENTS, CATEGORIES, getElement } from '../js/data/periodicTable.js';
import { MOLECULES, getMolecule, moleculesInClass, moleculesInPlace } from '../js/data/curatedMolecules.js';
import { IONS, getIon, ionsWith, ionsFromAcid } from '../js/data/ions.js';
import { MATERIALS, MATERIAL_TYPES, getMaterial, materialsWith, pdbURL } from '../js/data/materials.js';
import {
  REACTION_TYPES,
  LIBRARY,
  NUCLEAR,
  ALL_REACTIONS,
  getReaction,
  reactionsWith,
} from '../js/data/reactionLibrary.js';
import { TOPICS, findTopic, topicsLinking, PHASES, LAYERS } from '../js/data/topics/index.js';
import { GLOSSARY, GLOSSARY_CATS, findTerm } from '../js/data/glossary.js';
import { CLASSES, getClass, rootClasses, childClasses, classPath } from '../js/data/classes.js';
import { CHAIN, DOMAINS, GROUPS, domainsOfConcept } from '../js/data/ontology.js';
import { LABS, PLACES, PATHS, findLab, findPlace } from '../js/data/curriculum.js';
import { reference } from '../js/data/references.js';
import { parseFormula } from '../js/services/formula.js';
import { DECAY, daughter, nuclideLabel, nuclideId } from '../js/services/nuclide.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const SITE_NAME = 'Kimialoka';
const DEFAULT_TITLE = 'Kimialoka · Ensiklopedia kimia interaktif';

/* ---------- Small helpers ---------- */
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ESC[c]);
/** The Indonesian half of a [id, en] pair (or a plain string). */
const id = pair => (Array.isArray(pair) ? pair[0] : (pair ?? ''));
const LEVEL_NAMES = { sd: 'SD', smp: 'SMP', sma: 'SMA', kuliah: 'Kuliah', guru: 'Guru' };
const levelName = lv => LEVEL_NAMES[lv] || lv;
const STATES = { solid: 'Padat', liquid: 'Cair', gas: 'Gas', unknown: 'Belum diketahui' };
const BLOCKS = { s: 'Blok s', p: 'Blok p', d: 'Blok d', f: 'Blok f' };
const num = (v, digits = 2) =>
  v == null || v === '' || Number.isNaN(Number(v))
    ? '–'
    : Number(v).toLocaleString('id-ID', { maximumFractionDigits: digits });
const kelvin = k => (k == null ? '–' : `${num(k)} K (${num(k - 273.15, 1)} °C)`);
const paragraphs = text =>
  String(text || '')
    .split('\n')
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${esc(p)}</p>`)
    .join('');
const list = (items, cls = '') =>
  items.length ? `<ul${cls ? ` class="${cls}"` : ''}>${items.map(i => `<li>${i}</li>`).join('')}</ul>` : '';
const link = (href, label, cls = '') =>
  `<a${cls ? ` class="${cls}"` : ''} href="${esc(href)}">${esc(label)}</a>`;
const chips = items => (items.length ? `<p class="chips">${items.join(' ')}</p>` : '');
/** A definition list of [term, html] rows; rows with an empty value are dropped. */
const facts = rows =>
  `<dl class="facts">${rows
    .filter(([, v]) => v != null && v !== '' && v !== '–')
    .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`)
    .join('')}</dl>`;
const section = (title, html, cls = 'mol-section') =>
  html ? `<section class="${cls}"><h2>${esc(title)}</h2>${html}</section>` : '';
/** Plain text for <meta name="description">: tags stripped, whitespace collapsed, cut at a word. */
function summary(html, max = 160) {
  const text = String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), 80))}…`;
}
/** "H₂O" → "H<sub>2</sub>O" for formulas written with plain digits; Unicode sub/superscripts are kept. */
const formulaHTML = f => esc(f).replace(/([A-Za-z\])])(\d+)/g, '$1<sub>$2</sub>');
const SUP = { '⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9 };
/** Elements in a formula (plain or Unicode), as periodic-table entries. */
function elementsIn(formula) {
  const plain = String(formula || '')
    .replace(/[₀-₉]/g, d => String(d.charCodeAt(0) - 0x2080))
    .replace(/[⁰-⁹⁺⁻]/g, c => (c === '⁺' ? '+' : c === '⁻' ? '-' : String(SUP[c])));
  const counts = parseFormula(plain).counts || {};
  return Object.keys(counts).map(getElement).filter(Boolean);
}

/* ---------- Lesson text → HTML (same markup as js/components/richtext.js, Indonesian, path links) ---------- */
const LINK = /\{\{(m|e|i|r|mat|lab|learn|page):([^}|]+)(?:\|([^}]+))?\}\}/g;
function inline(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*(\S.*?\S|\S)\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, key, label) => {
      const term = findTerm(key);
      return term
        ? `<a class="term" href="/glossary/${encodeURIComponent(term.key)}">${label || key}</a>`
        : label || key;
    })
    .replace(LINK, (_, kind, ref, label) => {
      const targets = {
        m: () => [getMolecule(ref), m => `/molecule/${ref}`, m => id(m.name)],
        e: () => [getElement(ref), e => `/atom/${e.s}`, e => e.id],
        i: () => [getIon(ref), () => `/ion/${ref}`, i => i.f],
        r: () => [getReaction(ref), () => `/reaction/${ref}`, r => id(r.name)],
        mat: () => [getMaterial(ref), () => `/material/${ref}`, m => id(m.name)],
        lab: () => [findLab(ref), () => `/lab/${ref}`, l => id(l.title)],
        learn: () => [findTopic(ref), () => `/learn/${ref}`, t => id(t.title)],
        page: () => [{ ref }, () => `/${ref}`, () => ref],
      };
      const [item, href, name] = targets[kind]();
      if (!item) return label || ref;
      return `<a href="${href(item)}">${label || esc(name(item))}</a>`;
    });
}
function table(lines) {
  const rows = lines
    .filter(l => !/^\s*\|?\s*:?-{2,}/.test(l))
    .map(l =>
      l
        .trim()
        .replace(/^\||\|$/g, '')
        .split('|')
        .map(c => c.trim())
    );
  const [head, ...body] = rows;
  return `<div class="table-wrap"><table class="data-table lesson-table"><thead><tr>${head
    .map(c => `<th scope="col">${inline(c)}</th>`)
    .join('')}</tr></thead><tbody>${body
    .map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`)
    .join('')}</tbody></table></div>`;
}
export function lessonHTML(source) {
  return String(source || '')
    .trim()
    .split(/\n\s*\n/)
    .map(block => {
      const lines = block.split('\n');
      if (lines.length > 1 && lines.every(l => /^\s*\|/.test(l))) return table(lines);
      if (lines.every(l => /^\s*-\s+/.test(l)))
        return `<ul>${lines.map(l => `<li>${inline(l.replace(/^\s*-\s+/, ''))}</li>`).join('')}</ul>`;
      if (lines.every(l => /^\s*\d+\.\s+/.test(l)))
        return `<ol>${lines.map(l => `<li>${inline(l.replace(/^\s*\d+\.\s+/, ''))}</li>`).join('')}</ol>`;
      if (/^###\s+/.test(block)) return `<h3>${inline(block.replace(/^###\s+/, ''))}</h3>`;
      const listStart = lines.findIndex(l => /^\s*-\s+/.test(l));
      if (listStart > 0 && lines.slice(listStart).every(l => /^\s*-\s+/.test(l)))
        return `<p>${inline(lines.slice(0, listStart).join(' '))}</p><ul>${lines
          .slice(listStart)
          .map(l => `<li>${inline(l.replace(/^\s*-\s+/, ''))}</li>`)
          .join('')}</ul>`;
      return `<p>${inline(lines.join(' '))}</p>`;
    })
    .join('');
}

/* ---------- Shared page parts ---------- */
const HOME_CRUMB = ['Beranda', '/'];
function breadcrumbs(crumbs) {
  return `<nav class="crumbs" aria-label="Jejak halaman"><ol>${[HOME_CRUMB, ...crumbs]
    .map(([label, href]) =>
      href ? `<li>${link(href, label)}</li>` : `<li aria-current="page">${esc(label)}</li>`
    )
    .join('')}</ol></nav>`;
}
function pageHead({ title, lead = '', crumbs = [], eyebrow = '', formula = '' }) {
  return `<header class="page-head">${crumbs.length ? breadcrumbs(crumbs) : ''}${
    eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''
  }${formula ? `<p class="formula formula-lg">${formula}</p>` : ''}<h1>${esc(title)}</h1>${
    lead ? `<p class="lead">${esc(lead)}</p>` : ''
  }</header>`;
}
/** Links to the main sections, so every prerendered page leads a crawler onward. */
const SECTIONS = [
  ['/peta', 'Peta ilmu kimia'],
  ['/table', 'Tabel periodik'],
  ['/atom', 'Atom dan unsur'],
  ['/isotope', 'Isotop'],
  ['/ion', 'Ion'],
  ['/explore', 'Molekul'],
  ['/classes', 'Golongan senyawa'],
  ['/reaction', 'Reaksi'],
  ['/material', 'Material dan campuran'],
  ['/learn', 'Materi belajar'],
  ['/lab', 'Laboratorium virtual'],
  ['/quiz', 'Kuis'],
  ['/around', 'Kimia di sekitarku'],
  ['/glossary', 'Kamus kimia'],
  ['/teacher', 'Ruang guru'],
  ['/about', 'Tentang dan sumber'],
];
const sectionLinks = () =>
  `<nav class="prerender-sections" aria-label="Bagian Kimialoka"><h2>Jelajahi Kimialoka</h2>${list(
    SECTIONS.map(([href, label]) => link(href, label))
  )}</nav>`;
const refList = codes =>
  list(
    (codes || [])
      .map(code => {
        if (String(code).startsWith('wiki:')) {
          const title = String(code).slice(5);
          return `<a href="https://en.wikipedia.org/wiki/${encodeURIComponent(title)}" rel="noopener">Wikipedia · ${esc(title.replace(/_/g, ' '))}</a>`;
        }
        const ref = reference(code);
        return ref ? `<a href="${esc(ref.url)}" rel="noopener">${esc(ref.label)}</a>` : null;
      })
      .filter(Boolean),
    'ref-list'
  );
const topicLinks = topics => chips(topics.map(t => link(`/learn/${t.id}`, id(t.title), 'chip')));
const compLink = code => {
  const [kind, ref] = String(code).split(':');
  if (kind === 'e') {
    const e = getElement(ref);
    return e ? link(`/atom/${e.s}`, `${e.id} (${e.s})`) : esc(ref);
  }
  if (kind === 'm') {
    const m = getMolecule(ref);
    return m ? link(`/molecule/${ref}`, id(m.name)) : esc(ref);
  }
  if (kind === 'i') {
    const i = getIon(ref);
    return i ? link(`/ion/${ref}`, id(i.name)) : esc(ref);
  }
  return esc(code);
};

/* ---------- Data files ---------- */
const readJSON = async path => JSON.parse(await readFile(join(root, path), 'utf8'));
async function loadData() {
  const elements = new Map();
  for (const e of ELEMENTS) elements.set(e.z, await readJSON(`data/elements/${e.z}.json`).catch(() => null));
  const molecules = new Map();
  for (const file of await readdir(join(root, 'data/molecules')))
    if (file.endsWith('.json') && !['index.json', 'depict.json'].includes(file))
      molecules.set(file.slice(0, -5), await readJSON(`data/molecules/${file}`));
  const ions = new Map();
  for (const file of await readdir(join(root, 'data/ions')))
    if (file.endsWith('.json') && file !== 'index.json')
      ions.set(file.slice(0, -5), await readJSON(`data/ions/${file}`));
  const isotopes = await readJSON('data/isotopes.json');
  const moleculeIndex = new Map((await readJSON('data/molecules/index.json')).map(r => [r.id, r]));
  const topics = new Map();
  for (const t of TOPICS)
    topics.set(t.id, { ...(await import(`../js/data/topics/${t.id}.js`)).default, ...t });
  return { elements, molecules, ions, isotopes, moleculeIndex, topics };
}

/* ---------- Pages ---------- */
/** @typedef {{ path: string, title: string, description?: string, main: string, crumbs?: Array, noindex?: boolean, jsonld?: object[] }} Page */

function homePage(data) {
  const lead =
    'Kimialoka adalah ensiklopedia kimia interaktif berbahasa Indonesia untuk SD, SMP, SMA, kuliah, dan guru: ' +
    '118 unsur dengan isotopnya, ion, molekul 3D, golongan senyawa, reaksi setara, material dan campuran, ' +
    '29 materi belajar empat lapis, 14 laboratorium virtual, kuis, dan kamus kimia, dengan data resmi PubChem, ' +
    'IUPAC, dan IAEA.';
  const path = PATHS.smp.slice(0, 6).map(findTopic).filter(Boolean);
  const featured = MOLECULES.filter(m => m.lv === 'smp').slice(0, 12);
  const main = `<div class="container">
    ${pageHead({ title: 'Kimialoka · Ensiklopedia kimia interaktif', lead, eyebrow: 'Rasa ingin tahu dimulai di sini' })}
    <p>Kenali materi, jelajahi perubahannya. Mulai dari ${link('/learn/zat', 'zat dan wujudnya')}, lihat ${link('/molecule/water', 'molekul air dalam 3D')}, atau buka ${link('/table', 'tabel periodik')} dan ${link('/search', 'cari apa saja')}: nama zat, rumus kimia, nomor CAS, unsur, isotop, ion, reaksi, atau istilah.</p>
    ${section(
      'Rantai materi: dari materi ke transformasi',
      `<ol class="matter-chain">${CHAIN.map(c => `<li>${link(c.go, id(c.name))} — ${esc(id(c.lead))}</li>`).join('')}</ol>`
    )}
    ${section(
      'Jalur belajar',
      `<ol>${path.map(t => `<li>${link(`/learn/${t.id}`, id(t.title))}: ${esc(id(t.summary))}</li>`).join('')}</ol><p>${link('/learn', 'Semua materi belajar')} · ${link('/peta', 'Peta ilmu kimia')}</p>`
    )}
    ${section(
      'Molekul pilihan',
      `${list(featured.map(m => `${link(`/molecule/${m.id}`, id(m.name))} (${formulaHTML(data.moleculeIndex.get(m.id)?.formula || '')}) — ${esc(id(m.about))}`))}<p>${link('/explore', `Semua ${MOLECULES.length} molekul dan senyawa katalog`)}</p>`
    )}
    ${section(
      'Golongan senyawa',
      list(rootClasses().map(c => `${link(`/classes/${c.id}`, id(c.name))} — ${esc(id(c.def))}`))
    )}
    ${section(
      'Laboratorium virtual',
      list(LABS.map(l => `${link(`/lab/${l.id}`, id(l.title))} — ${esc(id(l.summary))}`))
    )}
    ${section(
      'Angka Kimialoka',
      facts([
        ['Unsur', link('/table', '118 unsur dengan data IUPAC CIAAW dan PubChem')],
        [
          'Nuklida (isotop)',
          link('/isotope', `${data.isotopes.rows.length.toLocaleString('id-ID')} nuklida dari IAEA AMDC`),
        ],
        ['Ion', link('/ion', `${IONS.length} ion`)],
        [
          'Molekul dan senyawa',
          link('/explore', `${MOLECULES.length} entri katalog, plus jutaan senyawa PubChem lewat pencarian`),
        ],
        [
          'Reaksi setara',
          link(
            '/reaction',
            `${ALL_REACTIONS.length} reaksi (${LIBRARY.length} kimia, ${NUCLEAR.length} inti)`
          ),
        ],
        ['Material dan campuran', link('/material', `${MATERIALS.length} material`)],
        ['Materi belajar', link('/learn', `${TOPICS.length} topik dalam empat lapis`)],
        ['Istilah kamus', link('/glossary', `${GLOSSARY.length} istilah`)],
      ])
    )}
    ${sectionLinks()}
  </div>`;
  return {
    path: '/',
    title: DEFAULT_TITLE,
    description:
      'Kimialoka: ensiklopedia kimia interaktif untuk SD sampai kuliah dan guru. Peta kimia, 118 unsur dan isotopnya, ion, molekul 3D, reaksi, material, 29 materi empat lapis, 14 laboratorium virtual, data resmi PubChem, IUPAC, dan IAEA.',
    main,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        inLanguage: 'id',
        description: lead,
        publisher: {
          '@type': 'Organization',
          '@id': 'https://asadinedu.com/#organization',
          name: 'Asadin Edu',
          url: 'https://asadinedu.com/',
        },
      },
    ],
  };
}

function tablePage() {
  const periods = new Map();
  for (const e of ELEMENTS) periods.set(e.period, [...(periods.get(e.period) || []), e]);
  const main = `<div class="container">
    ${pageHead({
      title: 'Tabel periodik unsur',
      crumbs: [['Tabel periodik', '']],
      lead: '118 unsur kimia menurut nomor atom, golongan, dan periode, dengan massa atom, konfigurasi elektron, keelektronegatifan, titik leleh dan didih, serta kategori setiap unsur. Klik unsur untuk membaca profilnya.',
    })}
    ${[...periods.entries()]
      .map(
        ([p, els]) =>
          `<section class="mol-section"><h2>Periode ${p}</h2>${list(
            els.map(
              e =>
                `${link(`/atom/${e.s}`, `${e.s} · ${e.id}`)} (Z = ${e.z}, ${esc(id(CATEGORIES[e.cat]?.name))})`
            )
          )}</section>`
      )
      .join('')}
    ${section(
      'Kategori unsur',
      list(
        Object.entries(CATEGORIES).map(
          ([key, c]) => `${esc(id(c.name))}: ${ELEMENTS.filter(e => e.cat === key).length} unsur`
        )
      )
    )}
    ${sectionLinks()}
  </div>`;
  return { path: '/table', title: 'Tabel periodik', main, crumbs: [['Tabel periodik', '/table']] };
}

function atomHubPage() {
  const main = `<div class="container">
    ${pageHead({
      title: 'Atom dan unsur',
      crumbs: [['Atom', '']],
      lead: 'Atom adalah inti bermuatan positif (proton dan neutron) yang dikelilingi elektron. Setiap unsur adalah jenis atom dengan jumlah proton tertentu. Pelajari struktur atom, konfigurasi elektron, dan profil 118 unsur.',
    })}
    ${section('Pelajari', chips([link('/learn/atom', 'Struktur atom', 'chip'), link('/learn/periodik', 'Sistem periodik', 'chip'), link('/learn/kuantum', 'Kimia kuantum', 'chip'), link('/lab/orbital', 'Lab orbital', 'chip'), link('/isotope', 'Isotop', 'chip'), link('/ion', 'Ion', 'chip')]))}
    ${section(
      'Semua unsur',
      list(
        ELEMENTS.map(
          e =>
            `${link(`/atom/${e.s}`, `${e.z}. ${e.id} (${e.s})`)} — ${esc(id(CATEGORIES[e.cat]?.name))}, ${esc(BLOCKS[e.block] || e.block)}, periode ${e.period}${e.group ? `, golongan ${e.group}` : ''}`
        )
      )
    )}
    ${sectionLinks()}
  </div>`;
  return { path: '/atom', title: 'Atom', main, crumbs: [['Atom', '/atom']] };
}

function elementPage(e, data) {
  const rec = data.elements.get(e.z);
  const cat = id(CATEGORIES[e.cat]?.name);
  const extract = rec?.wiki?.id?.extract || '';
  const molecules = MOLECULES.filter(m =>
    elementsIn(data.moleculeIndex.get(m.id)?.formula).some(x => x.z === e.z)
  ).slice(0, 40);
  const ions = IONS.filter(i => elementsIn(i.f).some(x => x.z === e.z));
  const reactions = ALL_REACTIONS.filter(r =>
    r.types.includes('nuklir')
      ? [...r.r, ...r.p].some(x => x[2] === e.s)
      : [...r.r, ...r.p].some(x => elementsIn(x[1]).some(el => el.z === e.z))
  );
  const materials = materialsWith(`e:${e.s}`);
  const lessons = [...new Set([...topicsLinking('e', e.s).map(t => t.id), 'periodik', 'atom'])]
    .map(findTopic)
    .filter(Boolean);
  const prev = ELEMENTS[e.z - 2];
  const next = ELEMENTS[e.z];
  const natural = rec?.natural || [];
  const nuclides = rec?.nuclides || [];
  const lead = `${e.id} (${e.en}) adalah unsur kimia dengan lambang ${e.s} dan nomor atom ${e.z}: ${cat.toLowerCase()} ${BLOCKS[e.block]?.toLowerCase() || ''} pada periode ${e.period}${e.group ? ` golongan ${e.group}` : ''} tabel periodik.`;
  const main = `<article class="container element">
    ${pageHead({
      title: `${e.id} (${e.s})`,
      lead,
      eyebrow: `Unsur nomor ${e.z} · ${cat}`,
      crumbs: [
        ['Tabel periodik', '/table'],
        [e.id, ''],
      ],
    })}
    ${section('Tentang ' + e.id.toLowerCase(), paragraphs(extract) || `<p>${esc(lead)}</p>`)}
    ${section(
      'Data unsur',
      facts([
        ['Lambang', esc(e.s)],
        ['Nomor atom (Z)', String(e.z)],
        ['Nama Inggris', esc(e.en)],
        ['Massa atom standar', esc(rec?.weight?.value || num(e.m, 3))],
        ['Kategori', esc(cat)],
        ['Golongan', e.group ? String(e.group) : e.block === 'f' ? 'Lantanida/aktinida' : '–'],
        ['Periode', String(e.period)],
        ['Blok', esc(BLOCKS[e.block] || e.block)],
        ['Wujud (25 °C)', esc(STATES[e.state] || e.state)],
        ['Konfigurasi elektron', esc(e.conf)],
        ['Kulit elektron', esc((e.shells || []).join(', '))],
        ['Bilangan oksidasi umum', esc(e.ox || '–')],
        ['Keelektronegatifan (Pauling)', e.eneg ? num(e.eneg) : '–'],
        ['Energi ionisasi pertama', e.ie ? `${num(e.ie, 3)} eV` : '–'],
        ['Afinitas elektron', e.ea != null ? `${num(e.ea, 3)} eV` : '–'],
        ['Jari-jari atom', e.rad ? `${num(e.rad)} pm` : '–'],
        ['Titik leleh', e.mp ? kelvin(e.mp) : '–'],
        ['Titik didih', e.bp ? kelvin(e.bp) : '–'],
        ['Massa jenis', e.d ? `${num(e.d, 3)} g/cm³` : '–'],
        ['Tahun penemuan', e.year ? String(e.year) : 'Dikenal sejak zaman kuno'],
        ['Isotop stabil', rec?.stableCount != null ? String(rec.stableCount) : '–'],
        ['Kelimpahan di kerak bumi', esc(rec?.abundance?.crust || '–')],
        ['Kelimpahan di lautan', esc(rec?.abundance?.ocean || '–')],
      ])
    )}
    ${section(
      'Isotop ' + e.id.toLowerCase(),
      `${natural.length ? `<p>Isotop alami: ${natural.map(n => link(`/isotope/${nuclideId(e.s, n.A)}`, nuclideLabel(n.A, e.s))).join(', ')}.</p>` : ''}
      ${nuclides.length ? `<p>${nuclides.length} nuklida diketahui: ${nuclides.map(n => link(`/isotope/${nuclideId(e.s, n.A)}`, nuclideLabel(n.A, e.s))).join(', ')}.</p>` : ''}
      <p>${link(`/isotope?q=${e.s}`, `Bagan nuklida ${e.id.toLowerCase()}`)}</p>`
    )}
    ${section('Ion ' + e.id.toLowerCase(), chips(ions.map(i => link(`/ion/${i.id}`, id(i.name), 'chip'))))}
    ${section('Molekul dan senyawa yang mengandung ' + e.id.toLowerCase(), list(molecules.map(m => `${link(`/molecule/${m.id}`, id(m.name))} (${formulaHTML(data.moleculeIndex.get(m.id)?.formula || '')})`)))}
    ${section('Reaksi', list(reactions.map(r => link(`/reaction/${r.id}`, id(r.name)))))}
    ${section('Material', chips(materials.map(m => link(`/material/${m.id}`, id(m.name), 'chip'))))}
    ${section('Pelajari lebih lanjut', topicLinks(lessons))}
    ${section(
      'Unsur tetangga',
      `<p>${prev ? link(`/atom/${prev.s}`, `← ${prev.z} ${prev.id}`) : ''} ${next ? link(`/atom/${next.s}`, `${next.z} ${next.id} →`) : ''} · ${link('/table', 'Tabel periodik')}</p>`
    )}
    ${sectionLinks()}
  </article>`;
  return {
    path: `/atom/${e.s}`,
    title: `${e.id} (${e.s}): unsur nomor atom ${e.z}`,
    description: summary(extract) || lead,
    main,
    crumbs: [
      ['Tabel periodik', '/table'],
      [e.id, `/atom/${e.s}`],
    ],
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'ChemicalSubstance',
        name: e.id,
        alternateName: [e.en, e.s],
        description: summary(extract, 300) || lead,
        inLanguage: 'id',
      },
    ],
  };
}

function explorePage(data) {
  const byClass = rootClasses().map(c => {
    const ids = new Set([c.id, ...childClasses(c.id).map(x => x.id)]);
    return [c, MOLECULES.filter(m => m.cls.some(k => ids.has(k)))];
  });
  const listed = new Set(byClass.flatMap(([, ms]) => ms.map(m => m.id)));
  const rest = MOLECULES.filter(m => !listed.has(m.id));
  const row = m =>
    `${link(`/molecule/${m.id}`, id(m.name))} (${formulaHTML(data.moleculeIndex.get(m.id)?.formula || '')}, ${levelName(m.lv)}) — ${esc(id(m.about))}`;
  const main = `<div class="container">
    ${pageHead({
      title: 'Jelajah molekul dan senyawa',
      crumbs: [['Jelajah', '']],
      lead: `${MOLECULES.length} molekul dan senyawa pilihan dari SD sampai kuliah dengan model 3D, rumus, massa molar, sifat, kegunaan, bahaya GHS, dan sumber resmi PubChem. Cari juga jutaan senyawa PubChem lain menurut nama, rumus, SMILES, atau nomor CAS.`,
    })}
    ${byClass.map(([c, ms]) => section(id(c.name), `<p>${esc(id(c.def))} ${link(`/classes/${c.id}`, 'Golongan ' + id(c.name).toLowerCase())}.</p>${list(ms.map(row))}`)).join('')}
    ${section('Lainnya', list(rest.map(row)))}
    ${sectionLinks()}
  </div>`;
  return { path: '/explore', title: 'Jelajah molekul', main, crumbs: [['Jelajah', '/explore']] };
}

function moleculePage(m, data) {
  const rec = data.molecules.get(m.id);
  const idx = data.moleculeIndex.get(m.id) || {};
  const props = rec?.props || {};
  const name = id(m.name);
  const formula = props.formula || idx.formula || '';
  const extract = rec?.wiki?.id?.extract || '';
  const classes = m.cls.map(getClass).filter(Boolean);
  const path = classes[0] ? classPath(classes[0].id) : [];
  const elements = elementsIn(formula);
  const ions = [...ionsWith(m.id), ...ionsFromAcid(m.id)];
  const reactions = reactionsWith(`m:${m.id}`);
  const materials = materialsWith(`m:${m.id}`);
  const lessons = topicsLinking('m', m.id);
  const places = m.ctx.map(findPlace).filter(Boolean);
  const english = (rec?.descriptions || [])[0];
  const lead = `${name}${m.name[1] && m.name[1] !== name ? ` (${m.name[1]})` : ''}${formula ? `, rumus kimia ${formula}` : ''}: ${id(m.about)}`;
  const main = `<article class="container molecule">
    ${pageHead({ title: name, formula: formulaHTML(formula), eyebrow: `Molekul · ${levelName(m.lv)}${classes[0] ? ` · ${id(classes[0].name)}` : ''}`, lead: id(m.about), crumbs: [['Jelajah', '/explore'], ...path.map(c => [id(c.name), `/classes/${c.id}`]), [name, '']] })}
    ${section('Kegunaan', m.uses ? `<p>${esc(id(m.uses))}</p>` : '')}
    ${section('Tahukah kamu?', m.fun ? `<p>${esc(id(m.fun))}</p>` : '')}
    ${section('Ensiklopedia', paragraphs(extract) || (english ? `<p lang="en">${esc(english.text)}</p><p class="muted small">Sumber: ${esc(english.source)}</p>` : ''))}
    ${section(
      'Data senyawa',
      facts([
        ['Rumus molekul', formulaHTML(formula)],
        ['Massa molar', props.mw || idx.mw ? `${num(props.mw || idx.mw, 3)} g/mol` : '–'],
        ['Nama IUPAC', esc(props.iupac || idx.iupac || '–')],
        ['Nama Inggris', esc(m.name[1] || props.title || '–')],
        ['Nomor CAS', esc(rec?.cas || idx.cas || '–')],
        [
          'PubChem CID',
          m.cid
            ? `<a href="https://pubchem.ncbi.nlm.nih.gov/compound/${m.cid}" rel="noopener">${m.cid}</a>`
            : '–',
        ],
        ['InChIKey', esc(props.inchikey || idx.inchikey || '–')],
        ['SMILES', esc(props.smiles || '–')],
        ['Bentuk molekul', esc(m.geo || '–')],
        ['Muatan', props.charge != null ? String(props.charge) : '–'],
        ['Jenjang', esc(levelName(m.lv))],
        ['Golongan', classes.map(c => link(`/classes/${c.id}`, id(c.name))).join(', ') || '–'],
        ['Unsur penyusun', elements.map(e => link(`/atom/${e.s}`, `${e.id} (${e.s})`)).join(', ') || '–'],
      ])
    )}
    ${rec?.uses?.length ? section('Pemakaian (PubChem)', list(rec.uses.slice(0, 8).map(u => `<span lang="en">${esc(u)}</span>`))) : ''}
    ${section('Ion terkait', chips(ions.map(i => link(`/ion/${i.id}`, id(i.name), 'chip'))))}
    ${section('Reaksi', list(reactions.map(r => link(`/reaction/${r.id}`, id(r.name)))))}
    ${section('Material dan campuran', chips(materials.map(x => link(`/material/${x.id}`, id(x.name), 'chip'))))}
    ${section('Ditemukan di', chips(places.map(p => link(`/around/${p.id}`, id(p.name), 'chip'))))}
    ${section('Pelajari lebih lanjut', topicLinks(lessons))}
    ${sectionLinks()}
  </article>`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'MolecularEntity',
    name,
    alternateName: m.name[1],
    description: summary(extract, 300) || id(m.about),
    inLanguage: 'id',
  };
  if (formula) jsonld.molecularFormula = formula;
  if (props.mw || idx.mw)
    jsonld.molecularWeight = { '@type': 'QuantitativeValue', value: props.mw || idx.mw, unitCode: 'g/mol' };
  if (props.iupac || idx.iupac) jsonld.iupacName = props.iupac || idx.iupac;
  if (props.inchikey || idx.inchikey) jsonld.inChIKey = props.inchikey || idx.inchikey;
  if (props.smiles) jsonld.smiles = props.smiles;
  if (rec?.cas || idx.cas)
    jsonld.identifier = { '@type': 'PropertyValue', propertyID: 'CAS', value: rec?.cas || idx.cas };
  return {
    path: `/molecule/${m.id}`,
    title: name,
    description: summary(lead),
    main,
    crumbs: [
      ['Jelajah', '/explore'],
      ...path.map(c => [id(c.name), `/classes/${c.id}`]),
      [name, `/molecule/${m.id}`],
    ],
    jsonld: [jsonld],
  };
}

function classesHubPage() {
  const tree = c =>
    `<li>${link(`/classes/${c.id}`, id(c.name))} — ${esc(id(c.def))}${
      childClasses(c.id).length ? `<ul>${childClasses(c.id).map(tree).join('')}</ul>` : ''
    }</li>`;
  const main = `<div class="container">
    ${pageHead({ title: 'Golongan senyawa', crumbs: [['Golongan', '']], lead: `${CLASSES.length} golongan senyawa dari unsur dan alotrop sampai biomolekul dan material: definisi, ciri khas, tata nama, dan contoh molekul dari katalog Kimialoka.` })}
    <ul class="class-tree">${rootClasses().map(tree).join('')}</ul>
    ${sectionLinks()}
  </div>`;
  return { path: '/classes', title: 'Golongan senyawa', main, crumbs: [['Golongan', '/classes']] };
}

function classPage(c, data) {
  const path = classPath(c.id);
  const children = childClasses(c.id);
  const members = moleculesInClass(c.id);
  const crumbs = [
    ['Golongan', '/classes'],
    ...path.slice(0, -1).map(p => [id(p.name), `/classes/${p.id}`]),
    [id(c.name), ''],
  ];
  const main = `<article class="container">
    ${pageHead({ title: id(c.name), eyebrow: `Golongan senyawa · ${levelName(c.level)}`, lead: id(c.def), crumbs })}
    ${section('Ciri khas', c.feat ? `<p>${esc(id(c.feat))}</p>` : '')}
    ${section('Rumus umum', c.general ? `<p>${formulaHTML(id(c.general))}</p>` : '')}
    ${section('Tata nama', c.naming ? `<p>${esc(id(c.naming))}</p>` : '')}
    ${section('Subgolongan', list(children.map(x => `${link(`/classes/${x.id}`, id(x.name))} — ${esc(id(x.def))}`)))}
    ${section('Contoh dari katalog', list(members.map(m => `${link(`/molecule/${m.id}`, id(m.name))} (${formulaHTML(data.moleculeIndex.get(m.id)?.formula || '')}) — ${esc(id(m.about))}`)))}
    ${sectionLinks()}
  </article>`;
  return {
    path: `/classes/${c.id}`,
    title: id(c.name),
    description: summary(id(c.def)),
    main,
    crumbs: [...crumbs.slice(0, -1), [id(c.name), `/classes/${c.id}`]],
  };
}

function ionHubPage() {
  const kinds = [
    ['cation', 'Kation'],
    ['anion', 'Anion'],
  ];
  const main = `<div class="container">
    ${pageHead({ title: 'Penjelajah ion', crumbs: [['Ion', '']], lead: `${IONS.length} ion: kation, anion, ion poliatomik, dan ion kompleks dengan rumus, muatan, massa, keberadaan di alam, uji identifikasi, senyawa, dan reaksinya. Ion adalah atom atau gugus atom yang bermuatan listrik karena melepas atau menerima elektron.` })}
    ${kinds.map(([k, name]) => section(name, list(IONS.filter(i => i.kind === k).map(i => `${link(`/ion/${i.id}`, id(i.name))} — ${esc(id(i.about))}`)))).join('')}
    ${sectionLinks()}
  </div>`;
  return { path: '/ion', title: 'Ion', main, crumbs: [['Ion', '/ion']] };
}

function ionPage(i, data) {
  const rec = data.ions.get(i.id);
  const props = rec?.props || {};
  const name = id(i.name);
  const elements = elementsIn(i.f);
  const compounds = (i.cmp || []).map(getMolecule).filter(Boolean);
  const acid = i.acid ? getMolecule(i.acid) : null;
  const reactions = reactionsWith(`i:${i.id}`);
  const materials = materialsWith(`i:${i.id}`);
  const lessons = topicsLinking('i', i.id);
  const see = (i.see || []).map(getIon).filter(Boolean);
  const kind = i.kind === 'cation' ? 'kation' : 'anion';
  const lead = `${name} adalah ${i.poly ? 'ion poliatomik' : i.complex ? 'ion kompleks' : kind} ${i.kind === 'cation' ? 'bermuatan positif' : 'bermuatan negatif'}. ${id(i.about)}`;
  const main = `<article class="container ion">
    ${pageHead({
      title: name,
      formula: esc(i.f),
      eyebrow: `${i.kind === 'cation' ? 'Kation' : 'Anion'}${i.poly ? ' poliatomik' : ''}${i.complex ? ' kompleks' : ''} · ${levelName(i.lv)}`,
      lead: id(i.about),
      crumbs: [
        ['Ion', '/ion'],
        [name, ''],
      ],
    })}
    ${section('Ditemukan di', i.found ? `<p>${esc(id(i.found))}</p>` : '')}
    ${section('Uji identifikasi', i.test ? `<p>${esc(id(i.test))}</p>` : '')}
    ${section(
      'Data ion',
      facts([
        ['Rumus', esc(i.f)],
        [
          'Muatan',
          props.charge != null ? (props.charge > 0 ? `+${props.charge}` : String(props.charge)) : '–',
        ],
        ['Massa molar', props.mw ? `${num(props.mw, 3)} g/mol` : '–'],
        ['Nama IUPAC', esc(props.iupac || (i.q || [])[0] || '–')],
        ['Nama Inggris', esc(i.name[1] || '–')],
        [
          'PubChem CID',
          rec?.cid
            ? `<a href="https://pubchem.ncbi.nlm.nih.gov/compound/${rec.cid}" rel="noopener">${rec.cid}</a>`
            : '–',
        ],
        ['Nomor CAS', esc(rec?.cas || '–')],
        ['Unsur penyusun', elements.map(e => link(`/atom/${e.s}`, `${e.id} (${e.s})`)).join(', ') || '–'],
        ['Asam induk', acid ? link(`/molecule/${acid.id}`, id(acid.name)) : '–'],
      ])
    )}
    ${section('Senyawa yang mengandung ion ini', list(compounds.map(m => `${link(`/molecule/${m.id}`, id(m.name))} — ${esc(id(m.about))}`)))}
    ${section('Reaksi', list(reactions.map(r => link(`/reaction/${r.id}`, id(r.name)))))}
    ${section('Material', chips(materials.map(x => link(`/material/${x.id}`, id(x.name), 'chip'))))}
    ${section('Ion terkait', chips(see.map(x => link(`/ion/${x.id}`, id(x.name), 'chip'))))}
    ${section('Pelajari lebih lanjut', topicLinks(lessons))}
    ${sectionLinks()}
  </article>`;
  return {
    path: `/ion/${i.id}`,
    title: name,
    description: summary(lead),
    main,
    crumbs: [
      ['Ion', '/ion'],
      [name, `/ion/${i.id}`],
    ],
  };
}

function isotopeHubPage(data) {
  const rows = data.isotopes.rows;
  const byZ = new Map();
  for (const r of rows) byZ.set(r[0], [...(byZ.get(r[0]) || []), r]);
  const stable = rows.filter(r => r[3] === -1).length;
  const main = `<div class="container">
    ${pageHead({ title: 'Penjelajah isotop', crumbs: [['Isotop', '']], lead: `${rows.length.toLocaleString('id-ID')} nuklida dari IAEA Atomic Mass Data Center dan IUPAC CIAAW: ${stable} di antaranya stabil. Isotop adalah atom unsur yang sama dengan jumlah neutron berbeda; halaman setiap nuklida memuat massa, waktu paruh, mode peluruhan, inti anak, kelimpahan alami, dan kegunaannya.` })}
    ${section('Nuklida terkenal', chips(['H-1', 'H-2', 'H-3', 'C-12', 'C-14', 'N-15', 'O-18', 'F-18', 'K-40', 'Co-60', 'Sr-90', 'Tc-99', 'I-131', 'Cs-137', 'Rn-222', 'Ra-226', 'U-235', 'U-238', 'Pu-239'].map(n => link(`/isotope/${n}`, n, 'chip'))))}
    ${section(
      'Isotop setiap unsur',
      list(
        ELEMENTS.map(e => {
          const nuc = byZ.get(e.z) || [];
          const natural = nuc.filter(r => r[5]);
          const shown = natural.length ? natural : nuc.slice(0, 3);
          return `${link(`/atom/${e.s}`, `${e.id} (${e.s})`)}: ${nuc.length} nuklida${natural.length ? `, alami: ` : ', misalnya '}${shown.map(r => link(`/isotope/${nuclideId(e.s, r[1])}`, nuclideLabel(r[1], e.s))).join(', ')}`;
        })
      )
    )}
    ${section('Pelajari', chips([link('/learn/nuklir', 'Kimia inti', 'chip'), link('/lab/paruh', 'Lab waktu paruh', 'chip'), link('/reaction?type=nuklir', 'Reaksi inti', 'chip')]))}
    ${sectionLinks()}
  </div>`;
  return { path: '/isotope', title: 'Isotop', main, crumbs: [['Isotop', '/isotope']] };
}

const HALF = {
  y: 'tahun',
  d: 'hari',
  h: 'jam',
  m: 'menit',
  s: 'detik',
  ms: 'milidetik',
  us: 'mikrodetik',
  µs: 'mikrodetik',
  ns: 'nanodetik',
  ps: 'pikodetik',
  fs: 'femtodetik',
  as: 'attodetik',
  zs: 'zeptodetik',
  ys: 'yoktodetik',
  ky: 'ribu tahun',
  My: 'juta tahun',
  Gy: 'miliar tahun',
  Ty: 'triliun tahun',
  Py: 'kuadriliun tahun',
  Ey: 'kuintiliun tahun',
  Zy: 'sekstiliun tahun',
  Yy: 'septiliun tahun',
};
/**
 * NUBASE half-life text in Indonesian: "12.32 y ± 0.02" → "12,32 tahun (± 0,02 tahun)", "Stable" → "Stabil",
 * "Stable >1.3Ey" → "Stabil (waktu paruh lebih dari 1,3 kuintiliun tahun)", "~10 s" → "sekitar 10 detik",
 * "Not-specified <30ns" → "belum terukur pasti (kurang dari 30 nanodetik)", "p-Unstable" → unbound to proton emission.
 */
function halfLifeText(raw) {
  const t = String(raw || '').trim();
  if (!t || /^not-specified$/i.test(t)) return 'Belum diketahui';
  if (/^p-unstable$/i.test(t)) return 'Tidak terikat (langsung memancarkan proton)';
  const stable = /^stable\b/i.test(t);
  const unknown = /^not-specified\b/i.test(t);
  const rest = t.replace(/^(stable|not-specified)\s*/i, '');
  if (stable && !rest) return 'Stabil';
  const m = rest.match(/^([<>~]?)\s*(\d[\d.]*(?:[eE][-+]?\d+)?)\s*([a-zA-Zµμ]+)(?:\s*±\s*([\d.eE+-]+))?/);
  if (!m) return stable ? 'Stabil' : unknown ? 'Belum diketahui' : t;
  const op = { '<': 'kurang dari ', '>': 'lebih dari ', '~': 'sekitar ' }[m[1]] || '';
  const value = Number(m[2]).toLocaleString('id-ID', { maximumSignificantDigits: 6 });
  const unit = HALF[m[3] === 'μs' || m[3] === 'µs' ? 'us' : m[3]] || HALF[m[3] + 's'] || m[3];
  const text = `${op}${value} ${unit}${m[4] && !op ? ` (± ${Number(m[4]).toLocaleString('id-ID', { maximumSignificantDigits: 4 })} ${unit})` : ''}`;
  if (stable) return `Stabil (waktu paruh ${text})`;
  if (unknown) return `belum terukur pasti (${text})`;
  return text;
}

function isotopePage(row, data, siblings) {
  const [z, A, half, seconds, mainDecay, abundance] = row;
  const e = getElement(z);
  const rec = data.elements.get(z);
  const nuc = (rec?.nuclides || []).find(n => n.A === A) || {};
  const natural = (rec?.natural || []).find(n => n.A === A);
  const stable = seconds === -1;
  const label = nuclideLabel(A, e.s);
  const name = `${e.id}-${A}`;
  const routeId = nuclideId(e.s, A);
  const decays = (nuc.decay || []).filter(d => DECAY[d.mode]);
  const daughters = decays.map(d => ({ ...d, to: daughter(z, A, d.mode) })).filter(d => d.to && d.to.A > 0);
  const nuclear = NUCLEAR.filter(r => [...r.r, ...r.p].some(x => x[0] === A && x[1] === z));
  const uses = (rec?.isotopeUses || []).filter(u =>
    new RegExp(`\\b${A}${e.s}\\b|${e.s}-${A}\\b`).test(u.text)
  );
  const lead = `${name} (${label}) adalah ${stable ? 'isotop stabil' : 'isotop radioaktif'} ${e.id.toLowerCase()} dengan ${z} proton dan ${A - z} neutron (nomor massa ${A}).${stable ? '' : ` Waktu paruhnya ${halfLifeText(half).replace(/^(Belum|Tidak)/, w => w.toLowerCase())}${mainDecay ? `, meluruh terutama lewat ${id(DECAY[mainDecay]?.name || [mainDecay]).toLowerCase()}` : ''}.`}${natural ? ` Kelimpahan alaminya ${natural.abundance}.` : ''}`;
  const main = `<article class="container isotope">
    ${pageHead({
      title: `${name} (${label})`,
      eyebrow: `Nuklida · ${stable ? 'stabil' : 'radioaktif'}${natural ? ' · alami' : ''}`,
      lead,
      crumbs: [
        ['Isotop', '/isotope'],
        [e.id, `/atom/${e.s}`],
        [routeId, ''],
      ],
    })}
    ${section(
      'Data nuklida',
      facts([
        ['Unsur', link(`/atom/${e.s}`, `${e.id} (${e.s}, Z = ${z})`)],
        ['Nomor massa (A)', String(A)],
        ['Proton (Z)', String(z)],
        ['Neutron (N)', String(A - z)],
        ['Massa atom', esc(nuc.mass ? `${nuc.mass} u` : '–')],
        ['Waktu paruh', esc(halfLifeText(half))],
        [
          'Mode peluruhan',
          decays.length
            ? decays
                .map(
                  d =>
                    `${esc(id(DECAY[d.mode].name))}${d.pct != null ? ` (${d.op === '=' ? '' : d.op} ${num(d.pct, 2)} %)` : ''}`
                )
                .join(', ')
            : stable
              ? 'Tidak meluruh'
              : esc(mainDecay || '–'),
        ],
        [
          'Inti anak',
          daughters.length
            ? daughters
                .map(d =>
                  link(
                    `/isotope/${nuclideId(d.to.element.s, d.to.A)}`,
                    `${d.to.element.id}-${d.to.A} (${nuclideLabel(d.to.A, d.to.element.s)})`
                  )
                )
                .join(', ')
            : '–',
        ],
        ['Kelimpahan alami', esc(natural?.abundance || (abundance ? abundance : '–'))],
        ['Tahun penemuan', nuc.year ? String(nuc.year) : '–'],
        ['Sumber data', esc(data.isotopes.source)],
      ])
    )}
    ${section('Kegunaan isotop ' + e.id.toLowerCase(), list(uses.map(u => `<span lang="en">${esc(u.text)}</span>`)))}
    ${section('Reaksi inti', list(nuclear.map(r => link(`/reaction/${r.id}`, id(r.name)))))}
    ${section(
      'Isotop ' + e.id.toLowerCase() + ' lainnya',
      `<p>${siblings
        .filter(r => r[1] !== A)
        .map(r => link(`/isotope/${nuclideId(e.s, r[1])}`, nuclideLabel(r[1], e.s)))
        .join(', ')}</p>`
    )}
    ${section('Pelajari', chips([link('/learn/nuklir', 'Kimia inti', 'chip'), link(`/lab/paruh?z=${z}&a=${A}`, `Simulasi peluruhan ${label}`, 'chip'), link('/isotope', 'Bagan nuklida', 'chip')]))}
    ${sectionLinks()}
  </article>`;
  return {
    path: `/isotope/${routeId}`,
    title: `${name} (${routeId}), isotop ${e.id.toLowerCase()}`,
    description: summary(lead),
    main,
    crumbs: [
      ['Isotop', '/isotope'],
      [e.id, `/atom/${e.s}`],
      [routeId, `/isotope/${routeId}`],
    ],
  };
}

function learnHubPage() {
  const main = `<div class="container">
    ${pageHead({ title: 'Materi belajar kimia', crumbs: [['Belajar', '']], lead: `${TOPICS.length} topik kimia mengikuti Kurikulum Merdeka dan kimia dasar perguruan tinggi. Setiap topik ditulis dalam empat lapis kedalaman (SD Sederhana, SMP Standar, SMA Lanjutan, Kuliah Mendalam) dengan poin kunci, molekul contoh, laboratorium virtual, kuis, catatan guru, dan rujukan OpenStax.` })}
    ${Object.entries(PATHS)
      .map(([lv, ids]) =>
        section(
          `Jalur ${levelName(lv)} · ${id(PHASES[lv])}`,
          `<ol>${ids
            .map(findTopic)
            .filter(Boolean)
            .map(t => `<li>${link(`/learn/${t.id}`, id(t.title))} — ${esc(id(t.summary))}</li>`)
            .join('')}</ol>`
        )
      )
      .join('')}
    ${section('Semua topik', list(TOPICS.map(t => `${link(`/learn/${t.id}`, id(t.title))} (${t.levels.map(levelName).join(', ')})`)))}
    ${sectionLinks()}
  </div>`;
  return { path: '/learn', title: 'Belajar', main, crumbs: [['Belajar', '/learn']] };
}

function learnPage(t, data) {
  const full = data.topics.get(t.id);
  const title = id(t.title);
  const links = t.links || {};
  const molecules = [...new Set([...(full.molecules || []), ...(links.m || [])])]
    .map(getMolecule)
    .filter(Boolean);
  const elements = (links.e || []).map(getElement).filter(Boolean);
  const ions = (links.i || []).map(getIon).filter(Boolean);
  const reactions = (links.r || []).map(getReaction).filter(Boolean);
  const materials = (links.mat || []).map(getMaterial).filter(Boolean);
  const terms = (links.g || []).map(findTerm).filter(Boolean);
  const labs = [...new Set([...(full.labs || []), ...(links.lab || [])])].map(findLab).filter(Boolean);
  const domains = DOMAINS.filter(d => d.topics.includes(t.id));
  const layers = ['sd', 'smp', 'sma', 'kuliah'].filter(l => full.body?.[l]);
  const main = `<article class="container lesson">
    ${pageHead({
      title,
      eyebrow: `Materi · ${t.levels.map(levelName).join(', ')}`,
      lead: id(t.summary),
      crumbs: [
        ['Belajar', '/learn'],
        [title, ''],
      ],
    })}
    ${section('Poin kunci', list((full.points || []).map(p => esc(id(p)))))}
    ${layers
      .map(
        l =>
          `<section class="mol-section lesson-layer" data-layer="${l}"><h2>${esc(id(LAYERS[l]))} · ${esc(id(PHASES[l]))}</h2>${lessonHTML(id(full.body[l]))}</section>`
      )
      .join('')}
    ${section('Kegiatan', list(Object.entries(full.activity || {}).map(([l, a]) => `<strong>${esc(levelName(l))}:</strong> ${esc(id(a))}`)))}
    ${section('Molekul dalam materi ini', chips(molecules.map(m => link(`/molecule/${m.id}`, id(m.name), 'chip'))))}
    ${section('Unsur', chips(elements.map(e => link(`/atom/${e.s}`, `${e.id} (${e.s})`, 'chip'))))}
    ${section('Ion', chips(ions.map(i => link(`/ion/${i.id}`, id(i.name), 'chip'))))}
    ${section('Reaksi', list(reactions.map(r => link(`/reaction/${r.id}`, id(r.name)))))}
    ${section('Material', chips(materials.map(m => link(`/material/${m.id}`, id(m.name), 'chip'))))}
    ${section('Laboratorium virtual', list(labs.map(l => `${link(`/lab/${l.id}`, id(l.title))} — ${esc(id(l.summary))}`)))}
    ${section('Istilah', chips(terms.map(g => link(`/glossary/${g.key}`, id(g.term), 'chip'))))}
    ${section('Peta ilmu kimia', chips(domains.map(d => link(`/peta/${d.id}`, id(d.name), 'chip'))))}
    ${section('Kuis', `<p>${link(`/quiz/topic-${t.id}`, `Kuis ${title.toLowerCase()} (${t.nQuiz} soal)`)}</p>`)}
    ${section('Rujukan', refList(full.refs))}
    ${sectionLinks()}
  </article>`;
  return {
    path: `/learn/${t.id}`,
    title,
    description: summary(id(t.summary)),
    main,
    crumbs: [
      ['Belajar', '/learn'],
      [title, `/learn/${t.id}`],
    ],
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: id(t.summary),
        inLanguage: 'id',
        isAccessibleForFree: true,
        educationalLevel: t.levels.map(levelName),
        author: { '@type': 'Organization', name: 'Asadin Edu' },
      },
    ],
  };
}

function labHubPage() {
  const main = `<div class="container">
    ${pageHead({ title: 'Laboratorium virtual', crumbs: [['Laboratorium', '']], lead: `${LABS.length} simulasi interaktif untuk mencoba, mengamati, dan menemukan: wujud zat, orbital, uji nyala, bentuk molekul, kristal, penyetaraan reaksi, stoikiometri, pH, titrasi, hukum gas, laju reaksi, waktu paruh, dan sel volta.` })}
    ${section('Semua laboratorium', list(LABS.map(l => `${link(`/lab/${l.id}`, id(l.title))} (${l.levels.map(levelName).join(', ')}) — ${esc(id(l.summary))}`)))}
    ${sectionLinks()}
  </div>`;
  return { path: '/lab', title: 'Laboratorium', main, crumbs: [['Laboratorium', '/lab']] };
}

function labPage(l) {
  const title = id(l.title);
  const topic = findTopic(l.topic);
  const main = `<article class="container lab">
    ${pageHead({
      title,
      eyebrow: `Laboratorium virtual · ${l.levels.map(levelName).join(', ')}`,
      lead: id(l.summary),
      crumbs: [
        ['Laboratorium', '/lab'],
        [title, ''],
      ],
    })}
    <p>Simulasi ini berjalan di peramban dan memerlukan JavaScript. ${topic ? `Materi pendampingnya: ${link(`/learn/${topic.id}`, id(topic.title))}. ${esc(id(topic.summary))}` : ''}</p>
    ${section('Laboratorium lain', list(LABS.filter(x => x.id !== l.id).map(x => link(`/lab/${x.id}`, id(x.title)))))}
    ${sectionLinks()}
  </article>`;
  return {
    path: `/lab/${l.id}`,
    title,
    description: summary(id(l.summary)),
    main,
    crumbs: [
      ['Laboratorium', '/lab'],
      [title, `/lab/${l.id}`],
    ],
  };
}

function materialHubPage() {
  const main = `<div class="container">
    ${pageHead({ title: 'Material dan campuran', crumbs: [['Material', '']], lead: `${MATERIALS.length} material dan campuran: paduan logam, kaca, keramik, polimer, komposit, larutan, koloid, suspensi, campuran heterogen, dan makromolekul hayati dengan komposisi, sifat, kegunaan, dan sumbernya.` })}
    ${Object.entries(MATERIAL_TYPES)
      .map(([type, t]) =>
        section(
          id(t.name),
          `<p>${esc(id(t.def))}</p>${list(MATERIALS.filter(m => m.type === type).map(m => `${link(`/material/${m.id}`, id(m.name))} — ${esc(id(m.about))}`))}`
        )
      )
      .join('')}
    ${sectionLinks()}
  </div>`;
  return { path: '/material', title: 'Material & campuran', main, crumbs: [['Material', '/material']] };
}

function materialPage(m) {
  const name = id(m.name);
  const type = MATERIAL_TYPES[m.type];
  const topics = TOPICS.filter(t => t.links?.mat?.includes(m.id));
  const main = `<article class="container material">
    ${pageHead({
      title: name,
      eyebrow: `${id(type?.name)} · ${levelName(m.lv)}`,
      lead: id(m.about),
      crumbs: [
        ['Material', '/material'],
        [id(type?.name), `/material?type=${m.type}`],
        [name, ''],
      ],
    })}
    ${section('Apa itu ' + id(type?.name).toLowerCase() + '?', type ? `<p>${esc(id(type.def))}</p>` : '')}
    ${section('Komposisi', list((m.comp || []).map(([code, note]) => `${compLink(code)}${note ? ` — ${esc(id(note))}` : ''}`)))}
    ${section('Sifat', m.props ? `<p>${esc(id(m.props))}</p>` : '')}
    ${section('Kegunaan', m.uses ? `<p>${esc(id(m.uses))}</p>` : '')}
    ${section('Pemisahan campuran', m.sep ? `<p>${esc(id(m.sep))}</p>` : '')}
    ${section('Struktur', m.pdb ? `<p>Struktur tiga dimensi: <a href="${esc(pdbURL(m.pdb))}" rel="noopener">RCSB PDB ${esc(m.pdb)}</a>.</p>` : '')}
    ${section('Pelajari lebih lanjut', topicLinks(topics))}
    ${section('Rujukan', refList(m.src))}
    ${sectionLinks()}
  </article>`;
  return {
    path: `/material/${m.id}`,
    title: name,
    description: summary(id(m.about)),
    main,
    crumbs: [
      ['Material', '/material'],
      [name, `/material/${m.id}`],
    ],
  };
}

const STATE_NAMES = { s: 'padat', l: 'cair', g: 'gas', aq: 'larutan dalam air' };
function equationText(r) {
  const nuclear = r.types.includes('nuklir');
  const term = sp => {
    if (nuclear) {
      const [A, Z, sym, n = 1] = sp;
      const e = getElement(Z);
      const label =
        e && A > 0
          ? link(`/isotope/${nuclideId(sym, A)}`, nuclideLabel(A, sym))
          : `${A > 0 ? esc(String(A)) : ''}${esc(sym)}`;
      return `${n > 1 ? `${n} ` : ''}${label}`;
    }
    const [coef, f, st, ref, label] = sp;
    const shown = label ? esc(label) : esc(f);
    const [kind, idRef] = String(ref || '').split(':');
    const href =
      kind === 'm' && getMolecule(idRef)
        ? `/molecule/${idRef}`
        : kind === 'i' && getIon(idRef)
          ? `/ion/${idRef}`
          : '';
    return `${coef === 1 ? '' : `${esc(coef)} `}${href ? `<a href="${href}">${shown}</a>` : shown}${st ? `<sub>(${esc(st)})</sub>` : ''}`;
  };
  return `${r.r.map(term).join(' + ')} ${r.eq || '→'} ${r.p.map(term).join(' + ')}`;
}

function reactionHubPage() {
  const main = `<div class="container">
    ${pageHead({ title: 'Pustaka reaksi', crumbs: [['Reaksi', '']], lead: `${ALL_REACTIONS.length} reaksi setara: ${LIBRARY.length} reaksi kimia dan ${NUCLEAR.length} reaksi inti, dikelompokkan menurut jenis (sintesis, penguraian, pembakaran, pertukaran, asam–basa, redoks, pengendapan, dan lainnya) dengan persamaan, kondisi, perubahan yang terjadi, dan pengamatan.` })}
    ${Object.entries(REACTION_TYPES)
      .map(([type, t]) =>
        section(
          id(t.name),
          `<p>${esc(id(t.def))}</p>${list(ALL_REACTIONS.filter(r => r.types.includes(type)).map(r => `${link(`/reaction/${r.id}`, id(r.name))}: ${equationText(r)}`))}`
        )
      )
      .join('')}
    ${sectionLinks()}
  </div>`;
  return { path: '/reaction', title: 'Reaksi', main, crumbs: [['Reaksi', '/reaction']] };
}

function reactionPage(r) {
  const name = id(r.name);
  const topic = findTopic(r.topic);
  const types = r.types.map(t => REACTION_TYPES[t]).filter(Boolean);
  const main = `<article class="container reaction">
    ${pageHead({
      title: name,
      eyebrow: `Reaksi · ${types.map(t => id(t.name)).join(', ')} · ${levelName(r.lv)}`,
      crumbs: [
        ['Reaksi', '/reaction'],
        [name, ''],
      ],
    })}
    <p class="equation">${equationText(r)}</p>
    <p class="muted small">Keterangan wujud: ${Object.entries(STATE_NAMES)
      .map(([k, v]) => `(${k}) ${v}`)
      .join(', ')}.</p>
    ${section('Kondisi', r.cond ? `<p>${esc(id(r.cond))}</p>` : '')}
    ${section('Apa yang terjadi', r.change ? `<p>${esc(id(r.change))}</p>` : '')}
    ${section('Pengamatan', r.obs ? `<p>${esc(id(r.obs))}</p>` : '')}
    ${section('Jenis reaksi', list(types.map(t => `<strong>${esc(id(t.name))}</strong>: ${esc(id(t.def))}`)))}
    ${section('Pelajari lebih lanjut', topic ? topicLinks([topic]) : '')}
    ${section('Rujukan', refList(r.src))}
    ${sectionLinks()}
  </article>`;
  const description = summary(
    `${name}: ${r.r.map(x => (r.types.includes('nuklir') ? nuclideLabel(x[0], x[2]) : x[1])).join(' + ')} ${r.eq || '→'} ${r.p.map(x => (r.types.includes('nuklir') ? nuclideLabel(x[0], x[2]) : x[1])).join(' + ')}. ${id(r.change)}`
  );
  return {
    path: `/reaction/${r.id}`,
    title: name,
    description,
    main,
    crumbs: [
      ['Reaksi', '/reaction'],
      [name, `/reaction/${r.id}`],
    ],
  };
}

function petaHubPage() {
  const main = `<div class="container">
    ${pageHead({ title: 'Peta ilmu kimia', crumbs: [['Peta ilmu kimia', '']], lead: `Rantai materi dari materi, partikel, dan atom sampai reaksi dan transformasi, lalu ${DOMAINS.length} cabang kimia dengan ${new Set(DOMAINS.flatMap(d => d.concepts)).size} konsep, materi belajar, penjelajah, laboratorium, dan rujukan.` })}
    ${section('Rantai materi', `<ol class="matter-chain">${CHAIN.map(c => `<li>${link(c.go, id(c.name))} — ${esc(id(c.lead))}</li>`).join('')}</ol>`)}
    ${Object.entries(GROUPS)
      .map(([g, name]) =>
        section(
          id(name),
          list(
            DOMAINS.filter(d => d.group === g).map(
              d => `${link(`/peta/${d.id}`, id(d.name))} (${levelName(d.level)}) — ${esc(id(d.lead))}`
            )
          )
        )
      )
      .join('')}
    ${sectionLinks()}
  </div>`;
  return { path: '/peta', title: 'Peta ilmu kimia', main, crumbs: [['Peta ilmu kimia', '/peta']] };
}

function petaPage(d) {
  const name = id(d.name);
  const concepts = d.concepts.map(findTerm).filter(Boolean);
  const topics = d.topics.map(findTopic).filter(Boolean);
  const labs = (d.labs || []).map(findLab).filter(Boolean);
  const main = `<article class="container domain">
    ${pageHead({
      title: name,
      eyebrow: `${id(GROUPS[d.group])} · mulai ${levelName(d.level)}`,
      lead: id(d.lead),
      crumbs: [
        ['Peta ilmu kimia', '/peta'],
        [name, ''],
      ],
    })}
    ${section('Konsep', list(concepts.map(g => `${link(`/glossary/${g.key}`, id(g.term))} — ${esc(id(g.simple))}`)))}
    ${section('Materi belajar', list(topics.map(t => `${link(`/learn/${t.id}`, id(t.title))} — ${esc(id(t.summary))}`)))}
    ${section('Penjelajah', list((d.explorers || []).map(([href, label]) => link(href, id(label)))))}
    ${section('Laboratorium virtual', list(labs.map(l => `${link(`/lab/${l.id}`, id(l.title))} — ${esc(id(l.summary))}`)))}
    ${section('Rujukan', refList(d.src))}
    ${sectionLinks()}
  </article>`;
  return {
    path: `/peta/${d.id}`,
    title: name,
    description: summary(id(d.lead)),
    main,
    crumbs: [
      ['Peta ilmu kimia', '/peta'],
      [name, `/peta/${d.id}`],
    ],
  };
}

function glossaryHubPage() {
  const main = `<div class="container">
    ${pageHead({ title: 'Kamus kimia', crumbs: [['Kamus', '']], lead: `${GLOSSARY.length} istilah kimia dengan penjelasan sederhana dan definisi ilmiah, dikelompokkan menurut tema dan tersambung ke peta ilmu kimia, materi belajar, dan molekul contoh.` })}
    ${Object.entries(GLOSSARY_CATS)
      .map(([cat, name]) =>
        section(
          id(name),
          list(
            GLOSSARY.filter(g => g.cat === cat).map(
              g => `${link(`/glossary/${g.key}`, id(g.term))} — ${esc(id(g.simple))}`
            )
          )
        )
      )
      .join('')}
    ${sectionLinks()}
  </div>`;
  return { path: '/glossary', title: 'Kamus', main, crumbs: [['Kamus', '/glossary']] };
}

function glossaryPage(g) {
  const term = id(g.term);
  const see = (g.see || []).map(findTerm).filter(Boolean);
  const molecules = (g.m || []).map(getMolecule).filter(Boolean);
  const domains = domainsOfConcept(g.key);
  const lessons = topicsLinking('g', g.key);
  const main = `<article class="container term">
    ${pageHead({
      title: term,
      eyebrow: `Kamus · ${id(GLOSSARY_CATS[g.cat])}`,
      lead: id(g.simple),
      crumbs: [
        ['Kamus', '/glossary'],
        [term, ''],
      ],
    })}
    ${section('Definisi ilmiah', g.sci ? `<p>${esc(id(g.sci))}</p>` : '')}
    ${section('Dalam bahasa Inggris', g.term[1] ? `<p lang="en">${esc(g.term[1])}</p>` : '')}
    ${section('Istilah terkait', chips(see.map(x => link(`/glossary/${x.key}`, id(x.term), 'chip'))))}
    ${section('Contoh molekul', chips(molecules.map(m => link(`/molecule/${m.id}`, id(m.name), 'chip'))))}
    ${section('Peta ilmu kimia', chips(domains.map(d => link(`/peta/${d.id}`, id(d.name), 'chip'))))}
    ${section('Materi belajar', topicLinks(lessons))}
    ${sectionLinks()}
  </article>`;
  return {
    path: `/glossary/${g.key}`,
    title: term,
    description: summary(`${term}: ${id(g.simple)} ${id(g.sci)}`),
    main,
    crumbs: [
      ['Kamus', '/glossary'],
      [term, `/glossary/${g.key}`],
    ],
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        name: term,
        description: id(g.sci) || id(g.simple),
        inLanguage: 'id',
        inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Kamus kimia Kimialoka' },
      },
    ],
  };
}

function aroundHubPage() {
  const main = `<div class="container">
    ${pageHead({ title: 'Kimia di sekitarku', crumbs: [['Di sekitarku', '']], lead: 'Molekul-molekul yang kamu temui setiap hari: di dapur, kamar mandi, tubuh, apotek, kebun, udara, bumi, pembangkit energi, gawai, dan sekolah.' })}
    ${section('Tempat', list(PLACES.map(p => `${link(`/around/${p.id}`, id(p.name))} — ${esc(id(p.about))} (${moleculesInPlace(p.id).length} molekul)`)))}
    ${sectionLinks()}
  </div>`;
  return { path: '/around', title: 'Di sekitarku', main, crumbs: [['Di sekitarku', '/around']] };
}

function aroundPage(p, data) {
  const name = id(p.name);
  const molecules = moleculesInPlace(p.id);
  const main = `<article class="container place">
    ${pageHead({
      title: name,
      eyebrow: 'Kimia di sekitarku',
      lead: id(p.about),
      crumbs: [
        ['Di sekitarku', '/around'],
        [name, ''],
      ],
    })}
    ${section('Molekul di sini', list(molecules.map(m => `${link(`/molecule/${m.id}`, id(m.name))} (${formulaHTML(data.moleculeIndex.get(m.id)?.formula || '')}) — ${esc(id(m.about))}`)))}
    ${section('Tempat lain', chips(PLACES.filter(x => x.id !== p.id).map(x => link(`/around/${x.id}`, id(x.name), 'chip'))))}
    ${sectionLinks()}
  </article>`;
  return {
    path: `/around/${p.id}`,
    title: name,
    description: summary(id(p.about)),
    main,
    crumbs: [
      ['Di sekitarku', '/around'],
      [name, `/around/${p.id}`],
    ],
  };
}

const QUIZ_KINDS = [
  ['structure', 'Tebak dari struktur', 'Kenali molekul dari gambar strukturnya.'],
  ['formula', 'Rumus kimia', 'Pasangkan nama senyawa dengan rumus kimianya.'],
  ['symbols', 'Lambang unsur', 'Tebak unsur dari lambang dan nomor atomnya.'],
  ['category', 'Kategori unsur', 'Logam alkali, halogen, gas mulia: di mana letaknya?'],
  ['classes', 'Golongan senyawa', 'Masukkan senyawa ke golongan yang tepat.'],
  ['places', 'Kimia di sekitarku', 'Di mana molekul ini biasa ditemukan?'],
  ['ions', 'Ion', 'Rumus, muatan, dan nama ion.'],
  ['reactions', 'Reaksi', 'Jenis reaksi dan hasil reaksi.'],
  ['mixed', 'Campuran', 'Soal acak dari semua jenis.'],
];
function quizHubPage() {
  const main = `<div class="container">
    ${pageHead({ title: 'Tantangan kuis', crumbs: [['Kuis', '']], lead: `Uji pemahamanmu dengan kuis per topik (${TOPICS.reduce((a, t) => a + (t.nQuiz || 0), 0)} soal dalam ${TOPICS.length} topik) dan kuis cepat tentang struktur, rumus, lambang unsur, golongan, ion, dan reaksi. Soal disesuaikan dengan jenjangmu.` })}
    ${section('Kuis cepat', list(QUIZ_KINDS.map(([key, name, desc]) => `${link(`/quiz/${key}`, name)} — ${esc(desc)}`)))}
    ${section('Kuis per topik', list(TOPICS.map(t => `${link(`/quiz/topic-${t.id}`, id(t.title))} (${t.nQuiz} soal)`)))}
    ${sectionLinks()}
  </div>`;
  return { path: '/quiz', title: 'Kuis', main, crumbs: [['Kuis', '/quiz']] };
}
function quizPage(key, name, desc, topic) {
  const main = `<article class="container quiz">
    ${pageHead({
      title: `Kuis: ${name}`,
      eyebrow: 'Kuis',
      lead: desc,
      crumbs: [
        ['Kuis', '/quiz'],
        [name, ''],
      ],
    })}
    <p>Kuis ini interaktif dan memerlukan JavaScript. ${topic ? `Pelajari dulu materinya: ${link(`/learn/${topic.id}`, id(topic.title))}.` : `Lihat juga ${link('/learn', 'materi belajar')} dan ${link('/quiz', 'kuis lainnya')}.`}</p>
    ${sectionLinks()}
  </article>`;
  return {
    path: `/quiz/${key}`,
    title: `Kuis: ${name}`,
    description: summary(desc),
    main,
    crumbs: [
      ['Kuis', '/quiz'],
      [name, `/quiz/${key}`],
    ],
  };
}

/** Section pages whose content is interactive or per-user: a heading, a paragraph and links so direct loads work. */
function shellPage(path, title, lead, crumbLabel, extra = '', noindex = false) {
  const main = `<div class="container">
    ${pageHead({ title, lead, crumbs: [[crumbLabel, '']] })}
    ${extra}
    ${sectionLinks()}
  </div>`;
  return { path, title, description: summary(lead), main, crumbs: [[crumbLabel, path]], noindex };
}
function staticPages() {
  return [
    shellPage(
      '/search',
      'Cari di Kimialoka',
      'Satu kotak untuk semuanya: nama zat dalam bahasa Indonesia atau Inggris, rumus kimia, nomor CAS, SMILES, unsur, isotop (misalnya C-14), ion, golongan, reaksi, material, materi belajar, istilah kamus, dan jutaan senyawa PubChem.',
      'Cari',
      `<p>Coba: ${['air', 'besi', 'C-14', 'sulfat', 'C6H12O6', 'baja'].map(q => link(`/search?q=${encodeURIComponent(q)}`, q)).join(', ')}.</p>`
    ),
    shellPage(
      '/compare',
      'Bandingkan molekul',
      'Letakkan dua molekul berdampingan: model 3D, rumus, massa molar, sifat fisika, bahaya GHS, dan kegunaannya. Pilih dari katalog atau cari di PubChem.',
      'Bandingkan',
      `<p>Mulai dari ${link('/explore', 'penjelajah molekul')}.</p>`
    ),
    shellPage(
      '/about',
      'Tentang Kimialoka dan sumber data',
      'Kimialoka adalah ensiklopedia kimia interaktif dan platform belajar terbuka dari Asadin Edu, tanpa iklan dan pelacak. Data berasal dari sumber resmi dan bebas: PubChem (NIH), IUPAC CIAAW, IAEA Atomic Mass Data Center, Wikidata, Wikipedia, Wikimedia Commons, RCSB PDB, dan buku teks OpenStax (CC BY 4.0). Konten Kimialoka berlisensi CC BY-SA 4.0, kodenya MIT.',
      'Tentang',
      `<p>Kode sumber: <a href="https://github.com/asaddin02/asadin-edu-kimialoka" rel="noopener">github.com/asaddin02/asadin-edu-kimialoka</a>. Lihat juga ${link('/dukung', 'cara mendukung Kimialoka')}.</p>`
    ),
    shellPage(
      '/dukung',
      'Dukung Kimialoka',
      'Kimialoka gratis, terbuka, dan bebas iklan. Dukung pengembangannya lewat donasi (Saweria atau Ko-fi), laporan kesalahan, atau kontribusi konten dan kode di GitHub.',
      'Dukung'
    ),
    shellPage(
      '/teacher',
      'Ruang guru',
      'Perangkat untuk guru IPA dan kimia: rencana pembelajaran per topik sesuai Kurikulum Merdeka, lembar kerja siap cetak, kartu molekul, dan tautan tugas yang bisa dibagikan ke siswa tanpa akun.',
      'Ruang guru',
      `<p>Materi yang tersedia: ${TOPICS.map(t => link(`/learn/${t.id}`, id(t.title))).join(', ')}.</p>`
    ),
    shellPage(
      '/saved',
      'Tersimpan',
      'Molekul, unsur, dan materi yang kamu simpan di perangkat ini, catatanmu, serta kemajuan belajar dan lencana. Semua data tetap di perangkatmu.',
      'Tersimpan',
      '',
      true
    ),
    shellPage(
      '/assignment',
      'Tugas dari guru',
      'Halaman ini membuka tugas yang dibagikan guru lewat tautan. Jawabanmu disimpan di perangkat ini.',
      'Tugas',
      '',
      true
    ),
  ];
}

/* ---------- Assembling the shell ---------- */
function jsonldFor(page, siteURL) {
  const items = [...(page.jsonld || [])];
  if (page.crumbs?.length && siteURL) {
    const trail = [HOME_CRUMB, ...page.crumbs];
    items.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: trail.map(([name, href], i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name,
        item: `${siteURL}${href}`,
      })),
    });
  }
  if (siteURL)
    for (const item of items)
      if (item['@type'] !== 'BreadcrumbList' && !item.url) item.url = `${siteURL}${page.path}`;
  return items
    .map(
      item => `<script type="application/ld+json">${JSON.stringify(item).replace(/</g, '\\u003c')}</script>`
    )
    .join('\n    ');
}

/** Fills the index.html shell with one page's metadata and content. */
export function renderShell(shell, page, siteURL) {
  const fullTitle = page.path === '/' ? page.title : `${page.title} · ${SITE_NAME}`;
  const description = page.description || summary(page.main);
  const canonical = siteURL ? `${siteURL}${page.path}` : '';
  let html = shell
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(fullTitle)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${esc(description)}" />`
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${esc(fullTitle)}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${esc(description)}" />`
    );
  const head = [
    canonical ? `<meta property="og:url" content="${esc(canonical)}" />` : '',
    canonical ? `<link rel="canonical" href="${esc(canonical)}" />` : '',
    page.noindex ? '<meta name="robots" content="noindex" />' : '',
    jsonldFor(page, siteURL),
  ]
    .filter(Boolean)
    .join('\n    ');
  if (head) html = html.replace('</head>', `  ${head}\n  </head>`);
  const main = `<main id="main" tabindex="-1" data-prerendered="${esc(page.path)}">
      ${page.main}
      <noscript>
        <p class="container muted small">Model 3D, laboratorium virtual, kuis, dan pencarian PubChem memerlukan JavaScript. Kimialoka tidak memakai pelacak atau iklan.</p>
      </noscript>
    </main>`;
  html = html.replace(/<main id="main" tabindex="-1">[\s\S]*?<\/main>/, main);
  if (!html.includes('data-prerendered'))
    throw new Error('index.html <main> changed; update scripts/prerender.mjs');
  return html;
}

/** Every page, in sitemap order. */
export async function allPages() {
  const data = await loadData();
  const pages = [homePage(data), tablePage(), atomHubPage()];
  for (const e of ELEMENTS) pages.push(elementPage(e, data));
  pages.push(explorePage(data));
  for (const m of MOLECULES) pages.push(moleculePage(m, data));
  pages.push(classesHubPage());
  for (const c of CLASSES) pages.push(classPage(c, data));
  pages.push(ionHubPage());
  for (const i of IONS) pages.push(ionPage(i, data));
  pages.push(isotopeHubPage(data));
  const byZ = new Map();
  for (const r of data.isotopes.rows) byZ.set(r[0], [...(byZ.get(r[0]) || []), r]);
  for (const r of data.isotopes.rows) if (getElement(r[0])) pages.push(isotopePage(r, data, byZ.get(r[0])));
  pages.push(learnHubPage());
  for (const t of TOPICS) pages.push(learnPage(t, data));
  pages.push(labHubPage());
  for (const l of LABS) pages.push(labPage(l));
  pages.push(materialHubPage());
  for (const m of MATERIALS) pages.push(materialPage(m));
  pages.push(reactionHubPage());
  for (const r of ALL_REACTIONS) pages.push(reactionPage(r));
  pages.push(petaHubPage());
  for (const d of DOMAINS) pages.push(petaPage(d));
  pages.push(glossaryHubPage());
  for (const g of GLOSSARY) pages.push(glossaryPage(g));
  pages.push(aroundHubPage());
  for (const p of PLACES) pages.push(aroundPage(p, data));
  pages.push(quizHubPage());
  for (const [key, name, desc] of QUIZ_KINDS) pages.push(quizPage(key, name, desc, null));
  for (const t of TOPICS) pages.push(quizPage(`topic-${t.id}`, id(t.title), id(t.summary), t));
  pages.push(...staticPages());
  const seen = new Set();
  for (const p of pages) {
    if (seen.has(p.path)) throw new Error(`Duplicate prerendered route ${p.path}`);
    if (!/^\/([\w-]+(\/[\w.-]+)?)?$/.test(p.path)) throw new Error(`Route is not URL-safe: ${p.path}`);
    seen.add(p.path);
  }
  return pages;
}

/** Writes dist/<route>.html for every page (the home page is dist/index.html) and returns the pages. */
export async function prerender({ dist, siteURL = '' }) {
  const shell = await readFile(join(dist, 'index.html'), 'utf8');
  const pages = await allPages();
  for (const page of pages) {
    const file = page.path === '/' ? join(dist, 'index.html') : join(dist, `${page.path.slice(1)}.html`);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, renderShell(shell, page, siteURL));
  }
  return pages;
}

/** 404.html: the app shell marked noindex, so a direct load of a route that was not prerendered still boots the app. */
export function notFoundShell(shell) {
  const page = {
    path: '/404',
    title: 'Halaman tidak ditemukan',
    description: 'Alamat ini tidak ada di Kimialoka.',
    noindex: true,
    main: `<section class="container page-state">
        <h1>Halaman tidak ditemukan</h1>
        <p>Alamat ini tidak ada di Kimialoka.</p>
        <p><a class="btn btn-primary" href="/">Kembali ke beranda Kimialoka</a></p>
        ${sectionLinks()}
      </section>`,
  };
  return renderShell(shell, page, '');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const dist = join(root, 'dist');
  const pages = await prerender({ dist, siteURL: (process.env.SITE_URL || '').replace(/\/+$/, '') });
  console.log(`Prerendered ${pages.length} pages into dist/.`);
}
