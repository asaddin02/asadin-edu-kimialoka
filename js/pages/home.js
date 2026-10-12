// Home: search, learning mode, today's picks, families of matter and learning paths.
import { esc } from '../core/dom.js';
import { S, pick, getPrefs, setPref, LEVELS } from '../core/prefs.js';
import { levelName, levelLong } from '../i18n/ui.js';
import { icon } from '../components/icons.js';
import { sectionHead } from '../components/common.js';
import { moleculeCard, classCard } from '../components/cards.js';
import { MOLECULES, atLevel, moleculesInClass } from '../data/curatedMolecules.js';
import { CLASSES, rootClasses, childClasses } from '../data/classes.js';
import { ELEMENTS, CATEGORIES } from '../data/periodicTable.js';
import { TOPICS, findTopic } from '../data/topics/index.js';
import { LABS, PLACES, PATHS } from '../data/curriculum.js';
import { moleculeIndex } from '../services/data.js';
import { lessonsRead, quizResults, progressStats } from '../core/userdata.js';
import { chainHTML } from './peta.js';

const s = S({
  title: ['Jelajahi kimia dan dunia materi', 'Explore chemistry and the world of matter'],
  lead: [
    'Jelajahi unsur, isotop, ion, molekul 3D, material, dan reaksi. Belajar kimia dari SD sampai kuliah melalui materi berjenjang, kuis, dan laboratorium virtual.',
    'Explore elements, isotopes, ions, 3D molecules, materials and reactions. Learn chemistry from primary school to university through level-based lessons, quizzes and virtual labs.',
  ],
  search: [
    'Cari unsur, isotop, ion, molekul, reaksi, atau konsep',
    'Search elements, isotopes, ions, molecules, reactions or concepts',
  ],
  go: ['Cari', 'Search'],
  try: ['Coba:', 'Try:'],
  stat1: ['molekul & material kurasi', 'curated molecules & materials'],
  stat2: ['unsur tabel periodik', 'elements in the table'],
  chain: [
    'Peta ilmu kimia: dari materi sampai transformasi',
    'The chemistry map: from matter to transformation',
  ],
  chainLead: [
    'Semua yang ada di sekitarmu adalah materi. Ikuti langkahnya: partikel, atom, unsur, isotop, ion, molekul, senyawa, material, sampai reaksi dan perubahannya.',
    'Everything around you is matter. Follow the steps: particles, atoms, elements, isotopes, ions, molecules, compounds, materials, all the way to reactions and change.',
  ],
  chooseTitle: ['Kamu belajar di jenjang apa?', 'What level are you learning at?'],
  chooseLead: [
    'Isi, kuis, dan kedalaman data menyesuaikan pilihanmu. Bisa diganti kapan saja lewat menu Mode.',
    'Content, quizzes and data depth adapt to your choice. Change it any time from the Mode menu.',
  ],
  modeNow: ['Mode belajar', 'Learning mode'],
  change: ['Ganti mode', 'Change mode'],
  path: ['Jalur belajarmu', 'Your learning path'],
  pathLead: [
    'Mulai dari materi ini, lalu uji dirimu di kuis dan laboratorium.',
    'Start with these lessons, then test yourself in quizzes and labs.',
  ],
  done: ['Selesai dibaca', 'Read'],
  featured: ['Molekul pilihan hari ini', 'Today’s molecules'],
  families: ['Golongan materi', 'Families of matter'],
  familiesLead: [
    'Dari unsur hingga material maju: setiap molekul punya "keluarga".',
    'From elements to advanced materials: every molecule has a family.',
  ],
  element: ['Unsur hari ini', 'Element of the day'],
  openElement: ['Buka profil unsur', 'Open element profile'],
  around: ['Kimia di sekitarku', 'Chemistry around me'],
  labs: ['Laboratorium virtual', 'Virtual laboratory'],
  teacherTitle: ['Untuk guru', 'For teachers'],
  teacherLead: [
    'Modul ajar per topik, lembar kerja, kartu flash, dan tautan tugas yang bisa dibagikan ke siswa, tanpa akun.',
    'Lesson plans per topic, worksheets, flashcards and shareable assignment links — no accounts needed.',
  ],
  teacherGo: ['Buka ruang guru', 'Open the teacher room'],
});

export const title = () => pick(['Beranda', 'Home']);

/** Deterministic daily choice so everyone sees the same picks on the same day. */
function daily(list, n, salt = '') {
  const day = new Date().toISOString().slice(0, 10) + salt;
  const hash = str => [...str].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  return [...list].sort((a, b) => hash(day + (a.id || a.s)) - hash(day + (b.id || b.s))).slice(0, n);
}

