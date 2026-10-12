// Lessons: the topic list for each level (the recommended path first, then lessons also written for that level)
// and a topic page with its four layers of text, activities, quiz, teacher notes, the concepts, reactions, ions
// and materials it covers, and textbook references. Lesson text loads on demand (loadTopic).
import { $, $$, esc } from '../core/dom.js';
import { S, pick, fmt, getPrefs, isTeacher } from '../core/prefs.js';
import { replaceQuery } from '../core/router.js';
import { levelName } from '../i18n/ui.js';
import { icon } from '../components/icons.js';
import { pageHead, breadcrumbs, levelBadge, loading, errorState, extLink } from '../components/common.js';
import { moleculeCard } from '../components/cards.js';
import { richText, plainText } from '../components/richtext.js';
import { mountQuiz } from '../components/quiz.js';
import { TOPICS, findTopic, loadTopic, bodyLevel, quizFor, PHASES, LAYERS } from '../data/topics/index.js';
import { PATHS, findLab } from '../data/curriculum.js';
import { getMolecule } from '../data/curatedMolecules.js';
import { getElement } from '../data/periodicTable.js';
import { findTerm } from '../data/glossary.js';
import { getIon } from '../data/ions.js';
import { ALL_REACTIONS, getReaction } from '../data/reactionLibrary.js';
import { getMaterial } from '../data/materials.js';
import { DOMAINS } from '../data/ontology.js';
import { reference } from '../data/references.js';
import { moleculeIndex } from '../services/data.js';
import { speak, stopSpeaking, canSpeak } from '../services/speech.js';
import { lessonsRead, markLesson, quizResults } from '../core/userdata.js';

const s = S({
  title: ['Materi belajar', 'Lessons'],
  lead: [
    '{n} topik kimia mengikuti Kurikulum Merdeka dan kimia perguruan tinggi. Setiap topik ditulis dalam empat lapis kedalaman (Sederhana untuk SD, Standar untuk SMP, Lanjutan untuk SMA, Mendalam untuk kuliah), lengkap dengan kegiatan, kuis, catatan guru, dan rujukan buku teks terbuka.',
    '{n} chemistry topics following Indonesia’s Kurikulum Merdeka and university chemistry. Each is written in four layers of depth (Simple for primary, Standard for junior high, Advanced for senior high, Deep dive for university), with activities, quizzes, teacher notes and open-textbook references.',
  ],
  path: ['Jalur belajar {level}', 'Learning path: {level}'],
  pathLead: ['Urutan yang disarankan untuk jenjang ini.', 'The suggested order for this level.'],
  others: ['Materi lain yang juga bisa dibaca', 'More lessons you can read'],
  othersLead: [
    'Topik ini biasanya dipelajari di jenjang lain, tetapi tersedia juga versi untuk jenjangmu.',
    'These topics are usually met at another level, but a version for your level is available too.',
  ],
  layer: ['Lapis {layer}', '{layer} layer'],
  concepts: ['Konsep kunci dalam materi ini', 'Key concepts in this lesson'],
  explore: ['Jelajahi lebih jauh', 'Explore further'],
  reactions: ['Reaksi', 'Reactions'],
  ions: ['Ion', 'Ions'],
  elements: ['Unsur', 'Elements'],
  materials: ['Material & campuran', 'Materials & mixtures'],
  domains: ['Bagian dari peta ilmu kimia', 'Part of the chemistry map'],
  refs: ['Rujukan', 'References'],
  refsNote: [
    'Buku teks terbuka OpenStax (CC BY 4.0), bahasa Inggris.',
    'OpenStax open textbooks (CC BY 4.0).',
  ],
  levelFor: ['Tampilkan untuk jenjang', 'Show for level'],
  read: ['Sudah dibaca', 'Read'],
  best: ['Kuis terbaik {best}/{total}', 'Best quiz {best}/{total}'],
  notFound: ['Materi tidak ditemukan.', 'Lesson not found.'],
  version: ['Versi materi', 'Lesson version'],
  points: ['Poin penting', 'Key points'],
  activity: ['Kegiatan', 'Activity'],
  molecules: ['Molekul dalam materi ini', 'Molecules in this lesson'],
  labs: ['Coba di laboratorium', 'Try it in the lab'],
  quiz: ['Uji pemahaman', 'Check your understanding'],
  markRead: ['Tandai sudah dibaca', 'Mark as read'],
  marked: ['Sudah dibaca ✓', 'Read ✓'],
  teacher: ['Catatan guru', 'Teacher notes'],
  cp: ['Capaian pembelajaran', 'Learning outcomes'],
  goals: ['Tujuan pembelajaran', 'Learning objectives'],
  duration: ['Alokasi waktu', 'Time'],
  steps: ['Langkah pembelajaran', 'Lesson steps'],
  misconceptions: ['Miskonsepsi yang sering muncul', 'Common misconceptions'],
  assessment: ['Asesmen', 'Assessment'],
  printPlan: ['Cetak modul ajar', 'Print lesson plan'],
  prevTopic: ['Materi sebelumnya', 'Previous lesson'],
  nextTopic: ['Materi berikutnya', 'Next lesson'],
  phase: ['Fase Kurikulum Merdeka', 'Curriculum phase'],
});

