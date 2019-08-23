const puppeteer = require('puppeteer');

const IPHelper = require('./ip');

try {
    (async () => {
        const ip = await IPHelper.getIPFree();
        console.log('ip', ip);
        const browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            args: [ `--proxy-server=${ip}` ]
        })

        const page = await browser.newPage();
        await page.setViewport({
            width: 1680,
            height: 1050,
        })

        await page.goto('http://z-store.info');
        await page.screenshot({path: 'example.png'});
        await browser.close();
    })();    
} catch (error) {
    throw error;
}