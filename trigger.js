const puppeteer = require('puppeteer');

const IPHelper = require('./ip');

const sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    })
}

const trigger = async () => {
    const ip = await IPHelper.getIPFree();
    console.log('ip', ip);
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        args: [ `--proxy-server=${ip}` ]
    })

    try {        
        const page = await browser.newPage();
        await page.setViewport({
            width: 1680,
            height: 1050,
        })

        await page.goto('https://eva.vn/');
        await page.addScriptTag({path: 'eva.js'})
        await page.addScriptTag({url: 'https://st-n.ads1-adnow.com/js/a.js'});
        await sleep(10000);
        await page.screenshot({path: 'test.png'});
        await browser.close();
    } catch (e) {
        console.log(e);
        await browser.close();
    }
}

(async () => {
    for (let i = 0; i < 10000; i++) {
        console.log(`index: ${i}`);
        await trigger();
    }
})();    