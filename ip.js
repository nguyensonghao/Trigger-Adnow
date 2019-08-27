const request = require('request');
const cheerio = require('cheerio')
const FREE_IP_URL = 'https://free-proxy-list.net';

const format = (obj) => {
    return `${obj.isHttps == 'yes' ? 'https' : 'http'}=${obj.ip}:${obj.port}`;
}

const random = (items) => {
    return items[Math.floor(Math.random() * items.length)];
}

const getAllIP = () => {
    return new Promise((resolve, reject) => {
        request(FREE_IP_URL, (err, response, body) => {
            if (!err && response.statusCode == 200) {                
                try {
                    const $ = cheerio.load(body);
                    const listTR = $('#proxylisttable tbody tr');
                    const result = [];
                    for (let i = 0; i < listTR.length; i++) {
                        result.push({
                            ip: $(listTR[i]).find('td:nth-child(1)').html(),
                            port: $(listTR[i]).find('td:nth-child(2)').html(),
                            county: $(listTR[i]).find('td:nth-child(4)').html(),
                            google: $(listTR[i]).find('td:nth-child(6)').html(),
                            isHttps: $(listTR[i]).find('td:nth-child(7)').html(),
                            time: $(listTR[i]).find('td:nth-child(8)').html()
                        })
                    }
                    
                    resolve(result);
                } catch (error) {
                    reject(error);
                }                
            } else {
                reject(err);
            }            
        })
    })
}

const getIPFree = async () => {
    try {
        const listIP = await getAllIP();
        const ip = random(listIP.filter(ip => {
            return ip.isHttps == 'no';
        }))
        
        return ip ? format(ip) : null;
    } catch (e) {
        return null;
    }
}

module.exports = {
    getIPFree
}