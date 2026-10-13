// Teacher room: printable lesson plans and worksheets, flashcards and shareable assignment links.
import { $, esc, encodeData, toast } from '../core/dom.js';
import { S, pick, fmt, LEVELS } from '../core/prefs.js';
import { routeURL } from '../core/router.js';
import { printSheet } from '../core/print.js';
import { levelName } from '../i18n/ui.js';
import { icon } from '../components/icons.js';
import { pageHead, tabs, bindTabs, notice, loading, errorState, extLink } from '../components/common.js';
import { TOPICS, findTopic, loadTopic, PHASES } from '../data/topics/index.js';
import { reference } from '../data/references.js';
import { PLACES } from '../data/curriculum.js';
import { CLASSES } from '../data/classes.js';
import { MOLECULES, moleculesInClass, moleculesInPlace, normalize } from '../data/curatedMolecules.js';
import { moleculeIndex, depiction } from '../services/data.js';
import { imageURL } from '../services/pubchem.js';
import { depictSVG } from '../components/depict.js';
import { formulaUnicode } from '../services/formula.js';
import { plainText } from '../components/richtext.js';

const s = S({
  title: ['Ruang guru', 'Teacher room'],
  lead: [
    'Perangkat ajar siap pakai untuk kelas IPA dan Kimia: modul ajar per topik, lembar kerja, kartu flash, dan tautan tugas untuk siswa. Tanpa akun dan tanpa server: tugas tersimpan di dalam tautannya.',
    'Ready-to-use teaching tools for science and chemistry classes: lesson plans, worksheets, flashcards and assignment links. No accounts or servers — assignments live inside the link.',
  ],
  tabPlan: ['Modul ajar', 'Lesson plans'],
  tabTask: ['Buat tugas', 'Create assignment'],
  tabSheets: ['Lembar kerja & kartu', 'Worksheets & cards'],
  tabTips: ['Tips kelas', 'Classroom tips'],
  topic: ['Topik', 'Topic'],
  level: ['Jenjang', 'Level'],
  print: ['Cetak', 'Print'],
  answerKey: ['Kunci jawaban kuis', 'Quiz answer key'],
  // assignment
  taskTitle: ['Judul tugas', 'Assignment title'],
  due: ['Batas waktu', 'Due date'],
  instructions: ['Instruksi', 'Instructions'],
  molecules: ['Molekul yang dipelajari (maks. 10)', 'Molecules to study (max 10)'],
  findMol: ['Cari molekul', 'Find molecules'],
  questions: ['Pertanyaan (satu per baris, maks. 10)', 'Questions (one per line, max 10)'],
  make: ['Buat tautan tugas', 'Create assignment link'],
  link: ['Tautan untuk siswa', 'Link for learners'],
  copy: ['Salin tautan', 'Copy link'],
  open: ['Lihat sebagai siswa', 'Open as a learner'],
  copied: ['Tautan disalin. Bagikan lewat grup kelas.', 'Link copied. Share it with your class.'],
  selected: ['{n} dipilih', '{n} selected'],
  none: ['— tanpa topik —', '— no topic —'],
  // sheets
  worksheet: ['Lembar kerja peserta didik (LKPD)', 'Learner worksheet'],
  worksheetLead: [
    'Soal kuis topik tanpa kunci jawaban, kegiatan, dan ruang menulis.',
    'The topic quiz without answers, the activity and space to write.',
  ],
  flashcards: ['Kartu flash molekul', 'Molecule flashcards'],
  flashLead: [
    'Pilih golongan atau tempat; cetak kartu berisi struktur, nama, rumus, dan fakta.',
    'Pick a class or place; print cards with structure, name, formula and a fact.',
  ],
  source: ['Sumber kartu', 'Cards from'],
  name: ['Nama', 'Name'],
  klass: ['Kelas', 'Class'],
  date: ['Tanggal', 'Date'],
  answer: ['Jawaban', 'Answer'],
  tips: [
    [
      'Pilih mode belajar sesuai kelas di menu Mode; isi, kuis, dan kedalaman data ikut menyesuaikan.',
      'Di kelas tanpa internet stabil, buka Tentang → "Simpan untuk offline" sekali saat ada Wi-Fi.',
      'Proyektor: buka halaman molekul, pilih "Ruang penuh" untuk menunjukkan ukuran atom, lalu putar dengan tombol panah.',
      'Kerja kelompok: setiap kelompok membandingkan dua molekul di halaman Bandingkan lalu mempresentasikan perbedaannya.',
      'Asesmen formatif: gunakan kuis tantangan (soal acak) sebagai tiket keluar kelas.',
      'Kimialoka tidak mengumpulkan data siswa; untuk pengumpulan tugas minta siswa mencetak atau menyimpan PDF.',
    ],
    [
      'Choose the class level in the Mode menu; content, quizzes and data depth adapt.',
      'Where the internet is unreliable, open About → "Save for offline" once on Wi-Fi.',
      'Projector: open a molecule, choose "Space-filling" to show atom sizes, then rotate with the arrow keys.',
      'Group work: each group compares two molecules on the Compare page and presents the differences.',
      'Formative assessment: use challenge quizzes (random questions) as an exit ticket.',
      'Kimialoka collects no learner data; ask learners to print or save a PDF to hand in work.',
    ],
  ],
});

