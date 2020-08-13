const router = require('express').Router()
const { bestBuyScrapper } = require('../utils/scraper')

router.get('/:productName', async (req, res, next) => {
    res.send(await bestBuyScrapper(req.params.productName))
})

module.exports = router;