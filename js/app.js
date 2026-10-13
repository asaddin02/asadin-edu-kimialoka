// Kimialoka entry point: shell, routing, global event delegation and the service worker.
import { $, $$, esc, toast } from './core/dom.js';
import { applyPrefs, pick } from './core/prefs.js';
import { configureRouter, render, go, routeURL, upgradeLegacyHash } from './core/router.js';
import { toggleBookmark, bookmarks } from './core/userdata.js';
import { renderHeader, renderFooter, markActive, bindShell } from './components/layout.js';
import { icon } from './components/icons.js';
import { imageURL } from './services/pubchem.js';
import { ui } from './i18n/ui.js';

// Old "#/page" links become "/page" before anything renders.
upgradeLegacyHash();
applyPrefs();
renderHeader();
renderFooter();
bindShell(q => go(routeURL('search', null, { q })));
configureRouter({ before: route => markActive(route.page) });

window.addEventListener('kimialoka:prefs', () => {
  renderHeader();
  renderFooter();
  // The skip link moves focus without touching the route.
  $('.skip-link')?.addEventListener('click', e => {
    e.preventDefault();
    $('#main').focus();
  });

  render();
});

// Bookmark buttons anywhere on the page.
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-bookmark]');
  if (!btn) return;
  const key = btn.dataset.bookmark;
  const added = toggleBookmark(key, btn.dataset.label);
  for (const b of $$(`[data-bookmark="${CSS.escape(key)}"]`)) {
    b.setAttribute('aria-pressed', String(added));
    const text = added ? ui.unsave : ui.save;
    b.setAttribute('aria-label', `${text}: ${b.dataset.label}`);
    b.title = text;
    b.querySelector('svg').outerHTML = icon(added ? 'bookmarkFill' : 'bookmark', { size: 18 });
    const label = b.querySelector('span');
    if (label) label.textContent = added ? ui.saved1 : ui.save;
  }
  const count = bookmarks().length;
  for (const c of $$('[data-nav="saved"] .count')) c.textContent = count;
  toast(
    added
      ? pick(['Disimpan ke koleksimu.', 'Saved to your collection.'])
      : pick(['Dihapus dari koleksi.', 'Removed from your collection.'])
  );
});

// Broken images: a Commons photo falls back to the PubChem drawing, then to a neutral placeholder.
document.addEventListener(
  'error',
  e => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.dataset.fallback) return;
    // PubChem answers 503 when many images load at once; try again a little later.
    const left = Number(img.dataset.retry ?? 2);
    if (left > 0 && img.src.includes('pubchem.ncbi.nlm.nih.gov')) {
      img.dataset.retry = String(left - 1);
      const src = img.src;
      setTimeout(() => (img.src = `${src.split('&retry')[0]}&retry=${left}`), 1200 + Math.random() * 2500);
      return;
    }
    if (img.dataset.fallback === 'remove') {
      img.closest('figure')?.remove();
      return;
    }
    if (img.dataset.fallback === 'structure' && img.dataset.cid) {
      img.dataset.fallback = 'icon';
      img.className = 'card-structure';
      img.src = imageURL(img.dataset.cid, 300);
      return;
    }
    const ph = document.createElement('span');
    ph.className = `img-placeholder ${img.className}`;
    ph.innerHTML = icon('molecule', { size: 40 });
    ph.setAttribute('role', 'img');
    ph.setAttribute('aria-label', img.alt);
    img.replaceWith(ph);
  },
  true
);

// Offline support: installable PWA with cached app shell and data.
if (
  'serviceWorker' in navigator &&
  (location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname))
) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => {
        reg.addEventListener('updatefound', () => {
          const next = reg.installing;
          next?.addEventListener('statechange', () => {
            if (next.state === 'installed' && navigator.serviceWorker.controller) showUpdate(next);
          });
        });
      })
      .catch(() => {});
  });
  // Reload only when a new version takes over, not when the very first worker installs.
  const hadController = Boolean(navigator.serviceWorker.controller);
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading || !hadController) return;
    reloading = true;
    location.reload();
  });
}

function showUpdate(worker) {
  const box = $('#toast');
  box.innerHTML = `<div class="toast toast-info">${esc(pick(['Versi baru Kimialoka tersedia.', 'A new version of Kimialoka is available.']))}
    <button class="btn btn-small" type="button" data-update>${esc(pick(['Perbarui', 'Update']))}</button></div>`;
  box
    .querySelector('[data-update]')
    .addEventListener('click', () => worker.postMessage({ type: 'SKIP_WAITING' }));
}

// The skip link moves focus without touching the route.
$('.skip-link')?.addEventListener('click', e => {
  e.preventDefault();
  $('#main').focus();
});

render();
