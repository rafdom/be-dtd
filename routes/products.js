const router = require('express').Router()
const { bestBuyScrapper } = require('../utils/scrappers/best_buy')
const combineProducts = require('../lib/combineProducts')



module.exports = router.get('/:productName', async (req, res, next) => {

    try {
        const bestBuy = await bestBuyScrapper(req.params.productName)
        const [item1, item2] = await combineProducts([bestBuy, bestBuy])

        console.log("** All Products: ", [...item1.products, ...item2.products].length)

        res.send([...item1.products, ...item2.products])
    } catch (err) {
        res.send(next(new Error(err)))
    }
})