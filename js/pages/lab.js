// Virtual laboratory: the list of labs and a host page that loads each lab module (js/labs/<id>.js).
import { esc } from '../core/dom.js';
import { S, pick, fmt, getPrefs } from '../core/prefs.js';
import { levelName } from '../i18n/ui.js';
import { icon } from '../components/icons.js';
import { pageHead, breadcrumbs, loading, errorState } from '../components/common.js';
import { LABS, findLab } from '../data/curriculum.js';
import { findTopic } from '../data/topics/index.js';
import { markLab } from '../core/userdata.js';

const s = S({
  title: ['Laboratorium virtual', 'Virtual laboratory'],
  lead: [
    '{n} simulasi interaktif untuk mencoba konsep kimia dengan aman: dari partikel zat dan waktu paruh sampai sel volta. Semua berjalan di browser, bahkan tanpa internet.',
    '{n} interactive simulations to try chemistry safely, from particles and half-lives to voltaic cells. Everything runs in the browser, even offline.',
  ],
  forYou: ['Disarankan untuk jenjangmu', 'Suggested for your level'],
  others: ['Lab lainnya', 'Other labs'],
  lesson: ['Materi terkait', 'Related lesson'],
  notFound: ['Lab tidak ditemukan.', 'Lab not found.'],
});

const MODULES = {
  wujud: () => import('../labs/wujud.js'),
  orbital: () => import('../labs/orbital.js'),
  nyala: () => import('../labs/nyala.js'),
  vsepr: () => import('../labs/vsepr.js'),
  rakit: () => import('../labs/rakit.js'),
  kristal: () => import('../labs/kristal.js'),
  setara: () => import('../labs/setara.js'),
  stoikiometri: () => import('../labs/stoikiometri.js'),
  ph: () => import('../labs/ph.js'),
  titrasi: () => import('../labs/titrasi.js'),
  gas: () => import('../labs/gas.js'),
  laju: () => import('../labs/laju.js'),
  volta: () => import('../labs/volta.js'),
  paruh: () => import('../labs/paruh.js'),
};

export const title = route => (route.id ? pick(findLab(route.id)?.title || ['Lab', 'Lab']) : s.title);

const card = l =>
  `<a class="card lab-card" href="/lab/${l.id}"><span class="topic-icon">${icon(l.icon, { size: 26 })}</span><span class="card-title">${esc(pick(l.title))}</span>
   <span class="card-text">${esc(pick(l.summary))}</span><span class="topic-meta">${l.levels.map(x => esc(levelName(x))).join(' · ')}</span><span class="card-next">${esc(pick(['Mulai eksperimen', 'Start experimenting']))} ${icon('arrowRight', { size: 16 })}</span></a>`;

export async function render({ id, main, params, cleanup, isCurrent }) {
  if (!id) {
    const lv = getPrefs().level === 'guru' ? 'kuliah' : getPrefs().level;
    const mine = LABS.filter(l => l.levels.includes(lv));
    const rest = LABS.filter(l => !l.levels.includes(lv));
    main.innerHTML = `<div class="container">
      ${pageHead({ title: esc(s.title), lead: esc(fmt(s.lead, { n: LABS.length })) })}
      <section><h2>${esc(s.forYou)}</h2><div class="grid grid-3">${mine.map(card).join('')}</div></section>
      ${rest.length ? `<section><h2>${esc(s.others)}</h2><div class="grid grid-3">${rest.map(card).join('')}</div></section>` : ''}
    </div>`;
    return;
  }
  const lab = findLab(id);
  if (!lab || !MODULES[id]) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><a class="btn" href="/lab">${esc(s.title)}</a></section>`;
    return;
  }
  const topic = findTopic(lab.topic);
  main.innerHTML = `<div class="container lab-page">
    ${breadcrumbs([
      [s.title, '/lab'],
      [pick(lab.title), ''],
    ])}
    <header class="page-head"><p class="eyebrow">${icon(lab.icon, { size: 18 })} ${esc(s.title)}</p><h1>${esc(pick(lab.title))}</h1><p class="lead">${esc(pick(lab.summary))}</p>
      ${topic ? `<p>${esc(s.lesson)}: <a href="/learn/${topic.id}">${esc(pick(topic.title))}</a></p>` : ''}</header>
    <div class="lab-host" data-lab>${loading()}</div>
  </div>`;
  try {
    const mod = await MODULES[id]();
    if (!isCurrent()) return;
    const host = main.querySelector('[data-lab]');
    host.innerHTML = '';
    const off = mod.mount(host, { params });
    if (typeof off === 'function') cleanup(off);
    markLab(id);
  } catch (error) {
    console.error(error);
    if (isCurrent()) main.querySelector('[data-lab]').innerHTML = errorState();
  }
}
