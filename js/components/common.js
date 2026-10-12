// Small building blocks shared by pages.
import { esc, safeURL } from '../core/dom.js';
import { pick } from '../core/prefs.js';
import { ui, levelName } from '../i18n/ui.js';
import { icon } from './icons.js';

/** Page heading with optional breadcrumbs, lead text and actions. */
export function pageHead({ title, lead = '', crumbs = [], eyebrow = '', actions = '', cls = '' }) {
  return `<header class="page-head ${cls}">
    ${crumbs.length ? breadcrumbs(crumbs) : ''}
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${actions ? `<div class="page-actions">${actions}</div>` : ''}
  </header>`;
}

export function breadcrumbs(items) {
  return `<nav class="crumbs" aria-label="${esc(pick(['Jejak halaman', 'Breadcrumb']))}"><ol>
    <li><a href="/">${esc(ui.home)}</a></li>
    ${items
      .map(([label, href]) =>
        href ? `<li><a href="${href}">${esc(label)}</a></li>` : `<li aria-current="page">${esc(label)}</li>`
      )
      .join('')}
  </ol></nav>`;
}

export const loading = (text = ui.loading) =>
  `<div class="state-loading" role="status"><span class="spinner" aria-hidden="true"></span><span>${esc(text)}</span></div>`;

export function emptyState(title, text = '', action = '') {
  return `<div class="state-empty">${icon('molecule', { size: 40 })}<p class="state-title">${esc(title)}</p>${
    text ? `<p>${esc(text)}</p>` : ''
  }${action}</div>`;
}

export function errorState(text = ui.error, retry = true) {
  return `<div class="state-error" role="alert">${icon('warning', { size: 28 })}<p>${esc(text)}</p>${
    retry ? `<button class="btn" type="button" data-action="reload">${esc(ui.retry)}</button>` : ''
  }</div>`;
}

export const notice = (html, tone = 'info') =>
  `<div class="notice notice-${tone}">${icon(tone === 'warn' ? 'warning' : 'info', { size: 18 })}<div>${html}</div></div>`;

export const levelBadge = lv => `<span class="badge badge-${lv}">${esc(levelName(lv))}</span>`;

export const chip = (label, href = '', cls = '') =>
  href
    ? `<a class="chip ${cls}" href="${href}">${esc(label)}</a>`
    : `<span class="chip ${cls}">${esc(label)}</span>`;

export function sectionHead(title, href = '', linkText = ui.seeAll, id = '') {
  return `<div class="section-head"><h2${id ? ` id="${id}"` : ''}>${title}</h2>${
    href ? `<a class="link-more" href="${href}">${esc(linkText)} ${icon('arrowRight', { size: 16 })}</a>` : ''
  }</div>`;
}

/** Accessible tab list; the page renders panels with id `${group}-panel-${key}` (role="tabpanel"). */
export function tabs(group, items, active, label = group) {
  return `<div class="tabs" role="tablist" aria-label="${esc(label)}">${items
    .map(
      ([key, label]) =>
        `<button class="tab" role="tab" type="button" id="${group}-tab-${key}" aria-controls="${group}-panel-${key}" aria-selected="${
          key === active
        }" tabindex="${key === active ? 0 : -1}" data-tab="${key}">${label}</button>`
    )
    .join('')}</div>`;
}

/** Wires tabs rendered by tabs(): click and arrow-key navigation. */
export function bindTabs(root, onChange) {
  const list = root.querySelector('[role="tablist"]');
  if (!list) return;
  for (const t of list.querySelectorAll('[role="tab"]')) {
    const panel = root.querySelector(`#${t.getAttribute('aria-controls')}`);
    if (panel) {
      panel.setAttribute('aria-labelledby', t.id);
      panel.hidden = t.getAttribute('aria-selected') !== 'true';
    }
  }
  const select = btn => {
    for (const t of list.querySelectorAll('[role="tab"]')) {
      const on = t === btn;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = root.querySelector(`#${t.getAttribute('aria-controls')}`);
      if (panel) panel.hidden = !on;
    }
    onChange?.(btn.dataset.tab);
  };
  list.addEventListener('click', e => {
    const t = e.target.closest('[role="tab"]');
    if (t) select(t);
  });
  list.addEventListener('keydown', e => {
    const all = [...list.querySelectorAll('[role="tab"]')];
    const i = all.indexOf(document.activeElement);
    const next =
      e.key === 'ArrowRight'
        ? all[(i + 1) % all.length]
        : e.key === 'ArrowLeft'
          ? all[(i - 1 + all.length) % all.length]
          : null;
    if (next) {
      e.preventDefault();
      next.focus();
      select(next);
    }
  });
}

/** "Sumber: PubChem (CID 962)" line with links. */
export const sourceLine = parts => `<p class="source-line">${esc(ui.source)}: ${parts.join(' · ')}</p>`;

/** External link; anything that is not an http(s) URL is shown as plain text. */
export const extLink = (href, label) =>
  safeURL(href)
    ? `<a href="${esc(safeURL(href))}" target="_blank" rel="noopener">${esc(label)} ${icon('external', { size: 14 })}</a>`
    : esc(label);
