const express = require('express')
const puppeteer = require('puppeteer');
const app = express()
app.get('/', (req, res) => { res.send('hi') })
app.get('/captcha', (req, res) => {
  (async () => {
    try {
      const browser = await puppeteer.launch();
      const page1 = await browser.newPage();
      await page1.goto('https://services.ecourts.gov.in/ecourtindia_v6/'); console.log('site loaded');
      // const radio = await page1.waitForSelector('input#rdb_0'); 
      // await radio.click();
      // await page1.setViewport({ width: 40, height: 30, deviceScaleFactor: 40 });
      await page1.waitForSelector('img#captcha_image');
      setTimeout(async () => {
        const element = await page1.waitForSelector('img#captcha_image');
        await element.screenshot({ path: 'uploads1/screenshot.png' });
      }, 3000)
      // wait for the selector to load
      // declare a variable with an ElementHandle await page1.waitForSelector('input#cino');
      await page1.type('input[id=cino]', 'MHAU030151912016');
      // await page.$eval('input[id=cino]', el => el.value = 'Adenosine triphosphate');
      const page = await browser.newPage(); await page.goto('https://www.google.com.my/imghp');
      console.log('Google Image Search page loaded');
      const button = await page.waitForSelector('div.dRYYxd > div.nDcEnd');
      console.log(button); await button.click();
      console.log('Button clicked1');
      await button.click();
      await button.click();
      await button.click();
      console.log('Button clicked2');
      await page.$eval('.cB9M7', el => el.value = 'https://rthgthythyth.onrender.com/img');
      setTimeout(async () => {
        const submit = await page.waitForSelector('div.Qwbd3');
        console.log('----------->', submit);
        await submit.click();
      }, 3000)
      await page.waitForNavigation();
      const textButton = await page.waitForSelector('#ucj-3');
      console.log('<---------,', textButton);
      await textButton.click()
      await page.waitForSelector('.QeOavc')
      let element = await page.waitForSelector('[dir="ltr"]')
      const values = await page.evaluate(el => el.querySelector('[dir="ltr"]').innerHTML, element)
      console.log(typeof (values));
      var codes = (values) 
      page.close();
      await page1.waitForSelector('input#fcaptcha_code')
      await page1.type('input[id=fcaptcha_code]', codes);
      const view = await page1.waitForSelector('button#searchbtn')
      await view.click()
      // const numberlink = await page1.waitForSelector('a#SearchWMDatagrid_ctl03_lnkbtnappNumber1')
      // await numberlink.click() console.log('hi1234');
      const bodyHandle = await page1.waitForSelector('div.modal-content');
      const html = await page1.evaluate(body => body.innerHTML, bodyHandle);
      console.log(html); res.send(html)
      await bodyHandle.dispose();
      // await page1.evaluate(() => { 
      // console.log(document.getElementById('panelgetdetail').innerHTML); 
      // })
    } catch (error) {
      console.log('try to reload or image is unreadable', error);
    }
  })();
})
app.listen(3000, () => { console.log('listening') })