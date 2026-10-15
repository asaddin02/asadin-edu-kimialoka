// Learning shell: grouped navigation, search, learner level and language.
import { $, $$, esc } from '../core/dom.js';
import { go } from '../core/router.js';
import { getPrefs, setPref, LEVELS, pick } from '../core/prefs.js';
import { ui, levelName, levelLong } from '../i18n/ui.js';
import { icon } from './icons.js';
import { bookmarks } from '../core/userdata.js';
import { CONFIG } from '../config.js';

/** Every navigable section: [page, ui key, icon]. The sidebar, drawer and phone dock pick from here by name. */
const NAV = Object.fromEntries(
  [
    ['home', 'home', 'home'],
    ['search', 'search', 'search'],
    ['peta', 'peta', 'map'],
    ['explore', 'explore', 'molecule'],
    ['table', 'table', 'table'],
    ['isotope', 'isotope', 'nucleus'],
    ['ion', 'ion', 'charge'],
    ['classes', 'classes', 'layers'],
    ['reaction', 'reaction', 'swap'],
    ['material', 'material', 'gem'],
    ['atom', 'atom', 'atom'],
    ['learn', 'learn', 'book'],
    ['lab', 'lab', 'flask'],
    ['quiz', 'quiz', 'quiz'],
    ['around', 'around', 'pin'],
    ['saved', 'saved', 'bookmark'],
    ['compare', 'compare', 'compare'],
    ['glossary', 'glossary', 'book'],
    ['teacher', 'teacher', 'teacher'],
    ['about', 'about', 'info'],
    ['dukung', 'dukung', 'heart'],
  ].map(entry => [entry[0], entry])
);
const SIDEBAR = [
  [
    ['RUANG EKSPLORASI', 'EXPLORATION SPACE'],
    ['home', 'peta', 'explore', 'table', 'isotope', 'ion', 'classes', 'reaction', 'material', 'atom'],
  ],
  [
    ['AYO BELAJAR', 'LET’S LEARN'],
    ['learn', 'lab', 'quiz', 'around'],
  ],
  [
    ['PERLENGKAPANMU', 'YOUR TOOLKIT'],
    ['saved', 'compare', 'glossary', 'dukung'],
  ],
];
const DRAWER = Object.keys(NAV);
const DOCK = ['home', 'search', 'lab', 'saved'];

