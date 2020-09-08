async function selectorMapper(page, selectors = []) {
  for (let i = 0; i < selectors.length; i++) {
    await page.waitForSelector(`${selectors[i]}`);
  }

  return selectors;
}

module.exports = selectorMapper;
