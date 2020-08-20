require('dotenv').config()

module.exports = Object.freeze({
    viewportOptions: {
        width: 2500,
        height: 15000
    },
    bestBuy: {
        selectors: {
            productNameSelector: process.env.bb_name_selector,
            priceSelector: process.env.bb_price_selector,
            linkSelector: process.env.bb_link_selector,
            imageSelector: process.env.bb_image_selector,
        },
        url(item) {
            return `${process.env.bb_url}${item.split(" ").join("+")}`
        }
    }
})