export function renderHeader() {
  const prefs = getPrefs();
  const count = bookmarks().length;
  const link = ([page, key, ic]) =>
    `<a class="nav-link" href="/${page === 'home' ? '' : page}" data-nav="${page}">${icon(ic, { size: 20 })}<span>${esc(ui[key])}</span>${
      page === 'saved' ? `<span class="count" aria-label="${count}">${count}</span>` : ''
    }</a>`;
  const brand = `<a class="brand" href="/" aria-label="Kimialoka, ${esc(ui.home)}">
    <img src="/assets/brand/logo.png" alt="" width="44" height="44" />
    <span class="brand-text"><strong>Kimialoka<span class="brand-dot">.</span></strong><small>BY ASADIN EDU</small></span>
  </a>`;
  $('#header').innerHTML = `
    <aside class="learning-sidebar" aria-label="${esc(pick(['Ruang belajar', 'Learning space']))}">
      ${brand}
      <nav aria-label="${esc(pick(['Navigasi utama', 'Main navigation']))}">
        ${SIDEBAR.map(([caption, pages]) => `<p class="nav-caption">${esc(pick(caption))}</p>${pages.map(p => link(NAV[p])).join('')}`).join('')}
      </nav>
      <a class="sidebar-teacher" href="/teacher" data-nav="teacher">${icon('teacher', { size: 22 })}<span><strong>${esc(ui.teacher)}</strong><small>${esc(pick(['Teman mengajar yang seru', 'Make learning come alive']))}</small></span>${icon('arrowRight', { size: 16 })}</a>
      <a class="sidebar-about" href="/about" data-nav="about">${icon('info', { size: 16 })} ${esc(ui.about)}</a>
    </aside>
    <div class="header-bar container">
      <div class="mobile-brand">${brand}</div>
      <p class="shell-location"><span>Kimialoka</span>${icon('chevronRight', { size: 14 })}<strong data-current-page>${esc(ui.home)}</strong></p>
      <div class="header-tools">
        <form class="header-search" role="search" data-search>
          <label class="sr-only" for="site-search">${esc(ui.searchLabel)}</label>
          <input id="site-search" name="q" type="search" autocomplete="off" placeholder="${esc(pick(['Cari sesuatu yang menarik…', 'Find something fascinating…']))}" />
          <button class="icon-btn" type="submit" aria-label="${esc(ui.search)}">${icon('search', { size: 19 })}</button>
        </form>
        <div class="learner-select">${icon('school', { size: 19 })}<label class="sr-only" for="mode-select">${esc(ui.modeLabel)}</label>
          <select id="mode-select" class="mode-select" data-pref="level" title="${esc(ui.modeLabel)}">
            ${LEVELS.map(l => `<option value="${l}" ${prefs.level === l ? 'selected' : ''}>${esc(levelName(l))}</option>`).join('')}
          </select>
        </div>
        <button class="icon-btn lang-btn" type="button" data-toggle="lang" aria-label="${esc(ui.switchLang)}" title="${esc(ui.switchLang)}"><span aria-hidden="true">${prefs.lang === 'id' ? 'EN' : 'ID'}</span></button>
        <button class="icon-btn menu-btn" type="button" aria-expanded="false" aria-controls="drawer" data-toggle="drawer" aria-label="${esc(ui.menu)}">${icon('menu')}</button>
      </div>
    </div>
    <div class="offline-bar" data-offline hidden>${icon('wifiOff', { size: 16 })} ${esc(ui.offline)}</div>
    <div class="drawer" id="drawer" hidden>
      <nav aria-label="${esc(ui.menu)}">${DRAWER.map(p => link(NAV[p])).join('')}</nav>
      <p class="drawer-mode">${esc(levelLong(prefs.level))}</p>
    </div>
    <nav class="mobile-dock" aria-label="${esc(pick(['Pintasan belajar', 'Learning shortcuts']))}">${DOCK.map(p => link(NAV[p])).join('')}</nav>`;
  markActive(location.pathname.split('/')[1] || 'home');
  updateOffline();
}

export function markActive(page) {
  const section = { molecule: 'explore', assignment: 'teacher' }[page] || page;
  const label = $('[data-current-page]');
  if (label) label.textContent = ui[section] || ui.home;
  for (const a of $$('[data-nav]')) {
    if (a.dataset.nav === section) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  closeMenus();
}

function closeMenus() {
  for (const btn of $$('[data-toggle="more"], [data-toggle="drawer"]')) {
    btn.setAttribute('aria-expanded', 'false');
    const target = $(`#${btn.getAttribute('aria-controls')}`);
    if (target) target.hidden = true;
  }
  document.body.classList.remove('drawer-open');
}

function toggle(btn) {
  const target = $(`#${btn.getAttribute('aria-controls')}`);
  const open = btn.getAttribute('aria-expanded') !== 'true';
  closeMenus();
  btn.setAttribute('aria-expanded', String(open));
  target.hidden = !open;
  if (btn.dataset.toggle === 'drawer') document.body.classList.toggle('drawer-open', open);
  if (open) target.querySelector('a, button')?.focus();
}

function updateOffline() {
  const bar = $('[data-offline]');
  if (bar) bar.hidden = navigator.onLine;
}

export function bindShell(onSearch) {
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-toggle]');
    if (t?.dataset.toggle === 'more' || t?.dataset.toggle === 'drawer') return toggle(t);
    if (t?.dataset.toggle === 'lang') return setPref('lang', getPrefs().lang === 'id' ? 'en' : 'id');
    if (!e.target.closest('.nav-more, .drawer, [data-toggle]')) closeMenus();
  });
  document.addEventListener('change', e => {
    if (e.target.matches('[data-pref="level"]')) setPref('level', e.target.value);
  });
  document.addEventListener('submit', e => {
    const form = e.target.closest('[data-search]');
    if (!form) return;
    e.preventDefault();
    const q = new FormData(form).get('q')?.toString().trim();
    if (q) onSearch(q);
    else go('/search');
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const open = $('[data-toggle][aria-expanded="true"]');
    if (open) {
      closeMenus();
      open.focus();
    }
  });
  window.addEventListener('online', updateOffline);
  window.addEventListener('offline', updateOffline);
}

