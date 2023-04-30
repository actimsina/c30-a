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

app.use('/books', books_routes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err)
    if (err.name === 'ValidationError') res.status(400)
    else if (err.name === 'CastError') res.status(400)
    res.json({ error: err.message })
})

// Unknown Path
app.use((req, res) => {
    res.status(404).json({ error: "Path Not Found" })
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})

