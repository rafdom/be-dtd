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



app.get('/products/:productName', (req, res) => {
    (async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://www.amazon.ca/s?k=mouse&rh=p_n_specials_match%3A21224829011&dc&qid=1597103063&rnid=21224828011&ref=sr_nr_p_n_specials_match_1')

        const data = await page.evaluate(() => {
            let item = document.querySelector('.celwidget')
            return { item }
        })

        console.log(data)

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