module.exports = async function getLinks(fn = {}, linkSelector) {

    const links = await fn.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => `https://bestbuy.ca${el.attributes.href.value}`).filter(el => el.includes('/product/'))
        return data
    }, linkSelector)

    return links
}