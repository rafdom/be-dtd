const router = require('express').Router()
const products = require('../controller/products.controller')

module.exports = router.get('/:productName', products)