const puppeteer = require("puppeteer");
const {
  bestBuy: { selectors, url },
  viewportOptions,
} = require("../../constants");
const allBestBuySelectors = require("../getSelectors/bestBuy_Selectors.js");
const mapper = require("../mapper");

const bestBuyScrapper = async function (item) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url(item), { waitUntil: "networkidle2" });
  await page.setViewport(viewportOptions);
  await page.evaluate(() => {
    window.scrollBy(0, document.body.offsetHeight);
  });

  setTimeout(() => {
    browser.close();
  }, 25000);

  await mapper(
    page,
    selectors.productNameSelector,
    selectors.productNameSelector,
    selectors.priceSelector,
    selectors.linkSelector,
    selectors.imageSelector
  );

  const [images, links, prices, productNames] = await allBestBuySelectors(
    page,
    selectors
  );

  browser.close();

  const products = [];

  for (let i = 0; i < productNames.length; i++) {
    products.push({
      productName: productNames[i],
      price: prices[i],
      link: links[i],
      image: images[i],
    });
  }

  return { products };
};

module.exports = { bestBuyScrapper };
