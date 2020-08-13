const express = require('express')
const cors = require('cors')
const products = require('./routes/products')
const app = express()

const port = process.env.port || 5555
const origin = process.env.Oirigin || '*'

app.use(cors({
    origin: origin,
    methods: ['GET']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/products', products)


app.listen(port, (err) => {
    if (err) {
        console.error('error')
    } else {
        console.log(`listening to port: ${port}`)
    }
})