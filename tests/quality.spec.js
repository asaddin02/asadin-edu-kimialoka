import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { stubNetwork, prefs, open } from './helpers.js';

const A11Y_PAGES = [
  '',
  'explore',
  'molecule/water',
  'molecule/methanol',
  'classes/alkohol',
  'table',
  'atom/Fe',
  'learn/asam-basa',
  'lab/ph',
  'lab/titrasi',
  'quiz/topic-atom',
  'glossary',
  'teacher',
  'about',
  'search?q=besi',
  'peta',
  'peta/inti',
  'isotope',
  'isotope/C-14',
  'ion/sulfat',
  'reaction/haber-bosch',
  'material/baja',
  'lab/paruh',
];

test.beforeEach(async ({ page }) => {
  await stubNetwork(page);
});

for (const theme of ['light', 'dark']) {
  test(`no WCAG 2.1 AA violations (stored ${theme} preference)`, async ({ page }) => {
    test.setTimeout(120000);
    await prefs(page, { level: 'sma', theme });
    for (const hash of A11Y_PAGES) {
      await open(page, hash);
      await page.waitForTimeout(300);
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        // Decorative canvases are aria-hidden; the 3D canvas has role="img" and a label.
        .exclude('.hero-canvas')
        .analyze();
      const summary = violations.map(v => `${hash}: ${v.id} (${v.nodes.length}) ${v.nodes[0]?.target}`);
      expect(summary).toEqual([]);
    }
  });
}

test('no horizontal scrolling on a 320 px phone', async ({ page }) => {
  await prefs(page);
  await page.setViewportSize({ width: 320, height: 720 });
  for (const hash of [
    '',
    'explore',
    'molecule/caffeine',
    'table',
    'lab/setara',
    'lab/volta',
    'teacher',
    'learn/karbon',
    'search?q=sulfat',
    'peta',
    'isotope',
    'isotope/U-238',
    'atom/Fe',
    'reaction/fisi-uranium-235',
    'lab/paruh',
  ]) {
    await open(page, hash);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, hash).toBeLessThanOrEqual(1);
  }
});

test('keyboard users can skip to content and rotate the 3D model', async ({ page }) => {
  await prefs(page);
  await open(page, 'molecule/ammonia');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  const canvas = page.locator('[data-viewer] canvas');
  await canvas.focus();
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('+');
  await expect(canvas).toBeFocused();
});

test('pages set a descriptive document title and a single h1', async ({ page }) => {
  await prefs(page);
  for (const [hash, title] of [
    ['molecule/water', 'Air · Kimialoka'],
    ['atom/Au', 'Emas (Au): unsur nomor atom 79 · Kimialoka'],
    ['learn/zat', 'Zat dan wujudnya · Kimialoka'],
    ['isotope/C-14', 'Karbon-14 (C-14), isotop karbon · Kimialoka'],
    ['reaction/haber-bosch', 'Proses Haber–Bosch (amonia) · Kimialoka'],
    ['peta/inti', 'Isotop & kimia inti · Kimialoka'],
  ]) {
    await open(page, hash);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('main h1')).toHaveCount(1);
  }
});
