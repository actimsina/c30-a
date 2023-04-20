require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const books_routes = require('./routes/book-routes')

const port = process.env.PORT

mongoose.connect('mongodb://127.0.0.1:27017/30-a-books')
    .then(() => {
        console.log('connected to mongodb database server')
    })
    .catch((err) => console.log(err))

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello Node")
})

app.use('/api/books', books_routes)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})

