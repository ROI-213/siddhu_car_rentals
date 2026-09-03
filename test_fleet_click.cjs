const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173');
  
  await page.waitForSelector('.nav-center-links');
  
  // Evaluate click
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('.nav-btn-link');
    for (let btn of buttons) {
      if (btn.textContent === 'Fleets') {
        btn.click();
        break;
      }
    }
  });
  
  console.log('Clicked Fleets. Waiting a bit...');
  await new Promise(r => setTimeout(r, 1000));
  
  const h1Text = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return h1 ? h1.textContent : null;
  });
  console.log('H1 text:', h1Text);
  
  await page.screenshot({ path: 'fleet_page_preview.png' });
  await browser.close();
})();
