// Saved: bookmarks, notes, progress and badges, with export/import (everything stays on this device).
import { $, esc, download, toast } from '../core/dom.js';
import { S, pick, fmt } from '../core/prefs.js';
import { icon } from '../components/icons.js';
import { pageHead, emptyState } from '../components/common.js';
import { moleculeCard, liveCard } from '../components/cards.js';
import { getMolecule } from '../data/curatedMolecules.js';
import { findTopic } from '../data/topics/index.js';
import { moleculeIndex } from '../services/data.js';
import {
  bookmarks,
  notes,
  setNote,
  quizResults,
  lessonsRead,
  recent,
  BADGES,
  earnedBadges,
  exportData,
  importData,
} from '../core/userdata.js';
import { remove } from '../core/storage.js';

const s = S({
  title: ['Tersimpan & kemajuanku', 'Saved & my progress'],
  lead: [
    'Semua disimpan hanya di perangkat ini. Ekspor untuk memindahkan ke perangkat lain.',
    'Everything is stored only on this device. Export it to move to another device.',
  ],
  bookmarks: ['Molekul tersimpan', 'Saved molecules'],
  noBookmarks: [
    'Belum ada. Tekan ikon simpan di kartu molekul.',
    'Nothing yet. Press the save icon on a molecule card.',
  ],
  notes: ['Catatan belajar', 'Study notes'],
  noNotes: ['Belum ada catatan.', 'No notes yet.'],
  delete: ['Hapus', 'Delete'],
  progress: ['Kemajuan belajar', 'Learning progress'],
  lessons: ['Materi dibaca: {n}', 'Lessons read: {n}'],
  quizzes: ['Kuis yang pernah dikerjakan', 'Quizzes taken'],
  badges: ['Lencana', 'Badges'],
  recent: ['Terakhir dilihat', 'Recently viewed'],
  export: ['Ekspor data (JSON)', 'Export data (JSON)'],
  import: ['Impor data', 'Import data'],
  imported: ['Data berhasil diimpor.', 'Data imported.'],
  badFile: ['Berkas tidak dikenali.', 'File not recognised.'],
  clear: ['Hapus semua data Alchemist di perangkat ini', 'Delete all Alchemist data on this device'],
  confirmClear: ['Hapus semua simpanan, catatan, dan kemajuan?', 'Delete all bookmarks, notes and progress?'],
  cleared: ['Data dihapus.', 'Data deleted.'],
});

export const title = () => s.title;

export async function render({ main }) {
  const idx = await moleculeIndex();
  const bm = bookmarks();
  const allNotes = Object.entries(notes());
  const quiz = Object.entries(quizResults());
  const read = Object.keys(lessonsRead());
  const earned = new Set(earnedBadges());
  const cards = bm
    .map(b => {
      if (b.key.startsWith('cid:')) return liveCard({ cid: b.key.slice(4), title: b.label });
      const m = getMolecule(b.key);
      return m ? moleculeCard(m, idx.get(m.id)) : '';
    })
    .join('');
  const recentLinks = recent()
    .slice(0, 12)
    .map(r => {
      const [kind, key] = [String(r.key).split(':')[0], String(r.key).slice(String(r.key).indexOf(':') + 1)];
      if (!/^[\w-]{1,60}$/.test(key)) return '';
      const href =
        kind === 'mol' ? `/molecule/${key}` : kind === 'cid' ? `/molecule/cid/${key}` : `/atom/${key}`;
      return `<a class="chip" href="${esc(href)}">${esc(r.label)}</a>`;
    })
    .join(' ');

  main.innerHTML = `<div class="container">
    ${pageHead({
      title: esc(s.title),
      lead: esc(s.lead),
      actions: `<button class="btn" type="button" data-export>${icon('download', { size: 16 })} ${esc(s.export)}</button>
        <label class="btn">${icon('upload', { size: 16 })} ${esc(s.import)}<input class="sr-only" type="file" accept="application/json,.json" data-import /></label>`,
    })}
    <section><h2>${esc(s.bookmarks)} (${bm.length})</h2>${cards ? `<div class="grid grid-cards">${cards}</div>` : emptyState(s.noBookmarks)}</section>
    <section><h2>${esc(s.notes)}</h2>${
      allNotes.length
        ? `<div class="grid grid-2">${allNotes
            .map(
              ([
                key,
                n,
              ]) => `<article class="card note-card"><h3 class="h-small">${esc(n.label)}</h3><p class="note-text">${esc(n.text)}</p>
              <p class="muted small">${new Date(n.at).toLocaleString()}</p><button class="btn btn-small" type="button" data-del-note="${esc(key)}">${icon('trash', { size: 14 })} ${esc(s.delete)}</button></article>`
            )
            .join('')}</div>`
        : `<p class="muted">${esc(s.noNotes)}</p>`
    }</section>
    <section class="grid grid-2">
      <div class="card"><h2 class="h-small">${esc(s.progress)}</h2>
        <p>${esc(fmt(s.lessons, { n: read.length }))}${
          read.length
            ? `: ${read
                .map(id => findTopic(id))
                .filter(Boolean)
                .map(t => esc(pick(t.title)))
                .join(', ')}`
            : ''
        }</p>
        <h3 class="h-small">${esc(s.quizzes)}</h3>
        <ul>${quiz.map(([, q]) => `<li>${esc(q.label)}: ★ ${q.best}/${q.total} (${q.tries}×)</li>`).join('') || '<li>–</li>'}</ul>
      </div>
      <div class="card"><h2 class="h-small">${esc(s.badges)}</h2><div class="badges">${BADGES.map(
        b =>
          `<div class="badge-card ${earned.has(b.id) ? 'is-earned' : ''}">${icon(b.icon, { size: 24 })}<strong>${esc(pick(b.name))}</strong><span>${esc(pick(b.goal))}</span></div>`
      ).join('')}</div></div>
    </section>
    ${recentLinks ? `<section><h2>${esc(s.recent)}</h2><p>${recentLinks}</p></section>` : ''}
    <p><button class="btn btn-danger" type="button" data-clear>${icon('trash', { size: 16 })} ${esc(s.clear)}</button></p>
  </div>`;

  $('[data-export]', main).addEventListener('click', () =>
    download(`alchemist-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(exportData(), null, 2))
  );
  $('[data-import]', main).addEventListener('change', async e => {
    const file = e.target.files?.[0];
    if (!file || file.size > 2e6) return toast(s.badFile, 'warn');
    try {
      if (importData(JSON.parse(await file.text()))) {
        toast(s.imported);
        render({ main });
      } else toast(s.badFile, 'warn');
    } catch {
      toast(s.badFile, 'warn');
    }
  });
  main.firstElementChild.addEventListener('click', e => {
    const del = e.target.closest('[data-del-note]');
    if (del) {
      setNote(del.dataset.delNote, '');
      del.closest('.note-card').remove();
    }
    if (e.target.closest('[data-clear]') && confirm(s.confirmClear)) {
      for (const k of ['bookmarks', 'notes', 'quiz', 'lessons', 'labs', 'recent', 'answers']) remove(k);
      toast(s.cleared);
      window.dispatchEvent(new CustomEvent('alchemist:bookmarks'));
      render({ main });
    }
  });
}
