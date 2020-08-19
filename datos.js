const scrapeIt = require("scrape-it");

async function scrapeItExample() {
    const data = await scrapeIt('https://www.cronista.com/MercadosOnline/json/homegetPrincipal.html',);
    data2 = JSON.parse(data.body)
    console.log(data2.monedas[0].Venta);
}
scrapeItExample();