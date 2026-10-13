#!/usr/bin/env node
// Renders the brand PNGs (favicon, PWA icons, apple-touch icon, link-preview image) from assets/brand/mark.svg
// with headless Chromium (Playwright). Run after changing the logo: npm run icons
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = fileURLToPath(new URL('..', import.meta.url));
const brand = join(root, 'assets', 'brand');
const svg = await readFile(join(brand, 'mark.svg'));
const data = `data:image/svg+xml;base64,${svg.toString('base64')}`;
const chrome =
  process.env.CHROME_PATH || (existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined);
const browser = await chromium.launch({ executablePath: chrome, args: ['--no-sandbox'] });
const page = await browser.newPage();

async function shot(file, width, height, html) {
  await page.setViewportSize({ width, height });
  await page.setContent(`<!doctype html><html><body style="margin:0">${html}</body></html>`);
  await page.evaluate(async () => {
    await Promise.all([...document.images].map(img => img.decode()));
    await document.fonts.ready;
  });
  await page.screenshot({
    path: join(brand, file),
    omitBackground: false,
    clip: { x: 0, y: 0, width, height },
  });
  console.log(`assets/brand/${file} ${width}×${height}`);
}

const icon = size => `<img src="${data}" width="${size}" height="${size}" style="display:block">`;
await shot('logo.png', 512, 512, icon(512));
await shot('favicon-48.png', 48, 48, icon(48));
await shot(
  'apple-touch-icon.png',
  180,
  180,
  `<div style="background:#edf3ff;width:180px;height:180px">${icon(180)}</div>`
);
await shot('icon-192.png', 192, 192, icon(192));
await shot('icon-512.png', 512, 512, icon(512));
// Maskable: the logo inside the 80% safe zone on a full-bleed background.
await shot(
  'icon-maskable-512.png',
  512,
  512,
  `<div style="width:512px;height:512px;background:#edf3ff;display:grid;place-items:center"><img src="${data}" width="380" height="380"></div>`
);
await shot(
  'og-image.png',
  1200,
  630,
  `<div style="width:1200px;height:630px;box-sizing:border-box;padding:80px;background:#245fdb;color:#fff;font-family:system-ui,sans-serif;display:flex;flex-direction:column;justify-content:center;gap:28px">
    <div style="display:flex;align-items:center;gap:28px"><div style="padding:16px;background:#fff;border-radius:32px">${icon(130)}</div><div><div style="font-size:84px;font-weight:800;letter-spacing:-2px">Kimialoka</div><div style="font-size:30px;opacity:.85">Asadin Edu</div></div></div>
    <div style="font-size:40px;font-weight:700;max-width:1000px;line-height:1.25">Ensiklopedia kimia interaktif: dari materi dan atom sampai reaksi.</div>
    <div style="font-size:26px;opacity:.8">Unsur · Isotop · Ion · Molekul · Material · Reaksi<br>Materi berjenjang SD–kuliah · Laboratorium virtual</div>
  </div>`
);
await browser.close();
