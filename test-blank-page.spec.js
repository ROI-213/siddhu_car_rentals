import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout;

  const html = await page.innerHTML('html');
  console.log('HTML length:', html.length);
  console.log('Errors:', JSON.stringify(errors, null, 2));

  const bodyText = await page.textContent('body');
  console.log('Body text length:', bodyText?.length || 0);
  console.log('Body text snippet:', bodyText?.slice(0, 200));

  await page.screenshot({ path: 'blank-page-debug.png', fullPage: true });
});