export function renderFooter() {
  $('#footer').innerHTML = `
    <div class="container footer-grid">
      <div>
        <p class="footer-brand"><img src="/assets/brand/logo.png" alt="" width="28" height="28" /> <strong>Kimialoka</strong></p>
        <p>${esc(
          pick([
            'Ensiklopedia kimia interaktif yang terbuka untuk pelajar SD sampai mahasiswa, serta guru.',
            'An open interactive chemistry encyclopedia for primary pupils to university students, and teachers.',
          ])
        )}</p>
        <p class="muted">${esc(ui.eduNote)}</p>
        <p class="footer-family">${esc(pick(['Bagian dari', 'Part of']))} <a href="https://asadinedu.com/">Asadin Edu</a> · <a href="https://biotaloka.asadinedu.com/">Biotaloka</a> · <a href="https://fisikaloka.asadinedu.com/">Fisikaloka</a> · <a href="https://mitoloka.asadinedu.com/">Mitoloka</a> · <a href="https://kodeloka.asadinedu.com/">Kodeloka</a></p>
      </div>
      <div>
        <h2 class="footer-title">${esc(pick(['Sumber data resmi', 'Official data sources']))}</h2>
        <ul class="footer-links">
          <li><a href="https://pubchem.ncbi.nlm.nih.gov/" rel="noopener" target="_blank">PubChem · NIH/NLM</a></li>
          <li><a href="https://www.wikidata.org/" rel="noopener" target="_blank">Wikidata</a></li>
          <li><a href="https://id.wikipedia.org/" rel="noopener" target="_blank">Wikipedia</a></li>
          <li><a href="https://commons.wikimedia.org/" rel="noopener" target="_blank">Wikimedia Commons</a></li>
          <li><a href="https://www.ciaaw.org/" rel="noopener" target="_blank">IUPAC CIAAW</a></li>
          <li><a href="https://www-nds.iaea.org/amdc/" rel="noopener" target="_blank">IAEA Atomic Mass Data Center</a></li>
          <li><a href="https://openstax.org/subjects/science" rel="noopener" target="_blank">OpenStax</a></li>
        </ul>
      </div>
      <div>
        <h2 class="footer-title">Kimialoka</h2>
        <ul class="footer-links">
          <li><a href="/dukung">${esc(ui.dukung)}</a></li>
          <li><a href="/about">${esc(ui.about)}</a></li>
          <li><a href="/teacher">${esc(ui.teacher)}</a></li>
          <li><a href="/glossary">${esc(ui.glossary)}</a></li>
          <li><a href="${esc(CONFIG.repository)}" rel="noopener" target="_blank">${esc(pick(['Kode sumber (MIT)', 'Source code (MIT)']))}</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>${esc(
        pick([
          'Kode: MIT · Materi belajar: CC BY-SA 4.0 · Foto dan teks ensiklopedia mengikuti lisensi sumbernya.',
          'Code: MIT · Learning content: CC BY-SA 4.0 · Photos and encyclopedia text keep their source licenses.',
        ])
      )}</p>
      <p>${esc(pick(['Tanpa akun, tanpa iklan, tanpa pelacakan.', 'No accounts, no ads, no tracking.']))}</p>
    </div>`;
}
