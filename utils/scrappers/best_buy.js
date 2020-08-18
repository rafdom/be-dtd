const puppeteer = require('puppeteer')
const { bestBuy: { imageSelector, linkSelector, priceSelector, productNameSelector, url }, viewportOptions } = require('../../constants')
const getAllSelectors = require('../../utils/getAllSelectors')

const bestBuyScrapper = async function (item) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url(item), { waitUntil: 'networkidle2' })
    await page.setViewport(viewportOptions);
    await page.evaluate(() => { window.scrollBy(0, document.body.offsetHeight) })

    setTimeout(() => {
        browser.close()
    }, 25000)

    await page.waitForSelector(`${productNameSelector}`)
    await page.waitForSelector(`${priceSelector}`)
    await page.waitForSelector(`${linkSelector}`)
    await page.waitForSelector(`${imageSelector}`)

    const [images, productNames, prices, links] = await getAllSelectors(page, [imageSelector, linkSelector, priceSelector, productNameSelector])


    browser.close()

    const products = []

    for (let i = 0; i < productNames.length; i++) {
        products.push({ productName: productNames[i], price: prices[i], link: links[i], image: images[i] })
    }

    return { products }
}

module.exports = { bestBuyScrapper }