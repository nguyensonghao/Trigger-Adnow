const request = require('request');
const cheerio = require('cheerio')
const FREE_IP_URL = 'https://free-proxy-list.net';

const format = (obj) => {
    return `${obj.isHttps == 'yes' ? 'https' : 'http'}=${obj.ip}:${obj.port}`;
}

const getIPFree = () => {
    return new Promise((resolve, reject) => {
        request(FREE_IP_URL, (err, response, body) => {
            if (!err && response.statusCode == 200) {                
                try {
                    const $ = cheerio.load(body);
                    const ip = $('#proxylisttable tbody tr').first().find('td:nth-child(1)').html();
                    const port = $('#proxylisttable tbody tr').first().find('td:nth-child(2)').html();
                    const isHttps = $('#proxylisttable tbody tr').first().find('td:nth-child(7)').html();
                    resolve(format({ip, port, isHttps}))
                } catch (error) {
                    reject(error);
                }                
            } else {
                reject(err);
            }            
        })
    })
}

module.exports = {
    getIPFree
}