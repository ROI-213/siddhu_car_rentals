const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:4173');
  
  await page.waitForSelector('.nav-center-links');
  
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('.nav-btn-link');
    for (let btn of buttons) {
      if (btn.textContent === 'Fleets') {
        btn.click();
        break;
      }
    }
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  await browser.close();
})();
