const express = require('express')
const cors = require('cors')
const puppeteer = require('puppeteer')
const app = express()

const PORT = process.env.PORT || 5555
const Origin = process.env.Oirigin || '*'

app.use(cors({
    origin: Origin,
    methods: ['GET']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.get('/product/:productName', (req, res, next) => {
    console.log(`req.protocol = {{ ${req.protocol} }}\n req.get('host') = {{ ${req.get('host')} }}\n req.originalUrl = {{ ${req.originalUrl} }}\n req.params = {{${JSON.stringify(req.params)}}}`)
    res.json(req.params)
})


app.listen(PORT, (err) => {
    if (err) {
        console.error('error')
    } else {
        console.log(`listening to port: ${PORT}`)
    }
})