const createError = require('http-errors')
const { bestBuyScrapper } = require('../utils/scrappers/best_buy')
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
        const [item1, item2] = await combineProducts([bestBuy, bestBuy])

        console.log({ Products: [...item1.products, ...item2.products].length })

        clearTimeout(timeout)

        res.send([...item1.products, ...item2.products])

    } catch (err) {
        next(err)
    }
}