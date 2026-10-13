// Everything a learner saves stays on this device: bookmarks, notes, quiz results, lesson progress and
// recently viewed items. No account, no server, no analytics. Export/import lets learners move it.
import { load, save, dump } from './storage.js';

const emit = name => window.dispatchEvent(new CustomEvent(`kimialoka:${name}`));

// ---------- Bookmarks: curated ids ("water") or live PubChem compounds ("cid:2244") ----------
export const bookmarks = () => load('bookmarks', []);
export const isBookmarked = key => bookmarks().some(b => b.key === key);
export function toggleBookmark(key, label) {
  const list = bookmarks();
  const i = list.findIndex(b => b.key === key);
  if (i >= 0) list.splice(i, 1);
  else list.unshift({ key, label: String(label || key).slice(0, 120), at: Date.now() });
  save('bookmarks', list.slice(0, 500));
  emit('bookmarks');
  return i < 0;
}

// ---------- Notes ----------
export const notes = () => load('notes', {});
export const getNote = key => notes()[key]?.text || '';
export function setNote(key, text, label = key) {
  const all = notes();
  if (!text.trim()) delete all[key];
  else all[key] = { text: text.slice(0, 10000), label: String(label).slice(0, 120), at: Date.now() };
  return save('notes', all);
}

// ---------- Quiz results: best score per quiz ----------
export const quizResults = () => load('quiz', {});
export function recordQuiz(id, score, total, label) {
  const all = quizResults();
  const prev = all[id];
  all[id] = {
    label: String(label || id).slice(0, 120),
    best: Math.max(prev?.best ?? 0, score),
    total,
    last: score,
    tries: (prev?.tries ?? 0) + 1,
    at: Date.now(),
  };
  save('quiz', all);
  emit('progress');
  return all[id];
}

// ---------- Lessons read ----------
export const lessonsRead = () => load('lessons', {});
export function markLesson(id) {
  const all = lessonsRead();
  if (!all[id]) {
    all[id] = Date.now();
    save('lessons', all);
    emit('progress');
  }
}

// ---------- Labs tried and recently viewed ----------
export const labsTried = () => load('labs', {});
export function markLab(id) {
  const all = labsTried();
  all[id] = (all[id] || 0) + 1;
  save('labs', all);
}
export const recent = () => load('recent', []);
export function trackVisit(key, label) {
  const list = recent().filter(r => r.key !== key);
  list.unshift({ key, label: String(label || key).slice(0, 120), at: Date.now() });
  save('recent', list.slice(0, 30));
}

// ---------- Badges, derived from progress ----------
export const BADGES = [
  {
    id: 'explorer',
    icon: 'search',
    name: ['Penjelajah', 'Explorer'],
    test: s => s.visited >= 10,
    goal: ['Buka 10 molekul', 'Open 10 molecules'],
  },
  {
    id: 'collector',
    icon: 'bookmark',
    name: ['Kolektor', 'Collector'],
    test: s => s.saved >= 5,
    goal: ['Simpan 5 molekul', 'Save 5 molecules'],
  },
  {
    id: 'reader',
    icon: 'book',
    name: ['Pembaca tekun', 'Keen reader'],
    test: s => s.lessons >= 5,
    goal: ['Baca 5 materi', 'Read 5 lessons'],
  },
  {
    id: 'quizzer',
    icon: 'quiz',
    name: ['Juara kuis', 'Quiz champion'],
    test: s => s.perfect >= 3,
    goal: ['Nilai sempurna di 3 kuis', 'Perfect score in 3 quizzes'],
  },
  {
    id: 'scientist',
    icon: 'flask',
    name: ['Ilmuwan muda', 'Young scientist'],
    test: s => s.labs >= 5,
    goal: ['Coba 5 laboratorium', 'Try 5 labs'],
  },
  {
    id: 'master',
    icon: 'star',
    name: ['Master Kimialoka', 'Kimialoka master'],
    test: s => s.lessons >= 12 && s.perfect >= 8,
    goal: ['12 materi dan 8 kuis sempurna', '12 lessons and 8 perfect quizzes'],
  },
];

export function progressStats() {
  const quiz = Object.values(quizResults());
  return {
    visited: recent().length,
    saved: bookmarks().length,
    lessons: Object.keys(lessonsRead()).length,
    quizzes: quiz.length,
    perfect: quiz.filter(q => q.best === q.total && q.total > 0).length,
    labs: Object.keys(labsTried()).length,
  };
}
export const earnedBadges = () => {
  const stats = progressStats();
  return BADGES.filter(b => b.test(stats)).map(b => b.id);
};

// ---------- Export / import ----------
export function exportData() {
  return { app: 'kimialoka', version: 1, exported: new Date().toISOString(), data: dump() };
}
// Backups exported before the site was renamed carry the old app id; accept them so progress can move over.
const APP_IDS = ['kimialoka', 'alchemist'];
const ALLOWED = ['bookmarks', 'notes', 'quiz', 'lessons', 'labs', 'recent', 'prefs', 'answers'];
export function importData(json) {
  if (!json || !APP_IDS.includes(json.app) || typeof json.data !== 'object') return false;
  for (const key of ALLOWED) if (key in json.data) save(key, json.data[key]);
  emit('bookmarks');
  emit('progress');
  return true;
}
