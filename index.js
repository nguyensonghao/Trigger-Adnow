const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        args: [ '--proxy-server=http=190.157.247.65:53281' ]
    });
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.screenshot({path: 'example.png'});
    await browser.close();
})();