const puppeteer = require('puppeteer')

const bestBuyScrapper = async function (item) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(
        `https://www.bestbuy.ca/en-ca/search?path=currentoffers0enrchstring%253aOn%2BSale&search=${item}`,
        { waitUntil: 'networkidle2' })

    await page.setViewport({
        width: 1957,
        height: 9999
    });

    const productNameSelector = 'div[class*="productItemName_3IZ3c"]'
    const priceSelector = 'div[class*="price_FHDfG"]'
    const linkSelector = 'a[class*="link_3hcyN"]'
    const imageSelector = 'img[class^="productItemImage_1en8J"]'

    await page.evaluate(() => { window.scrollBy(0, window.innerHeight) })

    await page.waitForSelector(`${productNameSelector}`)
    await page.waitForSelector(`${priceSelector}`)
    await page.waitForSelector(`${linkSelector}`)
    await page.waitForSelector(`${imageSelector}`)


    const images = await page.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => el.attributes.src.value)
        return data
    }, imageSelector)

    const productNames = await page.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => el.textContent)
        return data
    }, productNameSelector)

    const prices = await page.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => parseFloat(el.textContent.slice(1).replace(",", "")))
        return data
    }, priceSelector)

    const links = await page.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => `https://bestbuy.ca${el.attributes.href.value}`).filter(el => el.includes('/product/'))
        return data
    }, linkSelector)


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