export const title = () => s.title;

export async function render({ main, params }) {
  const idx = await moleculeIndex();
  const topicId = findTopic(params.get('topic')) ? params.get('topic') : TOPICS[0].id;
  main.innerHTML = `<div class="container">
    ${pageHead({ title: `${icon('teacher', { size: 30 })} ${esc(s.title)}`, lead: esc(s.lead) })}
    ${tabs(
      'teacher',
      [
        ['plan', esc(s.tabPlan)],
        ['task', esc(s.tabTask)],
        ['sheets', esc(s.tabSheets)],
        ['tips', esc(s.tabTips)],
      ],
      'plan',
      pick(['Perangkat guru', 'Teacher tools'])
    )}
    <section class="tab-panel" id="teacher-panel-plan" role="tabpanel">${planPanel(topicId)}</section>
    <section class="tab-panel" id="teacher-panel-task" role="tabpanel">${taskPanel()}</section>
    <section class="tab-panel" id="teacher-panel-sheets" role="tabpanel">${sheetsPanel()}</section>
    <section class="tab-panel" id="teacher-panel-tips" role="tabpanel"><div class="card"><ol class="tips">${s.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ol></div></section>
  </div>`;
  bindTabs(main);

  // ---------- Lesson plan ----------
  const planBox = $('[data-plan]', main);
  let planToken = 0;
  const showPlan = async id => {
    const mine = ++planToken;
    planBox.innerHTML = loading();
    const t = await loadTopic(id).catch(() => null);
    if (mine === planToken) planBox.innerHTML = t ? planHTML(t) : errorState();
  };
  showPlan(topicId);
  $('#plan-topic', main).addEventListener('change', e => showPlan(e.target.value));
  $('[data-print-plan]', main).addEventListener('click', async () => {
    const t = await loadTopic($('#plan-topic', main).value).catch(() => null);
    if (t) printSheet(planHTML(t, true));
    else toast(pick(['Materi gagal dimuat.', 'The lesson failed to load.']), 'warn');
  });

  // ---------- Assignment builder ----------
  const chosen = new Set();
  const molList = $('[data-mol-list]', main);
  const drawMols = q => {
    const nq = normalize(q);
    const list = MOLECULES.filter(
      m => !nq || normalize(`${m.name.join(' ')} ${idx.get(m.id)?.formula || ''}`).includes(nq)
    ).slice(0, 60);
    molList.innerHTML = list
      .map(
        m =>
          `<label class="check"><input type="checkbox" value="${m.id}" ${chosen.has(m.id) ? 'checked' : ''} /> ${esc(pick(m.name))} <small class="muted">${esc(formulaUnicode(idx.get(m.id)?.formula || ''))}</small></label>`
      )
      .join('');
  };
  drawMols('');
  $('#task-find', main).addEventListener('input', e => drawMols(e.target.value));
  molList.addEventListener('change', e => {
    const box = e.target;
    if (box.checked && chosen.size >= 10) {
      box.checked = false;
      return;
    }
    if (box.checked) chosen.add(box.value);
    else chosen.delete(box.value);
    $('[data-selected]', main).textContent = fmt(s.selected, { n: chosen.size });
  });
  $('[data-task]', main).addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target.elements;
    const data = {
      v: 1,
      t: f.title.value.trim().slice(0, 120),
      l: f.level.value,
      tp: f.topic.value,
      due: f.due.value,
      i: f.instructions.value.trim().slice(0, 1500),
      m: [...chosen].slice(0, 10),
      q: f.questions.value
        .split('\n')
        .map(x => x.trim())
        .filter(Boolean)
        .slice(0, 10)
        .map(x => x.slice(0, 300)),
    };
    const url = `${location.origin}${routeURL('assignment', null, { d: encodeData(data) })}`;
    $('[data-task-out]', main).innerHTML = `<div class="card">
      <label for="task-link">${esc(s.link)}</label>
      <input id="task-link" class="mono" readonly value="${esc(url)}" />
      <p><button class="btn btn-primary" type="button" data-copy>${icon('copy', { size: 16 })} ${esc(s.copy)}</button>
      <a class="btn" href="${esc(url)}" target="_blank" rel="noopener">${icon('external', { size: 16 })} ${esc(s.open)}</a></p></div>`;
    $('[data-copy]', main).addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        $('#task-link', main).select();
      }
      toast(s.copied);
    });
  });

  // ---------- Worksheets & flashcards ----------
  $('[data-print-sheet]', main).addEventListener('click', async () => {
    const t = await loadTopic($('#sheet-topic', main).value).catch(() => null);
    const lv = $('#sheet-level', main).value;
    if (t) printSheet(worksheetHTML(t, lv));
    else toast(pick(['Materi gagal dimuat.', 'The lesson failed to load.']), 'warn');
  });
  $('[data-print-cards]', main).addEventListener('click', () => {
    const [kind, key] = $('#card-source', main).value.split(':');
    const list = kind === 'cls' ? moleculesInClass(key) : moleculesInPlace(key);
    printSheet(flashcardsHTML(list.slice(0, 24), idx));
  });
}

