import { test, expect } from '@playwright/test';
import { stubNetwork, prefs, watchErrors, open } from './helpers.js';

const PAGES = [
  '',
  'explore',
  'classes',
  'classes/alkohol',
  'table',
  'atom',
  'atom/Fe',
  'learn',
  'learn/atom',
  'lab',
  'quiz',
  'compare?a=water&b=hydrogen-sulfide',
  'around',
  'around/dapur',
  'glossary',
  'glossary/mol',
  'saved',
  'teacher',
  'about',
  'molecule/water',
  'molecule/diamond',
  'molecule/polyethylene',
  'search?q=besi',
  'peta',
  'peta/inti',
  'isotope',
  'isotope/C-14',
  'ion',
  'ion/sulfat',
  'reaction',
  'reaction/haber-bosch',
  'material',
  'material/baja',
  'lab/paruh',
];

test.beforeEach(async ({ page }) => {
  await stubNetwork(page);
});

test('every main page renders a heading without script errors', async ({ page }) => {
  await prefs(page);
  const errors = watchErrors(page);
  for (const hash of PAGES) {
    await open(page, hash);
    await expect(page).toHaveTitle(/Kimialoka/);
  }
  expect(errors).toEqual([]);
});

test('first visit asks for a level; the choice changes the content and persists', async ({ page }) => {
  await page.goto('/');
  const chooser = page.locator('#mode-choose');
  await expect(chooser).toBeVisible();
  await chooser.getByRole('button', { name: /^SMA/ }).click();
  await expect(page.locator('html')).toHaveAttribute('data-level', 'sma');
  await expect(page.locator('#mode-select')).toHaveValue('sma');
  await page.reload();
  await expect(page.locator('#mode-choose')).toBeHidden();
  await expect(page.locator('html')).toHaveAttribute('data-level', 'sma');
});

test('language switches without reload and legacy dark preferences use light mode', async ({ page }) => {
  await prefs(page, { lang: 'id', theme: 'dark' });
  await open(page, 'table');
  await expect(page.locator('h1')).toHaveText('Tabel periodik unsur');
  await page.locator('[data-toggle="lang"]').click();
  await expect(page.locator('h1')).toHaveText('Periodic table of the elements');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('[data-toggle="theme"]')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
});

test('unknown routes show a friendly not-found page', async ({ page }) => {
  await prefs(page);
  await page.goto('/does-not-exist');
  await expect(page.locator('h1')).toHaveText('Halaman tidak ditemukan');
  await page.goto('/molecule/no-such-molecule');
  await expect(page.locator('h1')).toHaveText('Molekul tidak ditemukan');
});

test('header search opens the unified search with the query', async ({ page }) => {
  await prefs(page);
  await page.setViewportSize({ width: 1500, height: 900 });
  await page.goto('/');
  await page.locator('#site-search').fill('kafeina');
  await page.locator('#site-search').press('Enter');
  await expect(page).toHaveURL(/\/search\?q=kafeina/);
  await expect(page.locator('.result-top')).toContainText('Kafeina');
});

test('mobile menu opens, lists every section and closes with Escape', async ({ page }) => {
  await prefs(page);
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const button = page.locator('[data-toggle="drawer"]');
  await button.click();
  await expect(page.locator('#drawer')).toBeVisible();
  await expect(page.locator('#drawer a')).toHaveCount(21);
  await page.keyboard.press('Escape');
  await expect(page.locator('#drawer')).toBeHidden();
  await expect(button).toBeFocused();
});
