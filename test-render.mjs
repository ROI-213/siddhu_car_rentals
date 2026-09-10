const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Capture console messages
  const logs = [];
  page.on('console', msg => {
    const text = msg.text();
    logs.push(`[${msg.type()}] ${text}`);
    console.log(`[${msg.type()}] ${text}`);
  });
  page.on('pageerror', err => {
    console.log('[PAGE ERROR]', err.message);
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout;

  const html = await page.content();
  console.log('\n=== HTML LENGTH:', html.length);
  console.log('\n=== HTML SNIPPET ===');
  console.log(html.substring(0, 2000));

  const text = await page.evaluate(() => document.body.innerText);
  console.log('\n=== BODY TEXT (first 500 chars) ===');
  console.log(text.substring(0, 500));

  // Check for root element content
  const rootContent = await page.evaluate(() => {
    const root = document.getElementById('root');
    return root ? root.innerHTML.substring(0, 500) : 'NO ROOT ELEMENT';
  });
  console.log('\n=== ROOT INNERHTML ===');
  console.log(rootContent);

  // Screenshot
  await page.screenshot({ path: 'C:/Users/LENOVO/Downloads/SIDDHU_CAR_RENTALS/screenshot.png', fullPage: true });
  console.log('\nScreenshot saved to screenshot.png');

  await browser.close();
})();
