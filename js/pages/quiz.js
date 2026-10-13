// Quizzes: every lesson quiz plus quizzes generated fresh from the data each time.
import { $, esc, shuffle } from '../core/dom.js';
import { S, pick, fmt, getPrefs, rank } from '../core/prefs.js';
import { icon } from '../components/icons.js';
import { pageHead, breadcrumbs, loading, errorState } from '../components/common.js';
import { mountQuiz } from '../components/quiz.js';
import { TOPICS, findTopic, loadTopic, loadTopics, quizFor, bodyLevel } from '../data/topics/index.js';
import { MOLECULES, atLevel } from '../data/curatedMolecules.js';
import { ELEMENTS, CATEGORIES } from '../data/periodicTable.js';
import { getClass } from '../data/classes.js';
import { PLACES } from '../data/curriculum.js';
import { IONS } from '../data/ions.js';
import { LIBRARY, REACTION_TYPES } from '../data/reactionLibrary.js';
import { moleculeIndex, depiction } from '../services/data.js';
import { depictSVG } from '../components/depict.js';
import { formulaUnicode } from '../services/formula.js';
import { quizResults, earnedBadges, BADGES, progressStats } from '../core/userdata.js';

const s = S({
  title: ['Kuis', 'Quizzes'],
  lead: [
    'Kuis materi mengikuti jenjangmu. Kuis tantangan dibuat acak dari data Kimialoka setiap kali dimainkan, jadi selalu ada soal baru.',
    'Lesson quizzes follow your level. Challenge quizzes are generated at random from Kimialoka data every time, so there are always new questions.',
  ],
  challenges: ['Kuis tantangan', 'Challenge quizzes'],
  lessons: ['Kuis per materi', 'Lesson quizzes'],
  badges: ['Lencana', 'Badges'],
  best: ['Terbaik {best}/{total}', 'Best {best}/{total}'],
  notFound: ['Kuis tidak ditemukan.', 'Quiz not found.'],
  play: ['Mainkan', 'Play'],
  locked: ['Belum terbuka', 'Locked'],
  // generated
  structure: ['Tebak dari struktur', 'Name that structure'],
  structureLead: [
    'Lihat gambar struktur 2D dari PubChem, lalu tebak molekulnya.',
    'Look at a PubChem 2D structure and guess the molecule.',
  ],
  structureQ: ['Molekul apakah yang strukturnya seperti ini?', 'Which molecule has this structure?'],
  formula: ['Rumus kimia', 'Chemical formulas'],
  formulaLead: ['Cocokkan nama molekul dengan rumusnya.', 'Match molecules to their formulas.'],
  formulaQ: ['Apa rumus molekul {name}?', 'What is the molecular formula of {name}?'],
  symbols: ['Lambang unsur', 'Element symbols'],
  symbolsLead: [
    'Dari H sampai Og: kenali lambang dan nama unsur.',
    'From H to Og: know element symbols and names.',
  ],
  symbolQ: ['Unsur apakah yang berlambang {s}?', 'Which element has the symbol {s}?'],
  category: ['Golongan unsur', 'Element categories'],
  categoryLead: [
    'Logam alkali, halogen, gas mulia, atau lantanida?',
    'Alkali metal, halogen, noble gas or lanthanide?',
  ],
  categoryQ: ['{name} ({s}) termasuk kategori…', '{name} ({s}) belongs to…'],
  classes: ['Golongan molekul', 'Molecule classes'],
  classesLead: [
    'Alkohol, ester, garam, atau vitamin? Tentukan golongannya.',
    'Alcohol, ester, salt or vitamin? Name the class.',
  ],
  classQ: ['{name} termasuk golongan…', '{name} belongs to the class…'],
  places: ['Kimia di sekitarku', 'Chemistry around me'],
  placesLead: ['Di mana kita biasa menemukan zat ini?', 'Where do we usually find this substance?'],
  placeQ: ['Di mana {name} paling mungkin kamu temukan?', 'Where are you most likely to find {name}?'],
  ionsLead: [
    'Cocokkan nama ion dengan rumus dan muatannya.',
    'Match ion names to their formulas and charges.',
  ],
  ionQ: ['Apa rumus ion {name}?', 'What is the formula of the {name} ion?'],
  reactionsLead: [
    'Sintesis, penguraian, pembakaran, redoks, atau netralisasi? Tentukan jenis reaksinya.',
    'Synthesis, decomposition, combustion, redox or neutralisation? Name the reaction type.',
  ],
  reactionQ: ['Reaksi “{name}” termasuk jenis…', 'The reaction “{name}” is…'],
  mixed: ['Campuran semua materi', 'Mixed lessons'],
  mixedLead: [
    'Sepuluh soal acak dari seluruh materi jenjangmu.',
    'Ten random questions from all lessons at your level.',
  ],
});

