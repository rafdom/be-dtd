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

module.exports = getProductList;
