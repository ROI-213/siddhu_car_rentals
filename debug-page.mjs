import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout;

  const htmlLen = await page.evaluate(() => document.documentElement.innerHTML.length);
  const bodyText = await page.evaluate(() => document.body.innerText);
  const bodyLen = await page.evaluate(() => document.body.innerHTML.length);

  console.log('HTML inner length:', htmlLen);
  console.log('Body innerHTML length:', bodyLen);
  console.log('Body text length:', bodyText?.length || 0);
  console.log('Body text first 300 chars:', (bodyText || '').slice(0, 300));
  console.log('JS errors:', JSON.stringify(errors, null, 2));

  await page.screenshot({ path: 'blank-page-debug.png', fullPage: true });
  await browser.close();
})();