function planPanel(topicId) {
  return `<div class="filters">
      <div class="field field-grow"><label for="plan-topic">${esc(s.topic)}</label><select id="plan-topic">${TOPICS.map(
        t => `<option value="${t.id}" ${t.id === topicId ? 'selected' : ''}>${esc(pick(t.title))}</option>`
      ).join('')}</select></div>
      <button class="btn btn-primary" type="button" data-print-plan>${icon('print', { size: 16 })} ${esc(s.print)}</button>
    </div>
    <div class="card prose" data-plan></div>`;
}

function planHTML(t, forPrint = false) {
  const n = t.teacher;
  const lv = ['sd', 'smp', 'sma', 'kuliah'].filter(l => t.body[l]);
  return `<article class="plan">
    ${forPrint ? `<p class="print-brand">Kimialoka · Asadin Edu — ${esc(pick(['Modul ajar', 'Lesson plan']))}</p>` : ''}
    <h2>${esc(pick(t.title))}</h2>
    <p>${esc(pick(t.summary))}</p>
    <p><strong>${esc(pick(['Jenjang', 'Levels']))}:</strong> ${lv.map(l => `${esc(levelName(l))} (${esc(pick(PHASES[l]))})`).join(' · ')}</p>
    <h3>${esc(pick(['Capaian pembelajaran', 'Learning outcomes']))}</h3><p>${esc(pick(n.cp))}</p>
    <h3>${esc(pick(['Tujuan pembelajaran', 'Objectives']))}</h3><ol>${n.goals.map(g => `<li>${esc(pick(g))}</li>`).join('')}</ol>
    <h3>${esc(pick(['Alokasi waktu', 'Time']))}</h3><p>${esc(pick(n.duration))}</p>
    <h3>${esc(pick(['Langkah pembelajaran', 'Lesson steps']))}</h3><ol>${n.steps.map(g => `<li>${esc(pick(g))}</li>`).join('')}</ol>
    <h3>${esc(pick(['Kegiatan per jenjang', 'Activities by level']))}</h3><ul>${Object.entries(
      t.activity || {}
    )
      .map(([l, a]) => `<li><strong>${esc(levelName(l))}:</strong> ${esc(pick(a))}</li>`)
      .join('')}</ul>
    <h3>${esc(pick(['Miskonsepsi', 'Misconceptions']))}</h3><ul>${n.misconceptions.map(g => `<li>${esc(pick(g))}</li>`).join('')}</ul>
    <h3>${esc(pick(['Asesmen', 'Assessment']))}</h3><p>${esc(pick(n.assessment))}</p>
    ${
      t.refs?.length
        ? `<h3>${esc(pick(['Rujukan untuk guru', 'References for teachers']))}</h3><ul>${t.refs
            .map(reference)
            .filter(Boolean)
            .map(r => `<li>${forPrint ? `${esc(r.label)} — ${esc(r.url)}` : extLink(r.url, r.label)}</li>`)
            .join('')}</ul>`
        : ''
    }
    <h3>${esc(s.answerKey)}</h3><ol>${t.quiz
      .map(
        q =>
          `<li>[${esc(levelName(q.lv))}] ${esc(pick(q.q))} — <strong>${esc(pick(q.options[q.answer]))}</strong></li>`
      )
      .join('')}</ol>
    <p class="muted small">Kimialoka · ${esc(pick(['konten CC BY-SA 4.0', 'content CC BY-SA 4.0']))} · ${esc(location.origin)}</p>
  </article>`;
}