export const title = route =>
  route.id
    ? pick(GEN[route.id]?.title || findTopic(route.id.replace('topic-', ''))?.title || ['Kuis', 'Quiz'])
    : s.title;

const GEN = {
  structure: {
    icon: 'molecule',
    title: ['Tebak dari struktur', 'Name that structure'],
    lead: 'structureLead',
    build: buildStructure,
  },
  formula: {
    icon: 'flask',
    title: ['Rumus kimia', 'Chemical formulas'],
    lead: 'formulaLead',
    build: buildFormula,
  },
  symbols: {
    icon: 'table',
    title: ['Lambang unsur', 'Element symbols'],
    lead: 'symbolsLead',
    build: buildSymbols,
  },
  category: {
    icon: 'atom',
    title: ['Golongan unsur', 'Element categories'],
    lead: 'categoryLead',
    build: buildCategory,
  },
  classes: {
    icon: 'layers',
    title: ['Golongan molekul', 'Molecule classes'],
    lead: 'classesLead',
    build: buildClasses,
  },
  places: {
    icon: 'pin',
    title: ['Kimia di sekitarku', 'Chemistry around me'],
    lead: 'placesLead',
    build: buildPlaces,
  },
  ions: {
    icon: 'charge',
    title: ['Nama & rumus ion', 'Ion names & formulas'],
    lead: 'ionsLead',
    build: buildIons,
  },
  reactions: {
    icon: 'swap',
    title: ['Jenis reaksi', 'Reaction types'],
    lead: 'reactionsLead',
    build: buildReactions,
  },
  mixed: {
    icon: 'sparkles',
    title: ['Campuran semua materi', 'Mixed lessons'],
    lead: 'mixedLead',
    build: buildMixed,
  },
};

