module.exports = async function getAllSelectors(fn = {}, { productNameSelector, priceSelector, linkSelector, imageSelector }) {

    const images = await fn.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => el.attributes.src.value)
        return data
    }, imageSelector)

    const links = await fn.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => `https://bestbuy.ca${el.attributes.href.value}`).filter(el => el.includes('/product/'))
        return data
    }, linkSelector)

    const prices = await fn.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => parseFloat(el.textContent.slice(1).replace(",", "")))
        return data
    }, priceSelector)

    const productNames = await fn.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => el.textContent)
        return data
    }, productNameSelector)

    return [images, links, prices, productNames]
}