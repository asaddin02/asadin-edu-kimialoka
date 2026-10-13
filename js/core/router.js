// Path router: /page/id?key=value (History API). Pages are ES modules loaded on demand; each exports
// render(ctx) and optionally title(route). ctx.cleanup(fn) registers work to undo when leaving the page.
// Links are plain <a href="/page/id">; one document-level click handler turns same-origin clicks into
// pushState navigations. Old "#/page/id" links are converted when the app starts, so they keep working.
import { $, esc } from './dom.js';
import { pick } from './prefs.js';

// Page modules, loaded on demand.
const PAGES = Object.fromEntries(
  [
    'home',
    'explore',
    'molecule',
    'classes',
    'table',
    'atom',
    'learn',
    'lab',
    'quiz',
    'compare',
    'around',
    'glossary',
    'saved',
    'teacher',
    'assignment',
    'about',
    'dukung',
    'search',
    'peta',
    'isotope',
    'ion',
    'reaction',
    'material',
  ].map(p => [p, `../pages/${p}.js`])
);
/** Imports a page module; a failed request is retried with a fresh URL because browsers cache import failures. */
const loadPage = path =>
  import(path).catch(() =>
    new Promise(r => setTimeout(r, 500)).then(() => import(`${path}?retry=${Date.now()}`))
  );
export const PAGE_NAMES = Object.keys(PAGES);

let token = 0;
const cleanups = [];
let hooks = { before() {}, after() {} };
export const configureRouter = h => (hooks = { ...hooks, ...h });

/** The current route as "/page/id?query" (what routeURL builds). */
export const currentURL = () => location.pathname + location.search;

/** Parses "/page/id?x=1" (or a legacy "#/page/id?x=1") into { page, id, params }. */
export function parseRoute(url = currentURL()) {
  const raw = String(url).replace(/^#/, '').replace(/^\/+/, '');
  const [path, query = ''] = raw.split('?');
  const parts = path
    .split('/')
    .filter(Boolean)
    .map(p => {
      try {
        return decodeURIComponent(p);
      } catch {
        return p;
      }
    });
  return {
    page: parts[0] || 'home',
    id: parts.slice(1).join('/') || null,
    params: new URLSearchParams(query),
  };
}

/** Builds "/page/id?x=1" with encoded parts; empty params are dropped; the home page is "/". */
export function routeURL(page, id = null, params = {}) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v != null && v !== '' && v !== false) q.set(k, v);
  const parts = page === 'home' && id == null ? [] : [page, ...(id == null ? [] : String(id).split('/'))];
  const path = parts.map(encodeURIComponent).join('/');
  return `/${path}${q.toString() ? `?${q}` : ''}`;
}

/** Changes the query string without re-rendering (filters, tabs). */
export function replaceQuery(params) {
  const { page, id } = parseRoute();
  history.replaceState(history.state, '', routeURL(page, id, params));
}

/** Navigates to a route URL ("/atom/Fe"), adding a history entry; the same URL just re-renders. */
export const go = url => {
  if (currentURL() === url) return render();
  history.pushState(null, '', url);
  return render(true);
};

/** Swaps the current route for another without a history entry (redirects such as /molecule/cid/962 → /molecule/water). */
export const replace = url => {
  history.replaceState(history.state, '', url);
  return render(true);
};

/** Renders the current route. `navigated` is true when the user moved to another page (not the first load). */
export async function render(navigated = false) {
  const mine = ++token;
  for (const fn of cleanups.splice(0))
    try {
      fn();
    } catch {}
  const route = parseRoute();
  // Recorded when rendering starts: pages may later rewrite the query (filters, tabs).
  const startURL = currentURL();
  const main = $('#main');
  hooks.before(route);
  const loader = Object.hasOwn(PAGES, route.page) ? PAGES[route.page] : null;
  if (!loader) {
    main.innerHTML = notFound();
    document.title = 'Kimialoka';
    document.body.dataset.route = startURL;
    return;
  }
  main.setAttribute('aria-busy', 'true');
  try {
    // One retry covers a module request that failed on a flaky connection.
    const mod = await loadPage(loader);
    if (mine !== token) return;
    main.dataset.page = route.page;
    const ctx = {
      ...route,
      main,
      isCurrent: () => mine === token,
      cleanup: fn => cleanups.push(fn),
    };
    await mod.render(ctx);
    if (mine !== token) return;
    const title = mod.title?.(route);
    document.title = title
      ? `${title} · Kimialoka`
      : pick(['Kimialoka · Ensiklopedia kimia interaktif', 'Kimialoka · Interactive chemistry encyclopedia']);
    window.scrollTo(0, 0);
    // After navigation, move focus to the page heading so screen-reader users hear where they are,
    // unless the user has already moved focus elsewhere (for example into the open menu).
    const h1 = main.querySelector('h1');
    const active = document.activeElement;
    if (navigated && h1 && !active?.closest('.drawer, .menu, [role="dialog"]')) {
      h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: true });
    }
    hooks.after(route);
    document.body.dataset.route = startURL;
  } catch (error) {
    if (mine !== token) return;
    console.error(error);
    main.innerHTML = `<section class="container page-state" role="alert">
      <h1>${esc(pick(['Halaman gagal dimuat', 'The page failed to load']))}</h1>
      <p>${esc(pick(['Periksa koneksi internet, lalu coba lagi.', 'Check your internet connection and try again.']))}</p>
      <button class="btn btn-primary" type="button" data-action="reload">${esc(pick(['Coba lagi', 'Try again']))}</button>
      <details class="muted small"><summary>${esc(pick(['Detail teknis', 'Technical details']))}</summary><code>${esc(String(error?.message || error).slice(0, 300))}</code></details>
    </section>`;
    document.body.dataset.route = startURL;
  } finally {
    if (mine === token) main.removeAttribute('aria-busy');
  }
}

function notFound() {
  return `<section class="container page-state">
    <h1>${esc(pick(['Halaman tidak ditemukan', 'Page not found']))}</h1>
    <p>${esc(pick(['Alamat ini tidak ada di Kimialoka.', 'This address does not exist in Kimialoka.']))}</p>
    <a class="btn btn-primary" href="/">${esc(pick(['Ke beranda', 'Go home']))}</a>
  </section>`;
}

/** Old "#/page/id" addresses (bookmarks, shared links) become "/page/id" without a history entry. */
export function upgradeLegacyHash() {
  if (!location.hash.startsWith('#/')) return false;
  const target = location.hash.slice(1);
  history.replaceState(history.state, '', target === '/' ? '/' : target);
  return true;
}

window.addEventListener('popstate', () => render(true));
// A hash route set while the app runs (an old in-page link) is upgraded and rendered too.
window.addEventListener('hashchange', () => upgradeLegacyHash() && render(true));
document.addEventListener('click', e => {
  // A full reload also clears module requests the browser has cached as failed.
  if (e.target.closest('[data-action="reload"]')) location.reload();
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest('a[href]');
  if (!a || a.target || a.hasAttribute('download') || a.getAttribute('rel')?.includes('external')) return;
  const href = a.getAttribute('href') || '';
  // In-page anchors (#main, #mode-choose) and non-route schemes are left to the browser.
  if (href.startsWith('#') || !/^(\/(?!\/)|https?:\/\/)/.test(href)) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  // Files (sw.js, data/*.json, assets) are not routes.
  if (/\.[a-z0-9]+$/i.test(url.pathname) && !Object.hasOwn(PAGES, url.pathname.split('/')[1])) return;
  e.preventDefault();
  go(url.pathname + url.search);
});
