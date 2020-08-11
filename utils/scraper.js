const puppeteer = require('puppeteer')

const scrapeAmazon = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.amazon.ca/s?k=mouse&rh=p_n_specials_match%3A21224829011&dc&qid=1597103063&rnid=21224828011&ref=sr_nr_p_n_specials_match_1')

    const data = await page.evaluate(() => {
        let item = document.querySelector('.celwidget')

        return { item }
    })

    await browser.close()

    return data;
}

module.exports = { scrapeAmazon }