function taskPanel() {
  return `<form class="card task-form" data-task>
    <div class="grid grid-2">
      <div class="field"><label for="task-title">${esc(s.taskTitle)}</label><input id="task-title" name="title" required maxlength="120" /></div>
      <div class="field"><label for="task-due">${esc(s.due)}</label><input id="task-due" name="due" type="date" /></div>
      <div class="field"><label for="task-level">${esc(s.level)}</label><select id="task-level" name="level">${LEVELS.filter(
        l => l !== 'guru'
      )
        .map(l => `<option value="${l}">${esc(levelName(l))}</option>`)
        .join('')}</select></div>
      <div class="field"><label for="task-topic">${esc(s.topic)}</label><select id="task-topic" name="topic"><option value="">${esc(s.none)}</option>${TOPICS.map(
        t => `<option value="${t.id}">${esc(pick(t.title))}</option>`
      ).join('')}</select></div>
    </div>
    <div class="field"><label for="task-inst">${esc(s.instructions)}</label><textarea id="task-inst" name="instructions" rows="3" maxlength="1500"></textarea></div>
    <fieldset class="field"><legend>${esc(s.molecules)} · <span data-selected>${esc(fmt(s.selected, { n: 0 }))}</span></legend>
      <label class="sr-only" for="task-find">${esc(s.findMol)}</label><input id="task-find" type="search" placeholder="${esc(s.findMol)}" autocomplete="off" />
      <div class="check-list" data-mol-list></div></fieldset>
    <div class="field"><label for="task-q">${esc(s.questions)}</label><textarea id="task-q" name="questions" rows="5"></textarea></div>
    <button class="btn btn-primary" type="submit">${icon('link', { size: 16 })} ${esc(s.make)}</button>
  </form>
  <div data-task-out></div>
  ${notice(esc(pick(['Tautan berisi seluruh isi tugas. Tidak ada data yang dikirim ke server.', 'The link contains the whole assignment. Nothing is sent to a server.'])))}`;
}

