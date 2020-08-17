module.exports = async function getProductNames(fn = {}, productNameSelector) {

    const productNames = await fn.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => el.textContent)
        return data
    }, productNameSelector)

    return productNames
}