export async function render({ id, main, isCurrent }) {
  if (!id) return renderList(main);
  const gen = Object.hasOwn(GEN, id) ? GEN[id] : null;
  const topicId = id.replace(/^topic-/, '');
  if (!gen && !findTopic(topicId)) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><a class="btn" href="/quiz">${esc(s.title)}</a></section>`;
    return;
  }
  let topic = null;
  if (!gen) {
    main.innerHTML = `<div class="container">${loading()}</div>`;
    topic = await loadTopic(topicId).catch(() => null);
    if (!isCurrent()) return;
    if (!topic) {
      main.innerHTML = `<div class="container">${errorState()}</div>`;
      return;
    }
  }
  const level = getPrefs().level;
  const name = gen ? pick(gen.title) : pick(topic.title);
  main.innerHTML = `<div class="container narrow">
    ${breadcrumbs([
      [s.title, '/quiz'],
      [name, ''],
    ])}
    ${pageHead({ title: esc(name), lead: esc(gen ? s[gen.lead] : pick(topic.summary)) })}
    <div class="card quiz-card" data-quiz></div>
  </div>`;
  const questions = gen ? await gen.build(level) : quizFor(topic, bodyLevel(topic, level));
  if (!isCurrent()) return;
  mountQuiz($('[data-quiz]', main), { id: gen ? `gen-${id}` : `topic-${topic.id}`, title: name, questions });
}

function renderList(main) {
  const results = quizResults();
  const earned = new Set(earnedBadges());
  const stats = progressStats();
  main.innerHTML = `<div class="container">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <section><h2>${esc(s.challenges)}</h2><div class="grid grid-4">
      ${Object.entries(GEN)
        .map(([k, g]) => {
          const r = results[`gen-${k}`];
          return `<a class="card lab-card" href="/quiz/${k}"><span class="topic-icon">${icon(g.icon, { size: 24 })}</span><span class="card-title">${esc(pick(g.title))}</span><span class="card-text">${esc(s[g.lead])}</span>${
            r ? `<span class="topic-meta">★ ${esc(fmt(s.best, r))}</span>` : ''
          }</a>`;
        })
        .join('')}
    </div></section>
    <section><h2>${esc(s.lessons)}</h2><div class="grid grid-3">
      ${TOPICS.map(t => {
        const r = results[`topic-${t.id}`];
        return `<a class="card topic-card" href="/quiz/topic-${t.id}"><span class="topic-icon">${icon(t.icon, { size: 22 })}</span><span class="card-title">${esc(pick(t.title))}</span>${
          r ? `<span class="topic-meta">★ ${esc(fmt(s.best, r))}</span>` : ''
        }</a>`;
      }).join('')}
    </div></section>
    <section><h2>${esc(s.badges)}</h2><div class="badges">
      ${BADGES.map(
        b =>
          `<div class="badge-card ${earned.has(b.id) ? 'is-earned' : ''}">${icon(b.icon, { size: 28 })}<strong>${esc(pick(b.name))}</strong><span>${esc(pick(b.goal))}</span>${
            earned.has(b.id) ? '' : `<span class="muted small">${esc(s.locked)}</span>`
          }</div>`
      ).join('')}
    </div><p class="muted small">${esc(pick(['Kemajuan', 'Progress']))}: ${stats.visited} ${esc(pick(['dikunjungi', 'visited']))} · ${stats.lessons} ${esc(pick(['materi', 'lessons']))} · ${stats.perfect} ${esc(pick(['kuis sempurna', 'perfect quizzes']))} · ${stats.labs} lab</p></section>
  </div>`;
}

// ---------- Generated quizzes ----------
const levelPool = level => atLevel(level === 'guru' ? 'kuliah' : level);
const pickN = (list, n) => shuffle(list).slice(0, n);

async function buildStructure(level) {
  const idx = await moleculeIndex();
  const pool = levelPool(level).filter(
    m => idx.get(m.id)?.s !== 'lattice' && !m.poly && !m.lattice && depiction(m.id)?.a.length > 1
  );
  return pickN(pool, 8).map(m => {
    const wrong = pickN(
      pool.filter(x => x.id !== m.id),
      3
    );
    const options = [m, ...wrong].map(x => x.name);
    return {
      q: [s.structureQ, s.structureQ],
      svg: depictSVG(depiction(m.id), {
        title: pick(['Struktur 2D molekul yang harus ditebak', '2D structure of the molecule to guess']),
        size: 260,
      }),
      options,
      answer: 0,
      explain: m.about,
    };
  });
}

async function buildFormula(level) {
  const idx = await moleculeIndex();
  const pool = levelPool(level).filter(m => idx.get(m.id)?.formula && !m.poly);
  const f = m => formulaUnicode(idx.get(m.id).formula);
  return pickN(pool, 8).map(m => {
    const wrong = pickN(
      pool.filter(x => f(x) !== f(m)),
      3
    );
    return {
      q: [fmt(s.formulaQ, { name: m.name[0] }), fmt(s.formulaQ, { name: m.name[1] })].map(x => x),
      options: [f(m), ...wrong.map(f)],
      answer: 0,
      explain: m.about,
    };
  });
}

function elementPool(level) {
  const max = { sd: 20, smp: 36, sma: 56, kuliah: 118, guru: 118 }[level] || 36;
  return ELEMENTS.filter(e => e.z <= max || [79, 80, 82, 47, 50, 78, 92].includes(e.z));
}

async function buildSymbols(level) {
  const pool = elementPool(level);
  return pickN(pool, 10).map(e => {
    const wrong = pickN(
      pool.filter(x => x.z !== e.z),
      3
    );
    return {
      q: [fmt(s.symbolQ, { s: e.s }), fmt(s.symbolQ, { s: e.s })],
      options: [e, ...wrong].map(x => [x.id, x.en]),
      answer: 0,
      explain: [`${e.id} (${e.s}), nomor atom ${e.z}.`, `${e.en} (${e.s}), atomic number ${e.z}.`],
    };
  });
}

async function buildCategory(level) {
  const pool = elementPool(level).filter(e => e.cat !== 'unknown');
  const cats = Object.keys(CATEGORIES).filter(c => c !== 'unknown');
  return pickN(pool, 8).map(e => {
    const wrong = pickN(
      cats.filter(c => c !== e.cat),
      3
    );
    return {
      q: [fmt(s.categoryQ, { name: e.id, s: e.s }), fmt(s.categoryQ, { name: e.en, s: e.s })],
      options: [e.cat, ...wrong].map(c => CATEGORIES[c].name),
      answer: 0,
      explain: [
        `${e.id}: golongan ${e.group ?? e.block}, periode ${e.period}.`,
        `${e.en}: group ${e.group ?? e.block}, period ${e.period}.`,
      ],
    };
  });
}

async function buildClasses(level) {
  const pool = levelPool(level).filter(m => getClass(m.cls[0])?.parent);
  const allClasses = [...new Set(MOLECULES.map(m => m.cls[0]))].filter(c => getClass(c)?.parent);
  return pickN(pool, 8).map(m => {
    const wrong = pickN(
      allClasses.filter(c => !m.cls.includes(c)),
      3
    );
    return {
      q: [fmt(s.classQ, { name: m.name[0] }), fmt(s.classQ, { name: m.name[1] })],
      options: [m.cls[0], ...wrong].map(c => getClass(c).name),
      answer: 0,
      explain: getClass(m.cls[0]).def,
    };
  });
}

async function buildPlaces(level) {
  const pool = levelPool(level).filter(m => m.ctx.length);
  return pickN(pool, 8).map(m => {
    const right = PLACES.find(p => p.id === m.ctx[0]);
    const wrong = pickN(
      PLACES.filter(p => !m.ctx.includes(p.id)),
      3
    );
    return {
      q: [fmt(s.placeQ, { name: m.name[0] }), fmt(s.placeQ, { name: m.name[1] })],
      options: [right, ...wrong].map(p => p.name),
      answer: 0,
      explain: m.uses,
    };
  });
}

/** Items at or below the level; the smallest pool is topped up from the next level so there are enough options. */
function upTo(list, level, min = 8) {
  const lv = level === 'guru' ? 'kuliah' : level;
  const pool = list.filter(x => rank(x.lv) <= rank(lv));
  return pool.length >= min ? pool : list.filter(x => rank(x.lv) <= rank(lv) + 1);
}

async function buildIons(level) {
  const pool = upTo(IONS, level);
  return pickN(pool, 8).map(i => {
    const wrong = pickN(
      pool.filter(x => x.f !== i.f),
      3
    );
    return {
      q: [fmt(s.ionQ, { name: i.name[0] }), fmt(s.ionQ, { name: i.name[1] })],
      options: [i.f, ...wrong.map(x => x.f)],
      answer: 0,
      explain: i.about,
    };
  });
}

async function buildReactions(level) {
  const pool = upTo(LIBRARY, level);
  const types = Object.keys(REACTION_TYPES).filter(t => t !== 'nuklir');
  return pickN(pool, 8).map(r => {
    const wrong = pickN(
      types.filter(t => !r.types.includes(t)),
      3
    );
    return {
      q: [fmt(s.reactionQ, { name: r.name[0] }), fmt(s.reactionQ, { name: r.name[1] })],
      options: [r.types[0], ...wrong].map(t => REACTION_TYPES[t].name),
      answer: 0,
      explain: REACTION_TYPES[r.types[0]].def,
    };
  });
}

async function buildMixed(level) {
  const lv = level === 'guru' ? 'kuliah' : level;
  const topics = await loadTopics(TOPICS.filter(t => t.levels.includes(lv)));
  const all = topics.flatMap(t => t.quiz.filter(q => rank(q.lv) <= rank(lv) && rank(q.lv) >= rank(lv) - 1));
  return pickN(all, 10);
}
