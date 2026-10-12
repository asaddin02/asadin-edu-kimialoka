import { test, expect } from '@playwright/test';
import { stubNetwork, prefs, open } from './helpers.js';

test.beforeEach(async ({ page }) => {
  await stubNetwork(page);
});

test('a teacher creates an assignment link and a learner answers it', async ({ page, context }) => {
  await prefs(page, { level: 'guru' });
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await open(page, 'teacher');
  await page.getByRole('tab', { name: 'Buat tugas' }).click();
  await page.locator('#task-title').fill('Tugas asam basa');
  await page.locator('#task-topic').selectOption('asam-basa');
  await page.locator('#task-find').fill('cuka');
  await page.locator('[data-mol-list] input').first().check();
  await page.locator('#task-q').fill('Mengapa cuka terasa masam?\nSebutkan dua indikator alami.');
  await page.getByRole('button', { name: 'Buat tautan tugas' }).click();
  const link = await page.locator('#task-link').inputValue();
  expect(link).toContain('/assignment?d=');

  await page.goto(link);
  await expect(page.locator('h1')).toHaveText('Tugas asam basa');
  await expect(page.locator('.as-questions li')).toHaveCount(2);
  await expect(page.locator('.mol-card')).toContainText('Asam asetat');
  await page.locator('#as-q0').fill('Karena mengandung asam asetat.');
  await page.waitForTimeout(700);
  await page.reload();
  await expect(page.locator('#as-q0')).toHaveValue('Karena mengandung asam asetat.');
});

test('a damaged assignment link is rejected safely', async ({ page }) => {
  await prefs(page);
  await page.goto('/assignment?d=%3Cscript%3E');
  await expect(page.locator('.notice-warn')).toContainText('tidak valid');
});

test('lesson plans, worksheets and flashcards are printable', async ({ page }) => {
  await prefs(page, { level: 'guru' });
  await open(page, 'teacher');
  await expect(page.locator('[data-plan]')).toContainText('Kunci jawaban kuis');
  await page.locator('#plan-topic').selectOption('redoks');
  await expect(page.locator('[data-plan] h2')).toHaveText('Redoks dan elektrokimia');
  await page.evaluate(() => (window.print = () => {}));
  await page.getByRole('tab', { name: 'Lembar kerja & kartu' }).click();
  await page.locator('[data-print-cards]').click();
  await expect(page.locator('#print-sheet .flashcard').first()).toBeAttached();
});
