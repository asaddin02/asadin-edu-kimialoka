// The encyclopedia layer: knowledge map, unified search, isotopes, ions, reactions, materials, the richer element
// page and the half-life lab.
import { test, expect } from '@playwright/test';
import { stubNetwork, prefs, watchErrors, open, LIVE } from './helpers.js';

test.beforeEach(async ({ page }) => {
  await stubNetwork(page);
});

test('the knowledge map starts from matter and every domain lists concepts and lessons', async ({ page }) => {
  await prefs(page);
  const errors = watchErrors(page);
  await open(page, 'peta');
  await expect(page.locator('.matter-chain .chain-step')).toHaveCount(15);
  await expect(page.locator('.chain-step').first()).toContainText('Materi');
  await page.locator('.domain-card', { hasText: 'Isotop' }).first().click();
  await expect(page).toHaveURL(/\/peta\/inti/);
  await expect(page.locator('.concept-card').first()).toBeVisible();
  await expect(page.locator('main')).toContainText('Isotop, radioaktivitas & kimia inti');
  expect(errors).toEqual([]);
});

test('unified search recognises identifiers and finds every kind of item', async ({ page }) => {
  await prefs(page);
  await open(page, 'search?q=64-17-5');
  await expect(page.locator('[data-kind]')).toContainText('nomor CAS');
  await expect(page.locator('.result-top')).toContainText('Etanol');

  await open(page, 'search?q=C-14');
  await expect(page.locator('.result-top')).toContainText('Karbon-14');
  await expect(page.locator('.result-top')).toHaveAttribute('href', '/isotope/C-14');

  await open(page, 'search?q=sulfat');
  for (const group of ['Ion', 'Molekul & senyawa', 'Reaksi'])
    await expect(page.locator('.result-group h2', { hasText: group }).first()).toBeVisible();

  await open(page, 'search?q=CC(=O)O');
  await expect(page.locator('[data-kind]')).toContainText('SMILES');
  await expect(page.locator('[data-live]')).toContainText(LIVE.title);
});

test('element page shows the IUPAC standard atomic weight, natural isotopes, ions and reactions', async ({
  page,
}) => {
  await prefs(page, { level: 'sma' });
  const errors = watchErrors(page);
  await open(page, 'atom/Fe');
  const iso = page.locator('section:has(#iso-title)');
  await expect(iso).toContainText('55.845(2)');
  await expect(iso.locator('.iso-table tbody tr')).toHaveCount(4);
  await expect(page.locator('section:has(#ions-title) .ion-card')).not.toHaveCount(0);
  await expect(page.locator('section:has(#rx-title) .rx-card')).not.toHaveCount(0);
  await expect(page.locator('section:has(#safety-title)')).toContainText('GHS');
  await open(page, 'atom/Og');
  await expect(page.locator('section:has(#iso-title)')).toContainText('tidak menetapkan berat atom standar');
  expect(errors).toEqual([]);
});

test('isotope explorer: chart of nuclides and a nuclide page with its decay', async ({ page }) => {
  await prefs(page, { level: 'sma' });
  await open(page, 'isotope');
  await expect(page.locator('.nuclide-chart rect[data-z]')).not.toHaveCount(0);
  await open(page, 'isotope?q=U');
  await expect(page.locator('[data-table-title]')).toContainText('Uranium');
  await open(page, 'isotope/C-14');
  await expect(page.locator('h1')).toHaveText('Karbon-14');
  await expect(page.locator('main')).toContainText('5,7 ribu tahun');
  await expect(page.locator('main a[href="/isotope/N-14"]').first()).toBeVisible();
  await page.locator('a[href^="/lab/paruh"]').click();
  await expect(page.locator('#p-nuc option:checked')).toContainText('Karbon-14');
});

test('half-life lab: about half the parent atoms are left after each half-life', async ({ page }) => {
  await prefs(page, { level: 'sma' });
  await open(page, 'lab/paruh?z=53&a=131');
  await page.locator('#p-n').fill('500');
  await page.locator('#p-n').dispatchEvent('change');
  await page.locator('[data-step]').click();
  const text = await page.locator('[data-stats]').innerText();
  const left = Number(text.match(/tersisa: (\d+) dari 500/)[1]);
  // Binomial(500, ½): 6 standard deviations either side of 250.
  expect(left).toBeGreaterThan(180);
  expect(left).toBeLessThan(320);
  await expect(page.locator('[data-stats]')).toContainText('8,02 hari');
  await expect(page.locator('[data-age]')).toContainText('2 × waktu paruh');
});

test('ions, reactions and materials link to each other', async ({ page }) => {
  await prefs(page, { level: 'sma' });
  const errors = watchErrors(page);
  await open(page, 'ion/sulfat');
  await expect(page.locator('.formula-lg')).toContainText('SO');
  await expect(page.locator('main')).toContainText('Jumlah elektron');
  await open(page, 'reaction/haber-bosch');
  await expect(page.locator('.rx-flow > li')).toHaveCount(4);
  await expect(page.locator('.tally')).toContainText('N');
  await expect(page.locator('main')).toContainText('Setara');
  await open(page, 'reaction/fisi-uranium-235');
  await expect(page.locator('.rx-eq-lg .coef')).toHaveText('3');
  await open(page, 'material/baja');
  await expect(page.locator('main a[href="/atom/Fe"]').first()).toBeVisible();
  await open(page, 'reaction?type=redoks');
  await expect(page.locator('.rx-card')).not.toHaveCount(0);
  expect(errors).toEqual([]);
});

test('periodic table filters by category, block and state', async ({ page }) => {
  await prefs(page);
  await open(page, 'table?cat=halogen');
  await expect(page.locator('[data-shown]')).toContainText('dari 118');
  await expect(page.locator('.el-tile:not(.is-dim)')).toHaveCount(6);
  await page.locator('#pt-cat').selectOption('');
  await page.locator('#pt-st').selectOption('liquid');
  await expect(page.locator('.el-tile:not(.is-dim)')).toHaveCount(2);
});
