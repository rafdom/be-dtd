module.exports = async function getAllSelectors(fn = {}, selectors = []) {

    const images = await fn.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => el.attributes.src.value)
        return data
    }, selectors[0])

    const links = await fn.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => `https://bestbuy.ca${el.attributes.href.value}`).filter(el => el.includes('/product/'))
        return data
    }, selectors[1])

    const prices = await fn.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => parseFloat(el.textContent.slice(1).replace(",", "")))
        return data
    }, selectors[2])

    const productNames = await fn.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => el.textContent)
        return data
    }, selectors[3])

    return [images, links, prices, productNames]
}