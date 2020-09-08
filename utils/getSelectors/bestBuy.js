module.exports = async function allBestBuySelectors(
  page,
  { productNameSelector, priceSelector, linkSelector, imageSelector }
) {
  const images = await page.evaluate((selector) => {
    const data = Array.from(
      document.querySelectorAll(`${selector}`),
      (el) => el.attributes.src.value
    );
    return data;
  }, imageSelector);

  const links = await page.evaluate((selector) => {
    const data = Array.from(
      document.querySelectorAll(`${selector}`),
      (el) => `https://bestbuy.ca${el.attributes.href.value}`
    ).filter((el) => el.includes("/product/"));
    return data;
  }, linkSelector);

  const prices = await page.evaluate((selector) => {
    const data = Array.from(document.querySelectorAll(`${selector}`), (el) =>
      parseFloat(el.textContent.slice(1).replace(",", ""))
    );
    return data;
  }, priceSelector);

  const productNames = await page.evaluate((selector) => {
    const data = Array.from(
      document.querySelectorAll(`${selector}`),
      (el) => el.textContent
    );
    return data;
  }, productNameSelector);

  return [images, links, prices, productNames];
};
