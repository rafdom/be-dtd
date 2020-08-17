module.exports = async function getPrices(fn = {}, priceSelector) {

    const prices = await fn.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => parseFloat(el.textContent.slice(1).replace(",", "")))
        return data
    }, priceSelector)

    return prices
}