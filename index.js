const puppeteer = require('puppeteer');
const fs = require('fs');

const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`sleep ${time}`);
            resolve(true);
        }, time);
    })
}

const writeContent = (content) => {
    return new Promise((resolve) => {
        fs.writeFile('./test.txt', content, (err) => {
            resolve(true);
        })
    })
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1680,
        height: 1050,
    })
    await page.goto('https://eva.vn');
    await page.addScriptTag({ path: './add-adnow.js' });
    await page.addScriptTag({ url: 'https://st-n.ads1-adnow.com/js/a.js' });
    await sleep(10000);
    let bodyHTML = await page.evaluate(() => document.head.innerHTML);
    await writeContent(bodyHTML);
    await page.screenshot({path: 'example.png'});
    await browser.close();
})();