// Shared Playwright helpers: offline network stubs for PubChem and Wikimedia, preferences and error capture.
import { expect } from '@playwright/test';

const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64'
);

/** A small PubChem-like dataset for "live" compounds (CID 3345 = fentanyl stand-in, here "Testium"). */
export const LIVE = {
  cid: 999001,
  title: 'Testium',
  formula: 'C2H6O',
  sdf: `Testium
  test

  3  2  0  0  0  0  0  0  0  0999 V2000
    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.5000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    2.2000    1.2000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  1  0  0  0  0
  2  3  1  0  0  0  0
M  END
$$$$`,
};

function pubchem(url) {
  const u = new URL(url);
  const p = decodeURIComponent(u.pathname);
  if (p.endsWith('/PNG')) return { body: PNG, contentType: 'image/png' };
  if (p.includes('/autocomplete/'))
    return { json: { total: 2, dictionary_terms: { compound: ['testium', 'testiumol'] } } };
  if (p.includes('/fastformula/') || p.includes('/fastsubstructure/'))
    return { json: { IdentifierList: { CID: [LIVE.cid] } } };
  if (/\/compound\/name\/[^/]+\/cids/.test(p)) return { json: { IdentifierList: { CID: [LIVE.cid] } } };
  if (/\/compound\/(smiles|inchi|inchikey)\/.*cids/.test(p))
    return { json: { IdentifierList: { CID: [LIVE.cid] } } };
  if (p.includes('/record/SDF'))
    return p.includes(String(LIVE.cid))
      ? { body: LIVE.sdf, contentType: 'chemical/x-mdl-sdfile' }
      : { status: 404, json: {} };
  if (p.includes('/property/') && p.includes(String(LIVE.cid)))
    return {
      json: {
        PropertyTable: {
          Properties: [
            {
              CID: LIVE.cid,
              Title: LIVE.title,
              MolecularFormula: LIVE.formula,
              MolecularWeight: '46.07',
              IUPACName: 'testethanol',
              SMILES: 'CCO',
              InChIKey: 'TEST-KEY',
              XLogP: -0.1,
              TPSA: 20.2,
              HBondDonorCount: 1,
              HBondAcceptorCount: 1,
            },
          ],
        },
      },
    };
  if (p.includes('/synonyms/'))
    return { json: { InformationList: { Information: [{ Synonym: ['testium', '64-17-5'] }] } } };
  if (p.includes('/description/'))
    return {
      json: {
        InformationList: {
          Information: [
            {
              Description: 'Testium is a test compound used only in automated tests.',
              DescriptionSourceName: 'ChEBI',
            },
          ],
        },
      },
    };
  return { status: 404, json: { Fault: { Code: 'PUGREST.NotFound' } } };
}

/** Stubs every external request so tests are fast, deterministic and work offline. */
export async function stubNetwork(page) {
  await page.route(/^https:\/\/pubchem\.ncbi\.nlm\.nih\.gov\//, route => {
    const r = pubchem(route.request().url());
    route.fulfill({
      status: r.status || 200,
      contentType: r.contentType || 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: r.body ?? JSON.stringify(r.json),
    });
  });
  await page.route(/^https:\/\/(upload|thumb)\.wikimedia\.org\//, route =>
    route.fulfill({
      status: 200,
      contentType: 'image/png',
      headers: { 'access-control-allow-origin': '*' },
      body: PNG,
    })
  );
  await page.route(
    /^https:\/\/([a-z]+\.wikipedia\.org|www\.wikidata\.org|query\.wikidata\.org|commons\.wikimedia\.org)\//,
    route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: { 'access-control-allow-origin': '*' },
        body: '{}',
      })
  );
}

/** Sets learner preferences before the app loads. */
export async function prefs(page, { level = 'smp', lang = 'id', theme = 'light' } = {}) {
  await page.addInitScript(
    p => localStorage.setItem('alchemist:prefs', JSON.stringify({ ...p, chosen: true })),
    {
      level,
      lang,
      theme,
    }
  );
}

/** Collects page errors and console errors (ignoring stubbed 404s). */
export function watchErrors(page) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => {
    if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text());
  });
  return errors;
}

/**
 * Navigates to a route and waits until the router has finished rendering it. Chrome aborts in-flight requests
 * with ERR_NETWORK_CHANGED when the host's network interfaces change (for example Docker starting containers);
 * that is not an app failure, so the navigation is retried.
 */
export async function open(page, route, attempt = 1) {
  const failed = [];
  const onFailed = r => failed.push(`${r.url()} (${r.failure()?.errorText})`);
  page.on('requestfailed', onFailed);
  let problem = '';
  try {
    // Inside the running app, navigate like a link click (pushState + render) instead of reloading the document:
    // faster, and it exercises the router the way users do. The first visit loads the page from the server.
    const inApp = await page.evaluate(() => Boolean(document.body?.dataset.route)).catch(() => false);
    if (inApp)
      await page.evaluate(url => {
        history.pushState(null, '', url);
        dispatchEvent(new PopStateEvent('popstate'));
      }, `/${route}`);
    else await page.goto(`/${route}`);
    try {
      await page.waitForFunction(h => document.body.dataset.route === h, `/${route}`, { timeout: 20000 });
      const failure = page.locator('main [role="alert"] details code');
      if (await failure.count()) problem = `failed to load: ${await failure.first().textContent()}`;
    } catch {
      problem = `did not render: ${(await page.locator('main').textContent())?.replace(/\s+/g, ' ').slice(0, 200)}`;
    }
  } finally {
    page.off('requestfailed', onFailed);
  }
  if (problem && attempt < 3 && failed.some(f => f.includes('ERR_NETWORK_CHANGED'))) {
    // Leave the page first: a same-URL goto would keep the failed modules.
    await page.goto('about:blank');
    return open(page, route, attempt + 1);
  }
  if (problem) throw new Error(`/${route} ${problem} · failed requests: ${failed.join(', ') || 'none'}`);
  await expect(page.locator('main h1').first()).toBeVisible();
}
