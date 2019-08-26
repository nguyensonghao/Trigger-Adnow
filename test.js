const puppeteer = require('puppeteer');

const sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    })
}

try {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({
            width: 1680,
            height: 1050,
        })

        await page.goto('https://eva.vn/');
        await page.addScriptTag({path: 'eva.js'})
        await page.addScriptTag({url: 'https://st-n.ads1-adnow.com/js/a.js'});
        await sleep(10000);
        await browser.close();
    })();    
} catch (error) {
    throw error;
}