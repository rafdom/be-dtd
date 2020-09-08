const puppeteer = require("puppeteer");
const {
  bestBuy: { selectors, url },
  viewportOptions,
} = require("../../constants");
const allBestBuySelectors = require("../getSelectors/bestBuy_Selectors.js");
const selectorMapper = require("../selectorMapper");
const getProductList = require("../getProductList");

const bestBuyScrapper = async function (item) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url(item), { waitUntil: "domcontentloaded" });
  await page.setViewport(viewportOptions);
  await page.evaluate(() => {
    window.scrollBy(0, document.body.offsetHeight);
  });

  setTimeout(() => {
    browser.close();
  }, 25000);

  await selectorMapper(page, [
    selectors.productNameSelector,
    selectors.priceSelector,
    selectors.linkSelector,
    selectors.imageSelector,
  ]);

  const [images, links, prices, productNames] = await allBestBuySelectors(
    page,
    selectors
  );

  browser.close();

  const products = getProductList(productNames, prices, links, images);

  return { products };
};

module.exports = { bestBuyScrapper };
