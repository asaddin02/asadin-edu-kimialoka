// Cards for molecules (catalogue and live PubChem results), classes and elements.
import { esc, safeURL } from '../core/dom.js';
import { pick, num } from '../core/prefs.js';
import { ui } from '../i18n/ui.js';
import { icon } from './icons.js';
import { levelBadge } from './common.js';
import { isBookmarked } from '../core/userdata.js';
import { getClass } from '../data/classes.js';
import { formulaHTML } from '../services/formula.js';
import { imageURL } from '../services/pubchem.js';
import { depiction } from '../services/data.js';
import { depictSVG } from './depict.js';

export function bookmarkButton(key, label, compact = true) {
  const on = isBookmarked(key);
  const text = on ? ui.unsave : ui.save;
  return `<button class="${compact ? 'icon-btn card-save' : 'btn'}" type="button" data-bookmark="${esc(key)}" data-label="${esc(label)}" aria-pressed="${on}" aria-label="${esc(`${text}: ${label}`)}" title="${esc(text)}">${icon(on ? 'bookmarkFill' : 'bookmark', { size: 18 })}${compact ? '' : `<span>${esc(on ? ui.saved1 : ui.save)}</span>`}</button>`;
}

/** Picture for a molecule: a Commons photo when there is one, else PubChem's 2D structure drawing. */
export function moleculePicture(m, info, size = 240) {
  const name = pick(m.name);
  if (safeURL(info?.photo))
    return `<img class="card-photo" src="${esc(safeURL(info.photo))}" alt="${esc(pick(['Foto', 'Photo']))}: ${esc(name)}" loading="lazy" width="${size}" height="${Math.round(size * 0.66)}" data-fallback="structure" data-cid="${m.cid}" />`;
  const d = depiction(m.id);
  if (d) return depictSVG(d, { title: `${pick(['Struktur 2D', '2D structure'])}: ${name}`, size: 200 });
  return `<img class="card-structure" src="${imageURL(m.cid, 300)}" alt="${esc(pick(['Struktur 2D', '2D structure']))}: ${esc(name)}" loading="lazy" width="${size}" height="${Math.round(size * 0.66)}" data-fallback="icon" />`;
}

export function moleculeCard(m, info) {
  const name = pick(m.name);
  const cls = getClass(m.cls[0]);
  return `<article class="card mol-card">
    <a class="card-link" href="/molecule/${esc(m.id)}">
      <div class="card-media">${moleculePicture(m, info)}</div>
      <div class="card-body">
        ${info?.formula ? `<p class="formula">${formulaHTML(info.formula)}</p>` : ''}
        <h3 class="card-title">${esc(name)}</h3>
        <p class="card-text">${esc(pick(m.about))}</p>
      </div>
    </a>
    <div class="card-foot">
      ${levelBadge(m.lv)}
      ${cls ? `<a class="chip chip-class" href="/classes/${cls.id}">${esc(pick(cls.name))}</a>` : ''}
      ${bookmarkButton(m.id, name)}
    </div>
  </article>`;
}

/** Result from PubChem that is not in the catalogue. */
export function liveCard({ cid, title, formula, mw, label }) {
  return `<article class="card mol-card live">
    <a class="card-link" href="/molecule/cid/${Number(cid)}">
      <div class="card-media"><img class="card-structure" src="${imageURL(cid, 300)}" alt="${esc(pick(['Struktur 2D', '2D structure']))}: ${esc(title)}" loading="lazy" width="240" height="158" data-fallback="icon" /></div>
      <div class="card-body">
        ${formula ? `<p class="formula">${formulaHTML(formula)}</p>` : ''}
        <h3 class="card-title">${esc(label || title)}</h3>
        <p class="card-text">PubChem CID ${Number(cid)}${mw ? ` · ${num(mw, 2)} g/mol` : ''}</p>
      </div>
    </a>
    <div class="card-foot"><span class="badge badge-live">${icon('globe', { size: 14 })} PubChem</span>${bookmarkButton(`cid:${cid}`, label || title)}</div>
  </article>`;
}

export function classCard(c, count) {
  return `<a class="card class-card" href="/classes/${c.id}" style="--accent:${c.color}">
    <span class="class-icon">${icon(c.icon, { size: 26 })}</span>
    <span class="class-name">${esc(pick(c.name))}</span>
    ${c.general ? `<span class="class-general">${esc(c.general)}</span>` : ''}
    <span class="class-count">${count} ${esc(pick(['molekul', 'molecules']))}</span>
  </a>`;
}

/** Search suggestions from PubChem autocomplete (resolved to a CID when opened). */
export const nameResult = name =>
  `<li><a class="suggest" href="/molecule/name/${encodeURIComponent(name)}">${icon('globe', { size: 16 })}<span>${esc(name)}</span><small>PubChem</small></a></li>`;
