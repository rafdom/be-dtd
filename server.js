const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const products = require('./routes/products')

const app = express()

const port = process.env.PORT || 5555
const origin = process.env.ORIGIN || '*'

//global middleware
app.use(morgan("tiny"))
app.use(helmet())
app.use(cors({
    origin: origin,
    methods: ['GET']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/products', products)

//erro-handlers
app.use((req, res, next) => {
    const err = new Error(`Page ${req.url} is not found!`)
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(port, (err) => {
    if (err) {
        console.error('error')
    } else {
        console.log(`listening to port: ${port}`)
    }
})