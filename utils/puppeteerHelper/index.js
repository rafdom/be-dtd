const { viewportOptions } = require("../../constants");

async function selectorMapper(page, selectors) {
  for (let selector in selectors) {
    await page.waitForSelector(`${selectors[selector]}`);
  }
  return selectors;
}

async function getPage(browser, page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.setViewport(viewportOptions);
  await page.evaluate(() => {
    window.scrollBy(0, document.body.offsetHeight);
  });

  setTimeout(async () => {
    await browser.close();
  }, 25000);
}

function getProductList(name, price, link, image) {
  const list = [];
  for (let i = 0; i < name.length; i++) {
    list.push({
      productName: name[i],
      price: price[i],
      link: link[i],
      image: image[i],
    });
  }
  return list;
}

module.exports = {
  getPage,
  getProductList,
  selectorMapper,
};
