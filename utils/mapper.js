async function mapper(page, ...selectors) {
  const allSelectors = [...selectors].map(async (el) => {
    const selector = await page.waitForSelector(`${el}`);
    return selector;
  });

  return allSelectors;
}

module.exports = mapper;
