// The chemistry knowledge map: /peta shows the chain from matter to transformation and every branch of
// chemistry; /peta/<domain> lists that domain's concepts, layered lessons, explorers, labs and references.
import { esc } from '../core/dom.js';
import { S, pick, fmt, depth, atLeast } from '../core/prefs.js';
import { levelName } from '../i18n/ui.js';
import { icon } from '../components/icons.js';
import { pageHead, breadcrumbs, extLink } from '../components/common.js';
import { CHAIN, DOMAINS, GROUPS, getDomain } from '../data/ontology.js';
import { findTerm, GLOSSARY } from '../data/glossary.js';
import { findTopic, TOPICS, LAYERS } from '../data/topics/index.js';
import { findLab, LABS } from '../data/curriculum.js';
import { reference } from '../data/references.js';
import { MOLECULES } from '../data/curatedMolecules.js';
import { IONS } from '../data/ions.js';
import { LIBRARY, NUCLEAR } from '../data/reactionLibrary.js';
import { MATERIALS } from '../data/materials.js';
import { CLASSES } from '../data/classes.js';

const s = S({
  title: ['Peta kimia', 'Chemistry map'],
  lead: [
    'Kimia menjelaskan dunia materi: dari partikel, atom, dan unsur sampai molekul, material, sifat, ikatan, dan reaksi. Mulailah dari materi, lalu ikuti rantainya atau pilih cabang ilmu kimia.',
    'Chemistry explains the world of matter: from particles, atoms and elements to molecules, materials, properties, bonds and reactions. Start from matter and follow the chain, or pick a branch of chemistry.',
  ],
  chain: ['Dari materi sampai transformasi', 'From matter to transformation'],
  chainLead: [
    'Setiap langkah membuka penjelajah atau materinya sendiri.',
    'Every step opens its own explorer or lesson.',
  ],
  coverage: ['Isi ensiklopedia', 'What the encyclopedia holds'],
  concepts: ['Konsep', 'Concepts'],
  lessons: ['Materi berjenjang', 'Layered lessons'],
  lessonsLead: [
    'Setiap materi ditulis dalam empat lapis: Sederhana (SD), Standar (SMP), Lanjutan (SMA), dan Mendalam (kuliah).',
    'Every lesson is written in four layers: Simple (primary), Standard (junior high), Advanced (senior high) and Deep dive (university).',
  ],
  explore: ['Jelajahi', 'Explore'],
  labs: ['Laboratorium virtual', 'Virtual labs'],
  refs: ['Rujukan', 'References'],
  related: ['Cabang yang berkaitan', 'Related branches'],
  notFound: ['Cabang kimia tidak ditemukan.', 'Branch of chemistry not found.'],
  nConcepts: ['{n} konsep', '{n} concepts'],
  nLessons: ['{n} materi', '{n} lessons'],
  fromLevel: ['Mulai jenjang {lv}', 'From {lv}'],
  conceptNote: [
    'Definisi di bawah mengikuti jenjang yang dipilih; buka istilah untuk definisi lain, istilah terkait, dan materi yang memakainya.',
    'Definitions follow the chosen level; open a term for the other definition, related terms and the lessons that use it.',
  ],
});

/** The chain Materi → Partikel → … → Transformasi, each step linking to its explorer or lesson. */
export const chainHTML = () =>
  `<ol class="matter-chain">${CHAIN.map(
    (c, i) =>
      `<li><a class="chain-step" href="${c.go}"><span class="step-number">${i + 1}</span>${icon(c.icon, { size: 20 })}<span class="step-content"><strong>${esc(pick(c.name))}</strong><small>${esc(pick(c.lead))}</small></span></a></li>`
  ).join('')}</ol>`;

export const title = route =>
  route.id ? pick(getDomain(route.id)?.name || ['Peta kimia', 'Chemistry map']) : s.title;

export function render({ id, main }) {
  if (id) return renderDomain(main, id);
  const stats = [
    [DOMAINS.length, ['cabang kimia', 'branches of chemistry'], '/peta'],
    [new Set(DOMAINS.flatMap(d => d.concepts)).size, ['konsep dalam peta', 'mapped concepts'], '/glossary'],
    [GLOSSARY.length, ['istilah kamus', 'glossary terms'], '/glossary'],
    [TOPICS.length, ['materi 4 lapis', '4-layer lessons'], '/learn'],
    [118, ['unsur', 'elements'], '/table'],
    ['3500+', ['nuklida (isotop)', 'nuclides (isotopes)'], '/isotope'],
    [IONS.length, ['ion', 'ions'], '/ion'],
    [MOLECULES.length, ['molekul & senyawa katalog', 'catalogue molecules & compounds'], '/explore'],
    [CLASSES.length, ['golongan senyawa', 'compound classes'], '/classes'],
    [
      MATERIALS.length,
      ['material, campuran & makromolekul', 'materials, mixtures & macromolecules'],
      '/material',
    ],
    [LIBRARY.length + NUCLEAR.length, ['reaksi setara', 'balanced reactions'], '/reaction'],
    [LABS.length, ['lab virtual', 'virtual labs'], '/lab'],
  ];
  const groups = Object.entries(GROUPS)
    .map(
      ([g, name]) => `<section aria-labelledby="grp-${g}">
      <h2 id="grp-${g}">${esc(pick(name))}</h2>
      <div class="grid grid-3">${DOMAINS.filter(d => d.group === g)
        .map(
          d => `<a class="card domain-card" href="/peta/${d.id}">
          <span class="topic-icon">${icon(d.icon, { size: 24 })}</span>
          <span class="card-title">${esc(pick(d.name))}</span>
          <span class="card-text">${esc(pick(d.lead))}</span>
          <span class="topic-meta">${esc(fmt(s.nConcepts, { n: d.concepts.length }))} · ${esc(fmt(s.nLessons, { n: d.topics.length }))} · ${esc(fmt(s.fromLevel, { lv: levelName(d.level) }))}</span>
        </a>`
        )
        .join('')}</div>
    </section>`
    )
    .join('');
  main.innerHTML = `<div class="container peta">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <section aria-labelledby="chain-title">
      <h2 id="chain-title">${esc(s.chain)}</h2>
      <p class="muted">${esc(s.chainLead)}</p>
      ${chainHTML()}
    </section>
    ${groups}
    <section aria-labelledby="cov-title">
      <h2 id="cov-title">${esc(s.coverage)}</h2>
      <ul class="coverage-grid">${stats
        .map(
          ([n, label, href]) =>
            `<li><a class="card coverage-item" href="${href}"><strong>${esc(n)}</strong><span>${esc(pick(label))}</span></a></li>`
        )
        .join('')}</ul>
    </section>
  </div>`;
}

