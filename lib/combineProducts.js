module.exports = combineProducts = async (...args) => {
    try {
        let [response] = await Promise.allSettled([...args])
        let value = response.value.map(el => el.products).reduce((acc, cur) => {
            return [...acc, ...cur]
        }, [])
        return value
    } catch (err) {
        throw new Error(err)
    }
}