// Learner preferences stay on this device. The learning environment always uses light mode.
import { load, save } from './storage.js';

export const LEVELS = ['sd', 'smp', 'sma', 'kuliah', 'guru'];
export const LANGS = ['id', 'en'];

const stored = load('prefs', {});
const state = {
  level: LEVELS.includes(stored.level) ? stored.level : 'smp',
  lang: LANGS.includes(stored.lang) ? stored.lang : navigator.language?.startsWith('en') ? 'en' : 'id',
  theme: 'light',
  chosen: Boolean(stored.chosen),
};

export const getPrefs = () => ({ ...state });
export const level = () => state.level;
export const lang = () => state.lang;
export const isTeacher = () => state.level === 'guru';

export function setPref(key, value) {
  if (key === 'theme') value = 'light';
  if (state[key] === value) return;
  state[key] = value;
  if (key === 'level') state.chosen = true;
  save('prefs', state);
  applyPrefs();
  window.dispatchEvent(new CustomEvent('kimialoka:prefs', { detail: { key, value } }));
}

export function applyPrefs() {
  const root = document.documentElement;
  root.lang = state.lang;
  root.dataset.level = state.level;
  root.dataset.theme = 'light';
}

/** Picks the current-language string from a [Bahasa Indonesia, English] pair (or returns a plain string). */
export const pick = pair =>
  Array.isArray(pair) ? (state.lang === 'en' ? (pair[1] ?? pair[0]) : pair[0]) : (pair ?? '');

/** Wraps a dictionary of pairs so that `s.key` always reads in the current language. */
export function S(pairs) {
  return new Proxy(pairs, { get: (target, key) => pick(target[key]) });
}

/** "Hello {name}" → "Hello Ana". */
export const fmt = (template, vars = {}) => String(template).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

const RANK = { sd: 0, smp: 1, sma: 2, kuliah: 3, guru: 4 };
/** True when the current mode is at least `lv` (teachers see everything). */
export const atLeast = lv => RANK[state.level] >= RANK[lv];
export const rank = lv => RANK[lv] ?? 0;
/** The level used to choose text depth: teachers read university-level text. */
export const depth = () => (state.level === 'guru' ? 'kuliah' : state.level);

export const locale = () => (state.lang === 'en' ? 'en-GB' : 'id-ID');
export function num(value, digits = 2) {
  if (value == null || value === '' || Number.isNaN(Number(value))) return '–';
  return Number(value).toLocaleString(locale(), { maximumFractionDigits: digits });
}
