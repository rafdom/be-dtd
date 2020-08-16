module.exports = combineProducts = async (...args) => {
    let [items] = await Promise.all([...args])
    return items
}