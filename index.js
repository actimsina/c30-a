require('dotenv').config()
const express = require('express')
const books_routes = require('./routes/book-routes')

const port = process.env.PORT

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello Node")
})

app.use('/api/books', books_routes)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})

