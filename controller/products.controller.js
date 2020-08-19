const createError = require('http-errors')
const { bestBuyScrapper } = require('../utils/scrappers/bestBuy_Scrapper')
const combineProducts = require('../lib/combineProducts')

module.exports = async (req, res, next) => {
    let timeout
    (() => {
        timeout = setTimeout(() => {
            next(createError(400, `The product's name is invalid.`))
            return
        }, 25000)
        return timeout
    })()

    try {
        const bestBuy = await bestBuyScrapper(req.params.productName)
        const items = await combineProducts([bestBuy, bestBuy])
        clearTimeout(timeout)
        console.log({ Total_Products: items.length })
        res.send(items)
    } catch (err) {
        next(err)
    }
}