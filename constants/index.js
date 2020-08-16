module.exports = Object.freeze({
    viewportOptions: {
        width: 2500,
        height: 15000
    },
    bestBuy: {
        productNameSelector: 'div[class*="productItemName_3IZ3c"]',
        priceSelector: 'div[class*="price_FHDfG"]',
        linkSelector: 'a[class*="link_3hcyN"]'
        ,
        imageSelector: 'img[class^="productItemImage_1en8J"]',
        url(item) {
            return `https://www.bestbuy.ca/en-ca/search?path=currentoffers0enrchstring%253aOn%2BSale&search=${item.split(" ").join("")}`
        }
    }
})