// Chemistry around me: molecules grouped by where learners meet them in daily life.
import { esc } from '../core/dom.js';
import { S, pick, fmt, getPrefs, rank } from '../core/prefs.js';
import { icon } from '../components/icons.js';
import { pageHead, breadcrumbs } from '../components/common.js';
import { moleculeCard } from '../components/cards.js';
import { PLACES, findPlace } from '../data/curriculum.js';
import { moleculesInPlace } from '../data/curatedMolecules.js';
import { moleculeIndex } from '../services/data.js';

const s = S({
  title: ['Kimia di sekitarku', 'Chemistry around me'],
  lead: [
    'Kimia ada di dapur, kamar mandi, tubuh, sawah, sampai ponselmu. Pilih tempat untuk melihat molekul yang ada di sana.',
    'Chemistry is in the kitchen, bathroom, your body, rice fields and even your phone. Pick a place to see its molecules.',
  ],
  count: ['{n} molekul', '{n} molecules'],
  forYou: ['Cocok untuk jenjangmu', 'Suited to your level'],
  others: ['Untuk jenjang lebih tinggi', 'For higher levels'],
  notFound: ['Tempat tidak ditemukan.', 'Place not found.'],
});

export const title = route => (route.id ? pick(findPlace(route.id)?.name || ['Tempat', 'Place']) : s.title);

export async function render({ id, main }) {
  if (!id) {
    main.innerHTML = `<div class="container">
      ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
      <div class="grid grid-3">${PLACES.map(
        p => `<a class="card place-card" href="/around/${p.id}"><span class="topic-icon">${icon(p.icon, { size: 28 })}</span>
          <span class="card-title">${esc(pick(p.name))}</span><span class="card-text">${esc(pick(p.about))}</span>
          <span class="topic-meta">${esc(fmt(s.count, { n: moleculesInPlace(p.id).length }))}</span></a>`
      ).join('')}</div>
    </div>`;
    return;
  }
  const p = findPlace(id);
  if (!p) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><a class="btn" href="/around">${esc(s.title)}</a></section>`;
    return;
  }
  const idx = await moleculeIndex();
  const lv = getPrefs().level === 'guru' ? 'kuliah' : getPrefs().level;
  const all = moleculesInPlace(p.id);
  const mine = all.filter(m => rank(m.lv) <= rank(lv));
  const higher = all.filter(m => rank(m.lv) > rank(lv));
  main.innerHTML = `<div class="container">
    ${breadcrumbs([
      [s.title, '/around'],
      [pick(p.name), ''],
    ])}
    ${pageHead({ title: `${icon(p.icon, { size: 30 })} ${esc(pick(p.name))}`, lead: esc(pick(p.about)) })}
    <section><h2>${esc(s.forYou)}</h2><div class="grid grid-cards">${mine.map(m => moleculeCard(m, idx.get(m.id))).join('')}</div></section>
    ${higher.length ? `<section><h2>${esc(s.others)}</h2><div class="grid grid-cards">${higher.map(m => moleculeCard(m, idx.get(m.id))).join('')}</div></section>` : ''}
  </div>`;
}
