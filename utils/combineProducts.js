module.exports = combineProducts = async (...args) => {
  try {
    const [response] = await Promise.allSettled([...args]);
    const value = response.value.reduce((acc, cur) => {
      return [...acc, ...cur.products];
    }, []);
    return value;
  } catch (err) {
    throw new Error(err);
  }
};
