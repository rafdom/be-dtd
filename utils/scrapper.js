const puppeteer = require('puppeteer')
const getImages = require('./getImages')
const getProductNames = require('./getProductNames')
const { bestBuy: { imageSelector, linkSelector, priceSelector, productNameSelector, url }, viewportOptions } = require('../constants')
const getPrices = require('./getPrices')
const getLinks = require('./getLinks')

const bestBuyScrapper = async function (item) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url(item), { waitUntil: 'networkidle2' })

    await page.setViewport(viewportOptions);

    await page.evaluate(() => { window.scrollBy(0, document.body.offsetHeight) })

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

    // console.log({
    //     images: images.length,
    //     productNames: productNames.length,
    //     prices: prices.length,
    //     links: links.length
    // })

    return { products }
}

module.exports = { bestBuyScrapper }