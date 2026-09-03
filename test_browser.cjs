const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
       console.log('CONSOLE ERROR:', msg.text());
    }
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' }).catch(e => console.log('Goto Error:', e.message));
  await browser.close();
})();
