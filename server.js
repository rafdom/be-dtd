const express = require('express')
const cors = require('cors')
const app = express()
const puppeteer = require('puppeteer')
// const { scrapeAmazon } = require('./utils/scraper')

const PORT = process.env.PORT || 5555
const Origin = process.env.Oirigin || '*'

app.use(cors({
    origin: Origin,
    methods: ['GET']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.get('/', (req, res) => {
    const puppeteer = require('puppeteer');

    (async function () {

        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://www.bestbuy.ca/en-ca/collection/giftable-mice-and-keyboards/265118?icmp=computing_20191101_mice_and_keyboards_category_detail_offer_guided_mice_keyboards_under_100', { waitUntil: 'domcontentloaded' })

        const productNameSelector = 'div[class^="productItemName_3IZ3c"]'
        const priceSelector = 'div[class^="price_FHDfG"]'
        const linkSelector = 'a[class^="link_3hcyN"]'

        await page.waitForSelector(`${productNameSelector}`)
        await page.waitForSelector(`${priceSelector}`)

        const productNames = await page.evaluate((selector) => {
            const data = Array.from(document.querySelectorAll(`${selector}`), el => el.textContent)
            return data
        }, productNameSelector)

        const prices = await page.evaluate((selector) => {
            const data = Array.from(document.querySelectorAll(`${selector}`), el => el.textContent)
            return data
        }, priceSelector)

        const links = await page.evaluate((selector) => {
            const data = Array.from(document.querySelectorAll(`${selector}`), el => `https://bestbuy.ca${el.attributes.href.value}`).slice(1)
            return data
        }, linkSelector)

        console.log({
            productNames: productNames.length,
            prices: prices.length,
            links: links.length
        })



        browser.close()
    })()

})


app.listen(PORT, (err) => {
    if (err) {
        console.error('error')
    } else {
        console.log(`listening to port: ${PORT}`)
    }
})