import { test, expect } from '@playwright/test';
import { stubNetwork, prefs, open } from './helpers.js';

test.use({ serviceWorkers: 'allow' });

test('installable manifest with icons', async ({ request }) => {
  const manifest = await (await request.get('/manifest.webmanifest')).json();
  expect(manifest.short_name).toBe('Alchemist');
  expect(manifest.icons.some(i => i.purpose === 'maskable')).toBe(true);
  for (const icon of manifest.icons) expect((await request.get(icon.src)).ok()).toBe(true);
});

test('the service worker precaches the app so it works offline', async ({ page, context }) => {
  await stubNetwork(page);
  await prefs(page);
  await page.goto('/');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    // `ready` resolves once the worker is active; clients.claim() may still be running on a slow machine,
    // and requests made before the page is controlled bypass the worker's caches.
    if (!navigator.serviceWorker.controller)
      await new Promise(resolve =>
        navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true })
      );
  });
  // Visit a molecule so its record is cached at runtime.
  await open(page, 'molecule/water');
  await expect(page.locator('h1')).toHaveText('Air');
  await expect
    .poll(() => page.evaluate(async () => Boolean(await caches.match('/data/molecules/water.json'))))
    .toBe(true);
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('h1')).toHaveText('Air');
  expect(
    await page
      .locator('.brand img')
      .first()
      .evaluate(img => img.complete && img.naturalWidth > 0)
  ).toBe(true);
  expect(
    await page.evaluate(async () => (await document.fonts.load('400 16px "Plus Jakarta Sans"')).length)
  ).toBeGreaterThan(0);
  await page.goto('/table');
  await expect(page.locator('.el-tile')).toHaveCount(118);
  await context.setOffline(false);
});
