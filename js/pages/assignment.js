// Assignment from a teacher: everything is inside the link (/assignment?d=…); answers stay on this device.
import { $, esc, decodeData, debounce } from '../core/dom.js';
import { S, pick, LEVELS } from '../core/prefs.js';
import { levelName } from '../i18n/ui.js';
import { icon } from '../components/icons.js';
import { notice } from '../components/common.js';
import { moleculeCard } from '../components/cards.js';
import { findTopic } from '../data/topics/index.js';
import { getMolecule } from '../data/curatedMolecules.js';
import { moleculeIndex } from '../services/data.js';
import { load, save } from '../core/storage.js';

const s = S({
  title: ['Tugas', 'Assignment'],
  invalid: [
    'Tautan tugas tidak valid atau rusak. Minta tautan baru kepada gurumu.',
    'This assignment link is invalid or damaged. Ask your teacher for a new one.',
  ],
  from: ['Tugas dari guru melalui Kimialoka', 'An assignment from your teacher via Kimialoka'],
  name: ['Nama', 'Name'],
  klass: ['Kelas', 'Class'],
  due: ['Batas waktu', 'Due'],
  level: ['Jenjang', 'Level'],
  instructions: ['Instruksi', 'Instructions'],
  lesson: ['Materi yang dipelajari', 'Lesson to study'],
  molecules: ['Molekul yang dipelajari', 'Molecules to study'],
  questions: ['Pertanyaan', 'Questions'],
  answer: ['Jawabanmu', 'Your answer'],
  saved: [
    'Jawaban tersimpan otomatis di perangkat ini. Untuk mengumpulkan, cetak atau simpan sebagai PDF.',
    'Answers save automatically on this device. To hand in, print or save as PDF.',
  ],
  print: ['Cetak / simpan PDF', 'Print / save as PDF'],
});

export const title = () => s.title;

const clean = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '');
function validate(d) {
  if (!d || d.v !== 1) return null;
  return {
    t: clean(d.t, 120) || s.title,
    l: LEVELS.includes(d.l) ? d.l : '',
    tp: findTopic(clean(d.tp, 40)) ? clean(d.tp, 40) : '',
    due: /^\d{4}-\d{2}-\d{2}$/.test(d.due || '') ? d.due : '',
    i: clean(d.i, 1500),
    m: Array.isArray(d.m) ? d.m.filter(id => typeof id === 'string' && getMolecule(id)).slice(0, 10) : [],
    q: Array.isArray(d.q)
      ? d.q
          .filter(x => typeof x === 'string' && x.trim())
          .slice(0, 10)
          .map(x => x.slice(0, 300))
      : [],
  };
}

export async function render({ main, params }) {
  const raw = params.get('d') || '';
  const a = raw.length < 12000 ? validate(decodeData(raw)) : null;
  if (!a) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.title)}</h1>${notice(esc(s.invalid), 'warn')}</section>`;
    return;
  }
  const idx = await moleculeIndex();
  const key = `assignment:${raw.slice(0, 64)}`;
  const answers = load('answers', {})[key] || {};
  const topic = findTopic(a.tp);

  main.innerHTML = `<article class="container narrow assignment">
    <p class="eyebrow">${icon('teacher', { size: 16 })} ${esc(s.from)}</p>
    <h1>${esc(a.t)}</h1>
    <p class="meta">${a.l ? `${esc(s.level)}: ${esc(levelName(a.l))}` : ''}${a.due ? ` · ${esc(s.due)}: ${esc(new Date(`${a.due}T00:00`).toLocaleDateString())}` : ''}</p>
    <div class="grid grid-2 ws-fields">
      <div class="field"><label for="as-name">${esc(s.name)}</label><input id="as-name" data-answer="name" value="${esc(answers.name || '')}" /></div>
      <div class="field"><label for="as-class">${esc(s.klass)}</label><input id="as-class" data-answer="class" value="${esc(answers.class || '')}" /></div>
    </div>
    ${a.i ? `<section class="card"><h2 class="h-small">${esc(s.instructions)}</h2><p class="pre">${esc(a.i)}</p></section>` : ''}
    ${topic ? `<section><h2>${esc(s.lesson)}</h2><a class="card topic-card" href="/learn/${topic.id}${a.l && a.l !== 'guru' ? `?lv=${a.l}` : ''}"><span class="topic-icon">${icon(topic.icon, { size: 24 })}</span><span class="card-title">${esc(pick(topic.title))}</span><span class="card-text">${esc(pick(topic.summary))}</span></a></section>` : ''}
    ${a.m.length ? `<section><h2>${esc(s.molecules)}</h2><div class="grid grid-cards">${a.m.map(id => moleculeCard(getMolecule(id), idx.get(id))).join('')}</div></section>` : ''}
    ${
      a.q.length
        ? `<section><h2>${esc(s.questions)}</h2><ol class="as-questions">${a.q
            .map(
              (q, i) =>
                `<li><p>${esc(q)}</p><label class="sr-only" for="as-q${i}">${esc(s.answer)} ${i + 1}</label><textarea id="as-q${i}" rows="3" data-answer="q${i}">${esc(answers[`q${i}`] || '')}</textarea></li>`
            )
            .join('')}</ol></section>`
        : ''
    }
    ${notice(esc(s.saved))}
    <p><button class="btn btn-primary" type="button" data-print>${icon('print', { size: 16 })} ${esc(s.print)}</button></p>
  </article>`;

  const store = debounce(() => {
    const all = load('answers', {});
    const mine = {};
    for (const el of main.querySelectorAll('[data-answer]'))
      mine[el.dataset.answer] = el.value.slice(0, 5000);
    all[key] = mine;
    save('answers', all);
  }, 500);
  main.querySelector('.assignment').addEventListener('input', store);
  $('[data-print]', main).addEventListener('click', () => window.print());
}
