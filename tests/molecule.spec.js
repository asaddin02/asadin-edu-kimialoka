import { test, expect } from '@playwright/test';
import { stubNetwork, prefs, watchErrors, open, LIVE } from './helpers.js';

test.beforeEach(async ({ page }) => {
  await stubNetwork(page);
});

test('molecule page: formula, 3D model, 2D drawing, safety and encyclopedia', async ({ page }) => {
  await prefs(page, { level: 'smp' });
  const errors = watchErrors(page);
  await open(page, 'molecule/water');
  await expect(page.locator('h1')).toHaveText('Air');
  await expect(page.locator('.mol-head .formula')).toHaveText('H2O');
  await expect(page.locator('[data-viewer] canvas')).toBeVisible();
  await expect(page.locator('.structure-2d svg.depict')).toBeVisible();
  await expect(page.locator('#sec-safety')).toContainText('tidak memenuhi kriteria bahaya GHS');
  await expect(page.locator('#sec-wiki .wiki')).toContainText('Air');
  await expect(page.locator('#sec-props')).toContainText('Titik didih');
  expect(errors).toEqual([]);
});

test('content depth follows the level', async ({ page }) => {
  await prefs(page, { level: 'sd' });
  await open(page, 'molecule/caffeine');
  await expect(page.locator('#sec-props')).toHaveCount(0);
  await expect(page.locator('#sec-id')).toHaveCount(0);
  await expect(page.locator('.explain')).toContainText('tersusun atas');

  await page.locator('#mode-select').selectOption('kuliah');
  await expect(page.locator('#sec-id')).toContainText('SMILES');
  await expect(page.locator('#sec-id')).toContainText('RYYVLZVUVIJVGH-UHFFFAOYSA-N');
  await expect(page.locator('.explain')).toContainText('TPSA');
});

test('crystal materials show a lattice model with its coordination', async ({ page }) => {
  await prefs(page, { level: 'sma' });
  await open(page, 'molecule/sodium-chloride');
  await expect(page.locator('.lattice-note')).toContainText('6 : 6');
  await expect(page.locator('.explain')).toContainText('perbandingan');
});

test('hazardous chemicals show GHS pictograms and Indonesian hazard statements', async ({ page }) => {
  await prefs(page, { level: 'sma' });
  await open(page, 'molecule/methanol');
  await expect(page.locator('.ghs-pic')).toHaveCount(3);
  await expect(page.locator('.signal')).toHaveText('Bahaya');
  await expect(page.locator('.hazards')).toContainText('Toksik jika tertelan');
});

test('bookmarks and notes are kept on the device', async ({ page }) => {
  await prefs(page);
  await open(page, 'molecule/glucose');
  await page.locator('.mol-actions [data-bookmark]').click();
  await expect(page.locator('.mol-actions [data-bookmark]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#mol-note').fill('Gula darah, bahan bakar sel.');
  await page.waitForTimeout(900);
  await open(page, 'saved');
  await expect(page.locator('.mol-card')).toHaveCount(1);
  await expect(page.locator('.mol-card')).toContainText('Glukosa');
  await expect(page.locator('.note-card')).toContainText('bahan bakar sel');
});

test('any PubChem compound opens as a live page', async ({ page }) => {
  await prefs(page, { level: 'kuliah' });
  const errors = watchErrors(page);
  await page.goto(`/molecule/cid/${LIVE.cid}`);
  await expect(page.locator('h1')).toHaveText(LIVE.title);
  await expect(page.locator('.badge-live').first()).toBeVisible();
  await expect(page.locator('#sec-id')).toContainText('CCO');
  await expect(page.locator('[data-viewer] canvas')).toBeVisible();
  expect(errors).toEqual([]);
});

test('names resolve to a compound, and catalogue CIDs redirect to the card', async ({ page }) => {
  await prefs(page);
  await page.goto('/molecule/name/testium');
  await expect(page).toHaveURL(new RegExp(`/molecule/cid/${LIVE.cid}`));
  await page.goto('/molecule/cid/962');
  await expect(page).toHaveURL(/\/molecule\/water$/);
  await expect(page.locator('h1')).toHaveText('Air');
});
