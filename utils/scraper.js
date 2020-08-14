const puppeteer = require('puppeteer')
const getImages = require('./getImages')
const getProductNames = require('./getProductNames')
const { bestBuyProductSelectors, viewPortHeight, viewPortWidth } = require('../constants')
const getPrices = require('./getPrices')
const getLinks = require('./getLinks')

// const  = bestBuyProductSelectors

const bestBuyScrapper = async function (item) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(
        `https://www.bestbuy.ca/en-ca/search?path=currentoffers0enrchstring%253aOn%2BSale&search=${item.trim()}`,
        { waitUntil: 'networkidle2' })

    await page.setViewport({
        width: viewPortWidth,
        height: viewPortHeight
    });

    await page.evaluate(() => { window.scrollBy(0, document.body.offsetHeight) })

    const productNameSelector = 'div[class*="productItemName_3IZ3c"]'
    const priceSelector = 'div[class*="price_FHDfG"]'
    const linkSelector = 'a[class*="link_3hcyN"]'
    const imageSelector = 'img[class^="productItemImage_1en8J"]'


    await page.waitForSelector(`${productNameSelector}`)
    await page.waitForSelector(`${priceSelector}`)
    await page.waitForSelector(`${linkSelector}`)
    await page.waitForSelector(`${imageSelector}`)



    const images = await getImages(page, imageSelector)
    const productNames = await getProductNames(page, productNameSelector)
    const prices = await getPrices(page, priceSelector)
    const links = await getLinks(page, linkSelector)


    browser.close()

    const products = []

    for (let i = 0; i < productNames.length; i++) {
        products.push({ productName: productNames[i], price: prices[i], link: links[i], image: images[i] })
    }

    console.log({
        images: images.length,
        productNames: productNames.length,
        prices: prices.length,
        links: links.length
    })

    return { products }
}

module.exports = { bestBuyScrapper }