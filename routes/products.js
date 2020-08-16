const router = require('express').Router()
const { bestBuyScrapper } = require('../utils/scrapper')
const combineProducts = require('../lib/combineProducts')



module.exports = router.get('/:productName', async (req, res) => {

    let BBproducts = await bestBuyScrapper(req.params.productName)

    let [item1, item2] = await combineProducts([BBproducts, BBproducts])

    console.log("all products: ", [...item1.products, ...item2.products].length)
    res.send([...item1.products, ...item2.products])
})