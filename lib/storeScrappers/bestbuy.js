const puppeteer = require("puppeteer");
const {
  bestBuy: { selectors, url },
} = require("../../constants");
const {
  getPage,
  getProductList,
  selectorMapper,
} = require("../../utils/puppeteerHelper");
const allBestBuySelectors = require("../../utils/getSelectors/bestBuy");

const bestBuy = async (item) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await getPage(browser, page, url(item));
  await selectorMapper(page, selectors);
  const [images, links, prices, productNames] = await allBestBuySelectors(
    page,
    selectors
  );
  await browser.close();
  const products = getProductList(productNames, prices, links, images);
  return { products };
};

module.exports = bestBuy;
