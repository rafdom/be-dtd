const createError = require("http-errors");
const combineProducts = require("../utils/combineProducts");
const bestBuy = require("../lib/storeScrappers/bestbuy");

module.exports = async (req, res, next) => {
  let timeout;
  (() => {
    timeout = setTimeout(() => {
      console.log("time out got called.");
      next(createError(400, `The product's name is invalid.`));
      return;
    }, 25000);
    return timeout;
  })();

  try {
    const bestBuyProducts = await bestBuy(req.params.productName);
    console.log(bestBuyProducts);
    const items = await combineProducts([bestBuyProducts, bestBuyProducts]);
    clearTimeout(timeout);
    console.log({ Total_Products: items.length });
    res.send(items);
  } catch (err) {
    next(err);
  }
};
