// Curriculum topics (Kurikulum Merdeka, IPA/IPAS and Kimia, plus university chemistry). Each topic file holds
// lesson text for every layer (SD Simple → SMP Standard → SMA Advanced → Kuliah Deep dive), key points, activities,
// a quiz, teacher notes and references. Pages get the light index (META, generated into meta.js by
// `npm run build`) and load a lesson's full text only when it is opened.
import { META } from './meta.js';

/**
 * Topic metadata in lesson order: { id, icon, levels (recommended), layers (with text), title, summary, nQuiz,
 * links: { e, m, i, r, mat, g, lab } } where links lists what the lesson mentions.
 */
export const TOPICS = META;
const byId = new Map(META.map(t => [t.id, t]));
/** Topic metadata (no lesson text). */
export const findTopic = id => byId.get(id) || null;

/** Lessons that mention an item: topicsLinking('e', 'Fe'), ('m', 'water'), ('i', 'sulfat'), ('g', 'ion'). */
export const topicsLinking = (kind, id) => META.filter(t => t.links?.[kind]?.includes(id));

const cache = new Map();
/** Full lesson: the topic file merged with its metadata. Resolves null for unknown ids. */
export function loadTopic(id) {
  const meta = findTopic(id);
  if (!meta) return Promise.resolve(null);
  if (!cache.has(id))
    cache.set(
      id,
      import(`./${id}.js`).then(
        mod => ({ ...mod.default, ...meta }),
        error => {
          cache.delete(id);
          throw error;
        }
      )
    );
  return cache.get(id);
}
export const loadTopics = (list = TOPICS) => Promise.all(list.map(t => loadTopic(t.id)));

/** Kurikulum Merdeka phases for each Kimialoka level (indicative). */
export const PHASES = {
  sd: ['Fase A–C · SD kelas 1–6 (IPAS)', 'Phases A–C · Grades 1–6 (IPAS)'],
  smp: ['Fase D · SMP kelas 7–9 (IPA)', 'Phase D · Grades 7–9 (Science)'],
  sma: ['Fase E–F · SMA kelas 10–12 (Kimia)', 'Phases E–F · Grades 10–12 (Chemistry)'],
  kuliah: ['Perguruan tinggi · Kimia dasar dan lanjut', 'University · General and advanced chemistry'],
};

/** Every lesson is written in four layers of depth, one per level. */
export const LAYERS = {
  sd: ['Sederhana', 'Simple'],
  smp: ['Standar', 'Standard'],
  sma: ['Lanjutan', 'Advanced'],
  kuliah: ['Mendalam', 'Deep dive'],
};

const ORDER = ['sd', 'smp', 'sma', 'kuliah'];
/** The text layer to show: the chosen level if the topic has it, else the nearest lower (or first) one. */
export function bodyLevel(topic, level) {
  const want = level === 'guru' ? 'kuliah' : level;
  const avail = topic.layers || ORDER.filter(l => topic.body?.[l]);
  if (avail.includes(want)) return want;
  const lower = avail.filter(l => ORDER.indexOf(l) < ORDER.indexOf(want));
  return lower.length ? lower[lower.length - 1] : avail[0];
}

/**
 * Quiz questions for a level: that level's questions, topped up with easier ones to reach 5. Harder questions are
 * added only when fewer than 3 would otherwise remain, so younger learners are not handed older levels' questions.
 */
export function quizFor(topic, level) {
  const want = level === 'guru' ? 'kuliah' : level;
  const rank = l => ORDER.indexOf(l);
  const exact = topic.quiz.filter(q => q.lv === want);
  const easier = topic.quiz.filter(q => rank(q.lv) < rank(want)).reverse();
  const harder = topic.quiz.filter(q => rank(q.lv) > rank(want));
  const out = [...exact];
  for (const q of easier) if (out.length < 5) out.push(q);
  for (const q of harder) if (out.length < 3) out.push(q);
  return out;
}
