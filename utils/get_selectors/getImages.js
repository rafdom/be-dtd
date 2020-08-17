module.exports = async function getImages(fn = {}, imageSelector) {

    const images = await fn.evaluate((selector) => {
        const data = Array.from(document.querySelectorAll(`${selector}`), el => el.attributes.src.value)
        return data
    }, imageSelector)

    return images
}