export const title = route => (route.id ? pick(findTopic(route.id)?.title || ['Materi', 'Lesson']) : s.title);

export async function render({ id, main, params, cleanup, isCurrent }) {
  if (!id) return renderList(main, params);
  if (!findTopic(id)) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><a class="btn" href="/learn">${esc(s.title)}</a></section>`;
    return;
  }
  main.innerHTML = `<div class="container">${loading()}</div>`;
  let t;
  let idx;
  try {
    [t, idx] = await Promise.all([loadTopic(id), moleculeIndex()]);
  } catch {
    if (isCurrent()) main.innerHTML = `<div class="container">${errorState()}</div>`;
    return;
  }
  if (!isCurrent()) return;
  let lv = params.get('lv') && t.body[params.get('lv')] ? params.get('lv') : bodyLevel(t, getPrefs().level);
  const order = TOPICS.map(x => x.id);
  const prev = findTopic(order[order.indexOf(t.id) - 1]);
  const next = findTopic(order[order.indexOf(t.id) + 1]);
  const done = lessonsRead()[t.id];

  const levels = ['sd', 'smp', 'sma', 'kuliah'].filter(l => t.body[l]);
  main.innerHTML = `<article class="container lesson">
    ${breadcrumbs([
      [s.title, '/learn'],
      [pick(t.title), ''],
    ])}
    <header class="page-head">
      <p class="eyebrow">${icon(t.icon, { size: 18 })} ${esc(s.title)}</p>
      <h1>${esc(pick(t.title))}</h1>
      <p class="lead">${esc(pick(t.summary))}</p>
      <div class="lesson-tools">
        <div class="seg" role="group" aria-label="${esc(s.version)}">
          ${levels.map(l => `<button type="button" class="seg-btn" data-lv="${l}" aria-pressed="${l === lv}" title="${esc(fmt(s.layer, { layer: pick(LAYERS[l]) }))}">${esc(levelName(l))}<small class="seg-sub">${esc(pick(LAYERS[l]))}</small></button>`).join('')}
        </div>
        ${canSpeak() ? `<button class="btn" type="button" data-speak aria-pressed="false">${icon('speaker', { size: 18 })}<span>${esc(pick(['Dengarkan', 'Listen']))}</span></button>` : ''}
        <button class="btn" type="button" data-print>${icon('print', { size: 18 })}<span>${esc(pick(['Cetak', 'Print']))}</span></button>
        <button class="btn ${done ? 'is-done' : ''}" type="button" data-read>${icon('check', { size: 18 })}<span>${esc(done ? s.marked : s.markRead)}</span></button>
      </div>
      <p class="muted small" data-phase>${esc(s.phase)}: ${esc(pick(PHASES[lv]))}</p>
    </header>
    <div class="lesson-body prose" data-body>${richText(pick(t.body[lv]))}</div>
    <div class="grid grid-2">
      <section class="card"><h2 class="h-small">${icon('star', { size: 18 })} ${esc(s.points)}</h2><ul>${t.points.map(p => `<li>${esc(pick(p))}</li>`).join('')}</ul></section>
      <section class="card" data-activity>${activity(t, lv)}</section>
    </div>
    ${
      t.molecules?.length
        ? `<section><h2>${esc(s.molecules)}</h2><div class="grid grid-cards">${t.molecules
            .map(getMolecule)
            .filter(Boolean)
            .map(m => moleculeCard(m, idx.get(m.id)))
            .join('')}</div></section>`
        : ''
    }
    ${
      t.labs?.length
        ? `<section><h2>${esc(s.labs)}</h2><div class="grid grid-4">${t.labs
            .map(findLab)
            .filter(Boolean)
            .map(
              l =>
                `<a class="card lab-card" href="/lab/${l.id}"><span class="topic-icon">${icon(l.icon, { size: 24 })}</span><span class="card-title">${esc(pick(l.title))}</span><span class="card-text">${esc(pick(l.summary))}</span></a>`
            )
            .join('')}</div></section>`
        : ''
    }
    ${relatedHTML(t)}
    <section class="card quiz-card" aria-labelledby="quiz-title"><h2 id="quiz-title">${icon('quiz', { size: 20 })} ${esc(s.quiz)}</h2><div data-quiz></div></section>
    ${isTeacher() ? teacherNotes(t) : ''}
    ${refsHTML(t)}
    <nav class="pager" aria-label="${esc(pick(['Materi lain', 'Other lessons']))}">
      ${prev ? `<a class="btn" href="/learn/${prev.id}">← ${esc(pick(prev.title))}</a>` : '<span></span>'}
      ${next ? `<a class="btn" href="/learn/${next.id}">${esc(pick(next.title))} →</a>` : ''}
    </nav>
  </article>`;

  const quizBox = $('[data-quiz]', main);
  const startQuiz = () =>
    mountQuiz(quizBox, {
      id: `topic-${t.id}`,
      title: pick(t.title),
      questions: quizFor(t, lv),
      onDone: () => markLesson(t.id),
    });
  startQuiz();

  main.querySelector('.lesson-tools').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.lv) {
      lv = b.dataset.lv;
      for (const x of $$('[data-lv]', main)) x.setAttribute('aria-pressed', String(x.dataset.lv === lv));
      $('[data-body]', main).innerHTML = richText(pick(t.body[lv]));
      $('[data-activity]', main).innerHTML = activity(t, lv);
      $('[data-phase]', main).textContent = `${s.phase}: ${pick(PHASES[lv])}`;
      replaceQuery({ lv });
      startQuiz();
    }
    if (b.hasAttribute('data-print')) window.print();
    if (b.hasAttribute('data-read')) {
      markLesson(t.id);
      b.classList.add('is-done');
      b.querySelector('span').textContent = s.marked;
    }
    if (b.hasAttribute('data-speak')) {
      if (b.getAttribute('aria-pressed') === 'true') return stopSpeaking();
      b.setAttribute('aria-pressed', 'true');
      speak(`${pick(t.title)}. ${plainText(pick(t.body[lv]))}`, () =>
        b.setAttribute('aria-pressed', 'false')
      );
    }
  });
  cleanup(stopSpeaking);
}

const chips = (list, href, label) =>
  list.length
    ? `<p class="chip-grid">${list.map(x => `<a class="chip" href="${href(x)}">${label(x)}</a>`).join(' ')}</p>`
    : '';

/** Concepts, elements, ions, reactions and materials the lesson covers, and the knowledge-map domains it belongs to. */
function relatedHTML(t) {
  const L = t.links || {};
  const terms = (L.g || []).map(findTerm).filter(Boolean);
  const elements = (L.e || []).map(getElement).filter(Boolean);
  const ions = (L.i || []).map(getIon).filter(Boolean);
  const reactions = [
    ...new Set([...(L.r || []), ...ALL_REACTIONS.filter(r => r.topic === t.id).map(r => r.id)]),
  ]
    .map(getReaction)
    .filter(Boolean);
  const materials = (L.mat || []).map(getMaterial).filter(Boolean);
  const domains = DOMAINS.filter(d => d.topics.includes(t.id));
  const explore = [
    elements.length
      ? `<h3 class="h-small">${esc(s.elements)}</h3>${chips(
          elements,
          e => `/atom/${e.s}`,
          e => `${esc(e.s)} · ${esc(pick([e.id, e.en]))}`
        )}`
      : '',
    ions.length
      ? `<h3 class="h-small">${esc(s.ions)}</h3>${chips(
          ions,
          i => `/ion/${i.id}`,
          i => `${esc(i.f)} · ${esc(pick(i.name))}`
        )}`
      : '',
    reactions.length
      ? `<h3 class="h-small">${esc(s.reactions)}</h3>${chips(
          reactions,
          r => `/reaction/${r.id}`,
          r => esc(pick(r.name))
        )}`
      : '',
    materials.length
      ? `<h3 class="h-small">${esc(s.materials)}</h3>${chips(
          materials,
          m => `/material/${m.id}`,
          m => esc(pick(m.name))
        )}`
      : '',
  ].join('');
  return `${
    terms.length
      ? `<section aria-labelledby="concepts-title"><h2 id="concepts-title">${icon('bulb', { size: 20 })} ${esc(s.concepts)}</h2>${chips(
          terms,
          g => `/glossary/${g.key}`,
          g => esc(pick(g.term))
        )}</section>`
      : ''
  }${explore ? `<section class="card" aria-labelledby="explore-title"><h2 id="explore-title">${icon('search', { size: 20 })} ${esc(s.explore)}</h2>${explore}</section>` : ''}${
    domains.length
      ? `<p class="muted">${esc(s.domains)}: ${domains.map(d => `<a href="/peta/${d.id}">${esc(pick(d.name))}</a>`).join(', ')}</p>`
      : ''
  }`;
}

function refsHTML(t) {
  const refs = (t.refs || []).map(reference).filter(Boolean);
  if (!refs.length) return '';
  return `<section class="refs" aria-labelledby="refs-title"><h2 class="h-small" id="refs-title">${esc(s.refs)}</h2>
    <ul class="ref-list">${refs.map(r => `<li>${extLink(r.url, r.label)}</li>`).join('')}</ul>
    <p class="muted small">${esc(s.refsNote)}</p></section>`;
}

function activity(t, lv) {
  const a = t.activity?.[lv] || Object.values(t.activity || {})[0];
  return a
    ? `<h2 class="h-small">${icon('flask', { size: 18 })} ${esc(s.activity)}</h2><p>${esc(pick(a))}</p>`
    : '';
}

function teacherNotes(t) {
  const n = t.teacher;
  if (!n) return '';
  return `<section class="card teacher-notes" aria-labelledby="tn-title">
    <h2 id="tn-title">${icon('teacher', { size: 20 })} ${esc(s.teacher)}</h2>
    <dl>
      <dt>${esc(s.cp)}</dt><dd>${esc(pick(n.cp))}</dd>
      <dt>${esc(s.goals)}</dt><dd><ol>${n.goals.map(g => `<li>${esc(pick(g))}</li>`).join('')}</ol></dd>
      <dt>${esc(s.duration)}</dt><dd>${esc(pick(n.duration))}</dd>
      <dt>${esc(s.steps)}</dt><dd><ol>${n.steps.map(g => `<li>${esc(pick(g))}</li>`).join('')}</ol></dd>
      <dt>${esc(s.misconceptions)}</dt><dd><ul>${n.misconceptions.map(g => `<li>${esc(pick(g))}</li>`).join('')}</ul></dd>
      <dt>${esc(s.assessment)}</dt><dd>${esc(pick(n.assessment))}</dd>
    </dl>
    <a class="btn" href="/teacher?topic=${t.id}">${icon('print', { size: 16 })} ${esc(s.printPlan)}</a>
  </section>`;
}

function topicCard(t, i, lv, read, quiz) {
  const q = quiz[`topic-${t.id}`];
  return `<a class="card topic-card" href="/learn/${t.id}?lv=${lv}">
    ${i != null ? `<span class="topic-num">${i + 1}</span>` : ''}
    <span class="topic-icon">${icon(t.icon, { size: 24 })}</span>
    <span class="card-title">${esc(pick(t.title))}</span>
    <span class="card-text">${esc(pick(t.summary))}</span>
    <span class="topic-meta">${t.levels.map(levelBadge).join(' ')}</span>
    <span class="topic-meta">${read[t.id] ? `${icon('check', { size: 14 })} ${esc(s.read)}` : ''}${q ? ` · ${esc(fmt(s.best, q))}` : ''}</span>
    <span class="card-next">${esc(pick(read[t.id] ? ['Baca kembali', 'Read again'] : ['Mulai belajar', 'Start learning']))} ${icon('arrowRight', { size: 16 })}</span>
  </a>`;
}

function renderList(main, params) {
  const pref = getPrefs().level === 'guru' ? 'sma' : getPrefs().level;
  let lv = ['sd', 'smp', 'sma', 'kuliah'].includes(params.get('lv')) ? params.get('lv') : pref;
  const read = lessonsRead();
  const quiz = quizResults();
  const draw = () => {
    const path = (PATHS[lv] || PATHS.smp).map(findTopic).filter(t => t?.layers.includes(lv));
    const others = TOPICS.filter(t => !path.includes(t) && t.layers.includes(lv));
    main.querySelector('[data-topics]').innerHTML = `
      <section aria-labelledby="path-title"><h2 id="path-title">${esc(fmt(s.path, { level: levelName(lv) }))}</h2>
        <p class="muted">${esc(s.pathLead)} · ${esc(fmt(s.layer, { layer: pick(LAYERS[lv]) }))}</p>
        <div class="grid grid-3">${path.map((t, i) => topicCard(t, i, lv, read, quiz)).join('')}</div></section>
      ${
        others.length
          ? `<section aria-labelledby="others-title"><h2 id="others-title">${esc(s.others)}</h2><p class="muted">${esc(s.othersLead)}</p>
        <div class="grid grid-3">${others.map(t => topicCard(t, null, lv, read, quiz)).join('')}</div></section>`
          : ''
      }`;
  };
  main.innerHTML = `<div class="container">
    ${pageHead({ title: esc(s.title), lead: esc(fmt(s.lead, { n: TOPICS.length })) })}
    <div class="seg" role="group" aria-label="${esc(s.levelFor)}">
      ${['sd', 'smp', 'sma', 'kuliah'].map(l => `<button type="button" class="seg-btn" data-lv="${l}" aria-pressed="${l === lv}">${esc(levelName(l))}</button>`).join('')}
    </div>
    <p class="muted small" data-phase>${esc(pick(PHASES[lv]))}</p>
    <div data-topics></div>
  </div>`;
  main.querySelector('.seg').addEventListener('click', e => {
    const b = e.target.closest('[data-lv]');
    if (!b) return;
    lv = b.dataset.lv;
    for (const x of $$('[data-lv]', main)) x.setAttribute('aria-pressed', String(x.dataset.lv === lv));
    main.querySelector('[data-phase]').textContent = pick(PHASES[lv]);
    replaceQuery({ lv });
    draw();
  });
  draw();
}