export async function render({ main }) {
  const prefs = getPrefs();
  const level = prefs.level;
  const idx = await moleculeIndex();
  const pool = atLevel(level === 'guru' ? 'kuliah' : level);
  const picks = daily(pool, 4);
  const el = daily(
    ELEMENTS.filter(e => e.z <= 103),
    1,
    'el'
  )[0];
  const read = lessonsRead();
  const quiz = quizResults();
  const pathLevel = level === 'guru' ? 'sma' : level;
  const path = (PATHS[pathLevel] || PATHS.smp).slice(0, 4).map(findTopic).filter(Boolean);
  const labs = LABS.filter(l => l.levels.includes(pathLevel === 'kuliah' ? 'kuliah' : pathLevel)).slice(0, 4);

  const progress = progressStats();
  const next = path.find(t => !read[t.id]) || path[0];
  const complete = path.filter(t => read[t.id]).length;
  const quick = [
    [
      'explore',
      'molecule',
      ['Jelajah molekul', 'Explore molecules'],
      ['Kenali dunia yang tak terlihat', 'Meet an invisible world'],
      'blue',
    ],
    [
      'table',
      'table',
      ['Tabel periodik', 'Periodic table'],
      ['118 unsur, banyak cerita', '118 elements, endless stories'],
      'yellow',
    ],
    [
      'lab',
      'flask',
      ['Lab virtual', 'Virtual lab'],
      ['Coba, amati, temukan!', 'Try, observe, discover!'],
      'purple',
    ],
    [
      'quiz',
      'puzzle',
      ['Tantangan kuis', 'Quiz challenges'],
      ['Seberapa jauh kamu tahu?', 'What will you discover?'],
      'peach',
    ],
  ];
  main.innerHTML = `
  <div class="container home-welcome">
    <div><p class="eyebrow">${icon('sparkles', { size: 16 })} ${esc(pick(['RASA INGIN TAHU DIMULAI DI SINI', 'CURIOSITY STARTS HERE']))}</p>
    <h1>${esc(pick(level === 'sd' || level === 'smp' ? ['Halo, penjelajah kecil!', 'Hello, curious explorer!'] : level === 'guru' ? ['Halo, pendidik hebat!', 'Hello, inspiring educator!'] : ['Halo, penjelajah sains!', 'Hello, science explorer!']))} <span class="hello-star" aria-hidden="true">✳</span></h1>
    <p>${esc(pick(['Siap menemukan hal menakjubkan hari ini?', 'Ready to discover something wonderful today?']))}</p></div>
    <span class="welcome-level">${icon('school', { size: 18 })} ${esc(levelLong(level))}</span>
  </div>
  <div class="container">
    <section class="discovery-hero" aria-labelledby="discovery-title">
      <div class="discovery-copy">
        <p class="hero-label">${icon('atom', { size: 16 })} ${esc(pick(['ALCHEMIST · ENSIKLOPEDIA KIMIA', 'ALCHEMIST · CHEMISTRY ENCYCLOPEDIA']))}</p>
        <h2 id="discovery-title">${pick(['Kenali materi.<br>Jelajahi <span>perubahannya.</span>', 'Discover matter.<br>Explore <span>how it changes.</span>'])}</h2>
        <p>${esc(s.lead)}</p>
        <div class="hero-actions"><a class="btn btn-yellow" href="/learn/${next?.id || 'zat'}">${icon('play', { size: 18 })} ${esc(pick(['Mulai petualangan', 'Start exploring']))}</a><a class="hero-secondary" href="/molecule/water">${esc(pick(['Lihat molekul 3D', 'Meet a 3D molecule']))} ${icon('arrowRight', { size: 17 })}</a></div>
        <p class="hero-footnote">${icon('check', { size: 15 })} ${esc(pick(['Bebas bereksplorasi. Belajar sesuai jenjangmu.', 'Explore freely. Learn at your own level.']))}</p>
      </div>
      <div class="molecule-scene" aria-hidden="true">
        <span class="scene-orbit orbit-one"></span><span class="scene-orbit orbit-two"></span>
        <span class="scene-spark spark-one">✦</span><span class="scene-spark spark-two">✧</span>
        <span class="floating-element"><small>6</small><strong>C</strong><span>Carbon</span></span>
        <div class="water-model"><span class="model-bond bond-left"></span><span class="model-bond bond-right"></span><span class="model-atom atom-o">O</span><span class="model-atom atom-h atom-h-left">H</span><span class="model-atom atom-h atom-h-right">H</span></div>
        <span class="molecule-caption"><strong>H₂O</strong><span>${esc(pick(['Kecil, tapi luar biasa.', 'Tiny, yet extraordinary.']))}</span>${icon('sparkles', { size: 22 })}</span>
        <span class="scene-dot dot-one"></span><span class="scene-dot dot-two"></span>
      </div>
    </section>
    <section class="quick-discover" aria-label="${esc(pick(['Mau mulai dari mana?', 'Where would you like to start?']))}">
      ${quick.map(([route, ic, name, desc, color]) => `<a href="/${route}" class="quick-card quick-${color}"><span class="quick-icon">${icon(ic, { size: 25 })}</span><span><strong>${esc(pick(name))}</strong><small>${esc(pick(desc))}</small></span>${icon('arrowRight', { size: 18 })}</a>`).join('')}
    </section>
    <form class="discovery-search" role="search" data-search>
      ${icon('search', { size: 22 })}<label class="sr-only" for="hero-q">${esc(s.search)}</label><input id="hero-q" name="q" type="search" autocomplete="off" placeholder="${esc(s.search)}" /><button class="btn btn-primary" type="submit">${esc(s.go)} ${icon('arrowRight', { size: 17 })}</button>
    </form>
    <p class="discovery-suggestions">${esc(pick(['Penasaran tentang:', 'Curious about:']))} ${['air', 'besi', 'C-14', 'sulfat', 'C6H12O6', 'baja'].map(q => `<a href="/search?q=${encodeURIComponent(q)}">${esc(q)}</a>`).join('')}</p>
    <section class="home-chain" aria-labelledby="chain-title">
      ${sectionHead(esc(s.chain), '/peta', undefined, 'chain-title')}
      <p class="muted">${esc(s.chainLead)}</p>
      ${chainHTML()}
    </section>
  </div>
  <div class="container home-sections">
    ${
      prefs.chosen
        ? `<p class="mode-line">${icon('school', { size: 18 })} <strong>${esc(s.modeNow)}:</strong> ${esc(levelLong(level))} · <a href="#mode-choose" data-show-modes>${esc(s.change)}</a></p>`
        : ''
    }
    <section class="mode-choose" id="mode-choose" ${prefs.chosen ? 'hidden' : ''} aria-labelledby="mode-title">
      <h2 id="mode-title">${esc(s.chooseTitle)}</h2>
      <p>${esc(s.chooseLead)}</p>
      <div class="mode-grid">
        ${LEVELS.map(
          l => `<button type="button" class="mode-card ${l === level ? 'is-active' : ''}" data-level="${l}" aria-pressed="${l === level}">
            <strong>${esc(levelName(l))}</strong><span>${esc(levelLong(l))}</span></button>`
        ).join('')}
      </div>
    </section>

    <div class="learning-overview">
      <section class="learning-path" aria-labelledby="path-title">
        ${sectionHead(esc(s.path), '/learn', undefined, 'path-title')}
        <p class="muted">${esc(pick(['Sedikit demi sedikit, jadi makin mengerti.', 'One small step. A little more understanding.']))}</p>
        <div class="path-steps">
          ${path.map((t, i) => `<a class="path-step ${read[t.id] ? 'is-complete' : ''}" href="/learn/${t.id}"><span class="step-number">${read[t.id] ? icon('check', { size: 18 }) : String(i + 1).padStart(2, '0')}</span><span class="step-content"><strong>${esc(pick(t.title))}</strong><small>${esc(pick(t.summary))}</small></span><span class="step-status">${read[t.id] ? esc(s.done) : icon('arrowRight', { size: 17 })}${quiz['topic-' + t.id] ? ` · ★ ${quiz['topic-' + t.id].best}/${quiz['topic-' + t.id].total}` : ''}</span></a>`).join('')}
        </div>
      </section>
      <aside class="progress-card" aria-labelledby="progress-title">
        <span class="progress-art" aria-hidden="true">${icon('award', { size: 38 })}<span>✦</span></span>
        <h2 id="progress-title">${esc(pick(['Setiap langkah berarti!', 'Every step counts!']))}</h2>
        <p>${esc(pick(['Terus penasaran, terus mencoba. Penemuan berikutnya menantimu.', 'Stay curious. Keep trying. Your next discovery is waiting.']))}</p>
        <div class="progress-caption"><span>${esc(pick(['Jalur belajarmu', 'Your learning path']))}</span><strong>${complete}/${path.length}</strong></div>
        <progress max="${path.length || 1}" value="${complete}" aria-label="${esc(s.path)}"></progress>
        <div class="progress-stats"><span><strong>${progress.lessons}</strong>${esc(pick(['Materi dibaca', 'Lessons read']))}</span><span><strong>${progress.labs}</strong>${esc(pick(['Lab dicoba', 'Labs tried']))}</span></div>
        <a class="btn btn-primary" href="/learn/${next?.id || 'zat'}">${esc(pick(['Lanjut belajar', 'Keep learning']))} ${icon('arrowRight', { size: 18 })}</a>
      </aside>
    </div>

    <section aria-labelledby="featured-title">
      ${sectionHead(esc(s.featured), '/explore', undefined, 'featured-title')}
      <div class="grid grid-cards">${picks.map(m => moleculeCard(m, idx.get(m.id))).join('')}</div>
    </section>

    <section aria-labelledby="families-title">
      ${sectionHead(esc(s.families), '/classes', undefined, 'families-title')}
      <p class="muted">${esc(s.familiesLead)}</p>
      <div class="grid grid-classes">
        ${rootClasses()
          .map(c => {
            const ids = new Set([c.id, ...childClasses(c.id).map(k => k.id)]);
            const count = MOLECULES.filter(m => m.cls.some(k => ids.has(k))).length;
            return classCard(c, count);
          })
          .join('')}
      </div>
    </section>

    <section class="split" aria-label="${esc(s.element)} · ${esc(s.around)}">
      <article class="card element-day" style="--accent:${CATEGORIES[el.cat].color}">
        <h2>${esc(s.element)}</h2>
        <a class="element-big" href="/atom/${el.s}">
          <span class="z">${el.z}</span><span class="sym">${esc(el.s)}</span><span class="nm">${esc(pick([el.id, el.en]))}</span>
        </a>
        <p>${esc(pick(CATEGORIES[el.cat].name))} · ${esc(el.conf)} · ${el.m ?? '–'} u</p>
        <a class="link-more" href="/atom/${el.s}">${esc(s.openElement)} ${icon('arrowRight', { size: 16 })}</a>
      </article>
      <article class="card">
        <h2>${esc(s.around)}</h2>
        <div class="place-chips">
          ${PLACES.map(p => `<a class="chip chip-lg" href="/around/${p.id}">${icon(p.icon, { size: 18 })} ${esc(pick(p.name))}</a>`).join('')}
        </div>
      </article>
    </section>

    <section aria-labelledby="labs-title">
      ${sectionHead(esc(s.labs), '/lab', undefined, 'labs-title')}
      <div class="grid grid-4">
        ${labs
          .map(
            l => `<a class="card lab-card" href="/lab/${l.id}"><span class="topic-icon">${icon(l.icon, { size: 24 })}</span>
            <span class="card-title">${esc(pick(l.title))}</span><span class="card-text">${esc(pick(l.summary))}</span></a>`
          )
          .join('')}
      </div>
    </section>

    <dl class="catalog-stats">
      <div><dt>${MOLECULES.length}+</dt><dd>${esc(s.stat1)}</dd></div>
      <div><dt>118</dt><dd>${esc(s.stat2)}</dd></div>
      <div><dt>${TOPICS.length}</dt><dd>${esc(pick(['materi belajar', 'learning topics']))}</dd></div>
      <div><dt>${LABS.length}</dt><dd>${esc(pick(['laboratorium virtual', 'virtual laboratories']))}</dd></div>
    </dl>
    <section class="card teacher-cta">
      <div><h2>${icon('teacher', { size: 22 })} ${esc(s.teacherTitle)}</h2><p>${esc(s.teacherLead)}</p></div>
      <a class="btn btn-primary" href="/teacher">${esc(s.teacherGo)}</a>
    </section>
  <section class="support-banner"><div><h2>${pick(['Suka belajar di Alchemist?', 'Enjoy learning with Alchemist?'])}</h2><p>${pick(['Bantu ruang belajar ini terus tumbuh. Dukungan sukarela, belajar tetap gratis.', 'Help this learning space grow. Support is optional; learning stays free.'])}</p></div><a class="btn" href="/dukung">${pick(['Dukung Alchemist', 'Support Alchemist'])} →</a></section></div>`;

  main.querySelector('.mode-grid').addEventListener('click', e => {
    const b = e.target.closest('[data-level]');
    if (b) setPref('level', b.dataset.level);
  });
  main.querySelector('[data-show-modes]')?.addEventListener('click', e => {
    e.preventDefault();
    const box = main.querySelector('#mode-choose');
    box.hidden = false;
    box.querySelector('.mode-card.is-active, .mode-card')?.focus();
  });
}

// Used by the classes page too.
export const familyCount = id => {
  const ids = new Set([id, ...CLASSES.filter(c => c.parent === id).map(c => c.id)]);
  return MOLECULES.filter(m => m.cls.some(k => ids.has(k))).length;
};
export { moleculesInClass };