function sheetsPanel() {
  return `<div class="grid grid-2">
    <div class="card"><h2 class="h-small">${icon('print', { size: 18 })} ${esc(s.worksheet)}</h2><p class="muted">${esc(s.worksheetLead)}</p>
      <div class="field"><label for="sheet-topic">${esc(s.topic)}</label><select id="sheet-topic">${TOPICS.map(t => `<option value="${t.id}">${esc(pick(t.title))}</option>`).join('')}</select></div>
      <div class="field"><label for="sheet-level">${esc(s.level)}</label><select id="sheet-level">${['sd', 'smp', 'sma', 'kuliah'].map(l => `<option value="${l}">${esc(levelName(l))}</option>`).join('')}</select></div>
      <button class="btn btn-primary" type="button" data-print-sheet>${icon('print', { size: 16 })} ${esc(s.print)}</button></div>
    <div class="card"><h2 class="h-small">${icon('grid', { size: 18 })} ${esc(s.flashcards)}</h2><p class="muted">${esc(s.flashLead)}</p>
      <div class="field"><label for="card-source">${esc(s.source)}</label><select id="card-source">
        <optgroup label="${esc(pick(['Tempat', 'Places']))}">${PLACES.map(p => `<option value="ctx:${p.id}">${esc(pick(p.name))}</option>`).join('')}</optgroup>
        <optgroup label="${esc(pick(['Golongan', 'Classes']))}">${CLASSES.filter(c => c.parent)
          .map(c => `<option value="cls:${c.id}">${esc(pick(c.name))}</option>`)
          .join('')}</optgroup>
      </select></div>
      <button class="btn btn-primary" type="button" data-print-cards>${icon('print', { size: 16 })} ${esc(s.print)}</button></div>
  </div>`;
}

function worksheetHTML(t, lv) {
  const qs = t.quiz
    .filter(q => q.lv === lv)
    .concat(t.quiz.filter(q => q.lv !== lv))
    .slice(0, 8);
  const body = t.body[lv] || t.body[Object.keys(t.body)[0]];
  return `<article class="worksheet">
    <p class="print-brand">Kimialoka · ${esc(s.worksheet)}</p>
    <h2>${esc(pick(t.title))} · ${esc(levelName(lv))}</h2>
    <p class="ws-fields">${esc(s.name)}: ________________ &nbsp; ${esc(s.klass)}: ________ &nbsp; ${esc(s.date)}: ________</p>
    <h3>${esc(pick(['Bacaan singkat', 'Short reading']))}</h3><p>${esc(plainText(pick(body)).split('\n\n')[0])}</p>
    ${t.activity?.[lv] ? `<h3>${esc(pick(['Kegiatan', 'Activity']))}</h3><p>${esc(pick(t.activity[lv]))}</p><div class="ws-lines"></div>` : ''}
    <h3>${esc(pick(['Soal', 'Questions']))}</h3>
    <ol>${qs.map(q => `<li><p>${esc(pick(q.q))}</p><ol type="a">${q.options.map(o => `<li>${esc(pick(o))}</li>`).join('')}</ol></li>`).join('')}</ol>
    <h3>${esc(pick(['Refleksi', 'Reflection']))}</h3><p>${esc(pick(['Hal baru yang saya pelajari hari ini:', 'Something new I learned today:']))}</p><div class="ws-lines"></div>
  </article>`;
}

function flashcardsHTML(list, idx) {
  return `<div class="flashcards">${list
    .map(m => {
      const r = idx.get(m.id);
      const d = depiction(m.id);
      return `<div class="flashcard">${d ? depictSVG(d, { title: pick(m.name), size: 150 }) : `<img src="${imageURL(m.cid, 200)}" alt="" width="120" height="120" />`}
        <strong>${esc(pick(m.name))}</strong><span class="formula">${esc(formulaUnicode(r?.formula || ''))}</span>
        <small>${esc(pick(m.fun))}</small></div>`;
    })
    .join('')}</div>`;
}