function renderDomain(main, id) {
  const d = getDomain(id);
  if (!d) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><a class="btn" href="/peta">${esc(s.title)}</a></section>`;
    return;
  }
  const lv = depth();
  const simple = !atLeast('sma');
  const concepts = d.concepts.map(findTerm).filter(Boolean);
  const topics = d.topics.map(findTopic).filter(Boolean);
  const labs = d.labs.map(findLab).filter(Boolean);
  const related = DOMAINS.filter(o => o.id !== d.id && o.concepts.some(c => d.concepts.includes(c)))
    .map(o => [o, o.concepts.filter(c => d.concepts.includes(c)).length])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const refs = d.src.map(reference).filter(Boolean);

  main.innerHTML = `<article class="container peta-domain">
    ${breadcrumbs([
      [s.title, '/peta'],
      [pick(d.name), ''],
    ])}
    <header class="page-head">
      <p class="eyebrow">${icon(d.icon, { size: 18 })} ${esc(s.title)}</p>
      <h1>${esc(pick(d.name))}</h1>
      <p class="lead">${esc(pick(d.lead))}</p>
    </header>

    <section aria-labelledby="dom-lessons">
      <h2 id="dom-lessons">${icon('book', { size: 20 })} ${esc(s.lessons)}</h2>
      <p class="muted small">${esc(s.lessonsLead)}</p>
      <div class="grid grid-3">${topics
        .map(
          t => `<a class="card topic-card" href="/learn/${t.id}?lv=${t.layers.includes(lv) ? lv : t.layers[0]}">
          <span class="topic-icon">${icon(t.icon, { size: 22 })}</span>
          <span class="card-title">${esc(pick(t.title))}</span>
          <span class="card-text">${esc(pick(t.summary))}</span>
          <span class="topic-meta">${t.layers.map(l => `<span class="badge badge-${l}" title="${esc(pick(LAYERS[l]))}">${esc(levelName(l))}</span>`).join(' ')}</span>
        </a>`
        )
        .join('')}</div>
    </section>

    <section aria-labelledby="dom-concepts">
      <h2 id="dom-concepts">${icon('bulb', { size: 20 })} ${esc(s.concepts)} (${concepts.length})</h2>
      <p class="muted small">${esc(s.conceptNote)}</p>
      <ul class="concept-grid">${concepts
        .map(
          g =>
            `<li><a class="card concept-card" href="/glossary/${encodeURIComponent(g.key)}"><strong>${esc(pick(g.term))}</strong><span>${esc(pick(simple ? g.simple : g.sci))}</span></a></li>`
        )
        .join('')}</ul>
    </section>

    ${
      d.explorers.length
        ? `<section aria-labelledby="dom-explore"><h2 id="dom-explore">${icon('search', { size: 20 })} ${esc(s.explore)}</h2>
      <p class="chip-grid">${d.explorers.map(([href, label]) => `<a class="chip chip-lg" href="${esc(href)}">${esc(pick(label))} ${icon('arrowRight', { size: 14 })}</a>`).join(' ')}</p></section>`
        : ''
    }

    ${
      labs.length
        ? `<section aria-labelledby="dom-labs"><h2 id="dom-labs">${icon('flask', { size: 20 })} ${esc(s.labs)}</h2>
      <div class="grid grid-4">${labs
        .map(
          l =>
            `<a class="card lab-card" href="/lab/${l.id}"><span class="topic-icon">${icon(l.icon, { size: 22 })}</span><span class="card-title">${esc(pick(l.title))}</span><span class="card-text">${esc(pick(l.summary))}</span></a>`
        )
        .join('')}</div></section>`
        : ''
    }

    ${
      related.length
        ? `<section aria-labelledby="dom-related"><h2 id="dom-related">${esc(s.related)}</h2>
      <p class="chip-grid">${related.map(([o]) => `<a class="chip" href="/peta/${o.id}">${icon(o.icon, { size: 14 })} ${esc(pick(o.name))}</a>`).join(' ')}</p></section>`
        : ''
    }

    <section aria-labelledby="dom-refs" class="refs"><h2 id="dom-refs" class="h-small">${esc(s.refs)}</h2>
      <ul class="ref-list">${refs.map(r => `<li>${extLink(r.url, r.label)}</li>`).join('')}</ul>
      <p class="muted small">OpenStax, CC BY 4.0.</p>
    </section>
  </article>`;
}
