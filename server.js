const express = require('express')
const cors = require('cors')
const products = require('./routes/products')
const app = express()

const PORT = process.env.PORT || 5555
const Origin = process.env.Oirigin || '*'

app.use(cors({
    origin: Origin,
    methods: ['GET']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/products', products)


app.listen(PORT, (err) => {
    if (err) {
        console.error('error')
    } else {
        console.log(`listening to port: ${PORT}`)
    }
})