const express = require('express')
let books = require('./data/books')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello Node")
})

app.get('/api/books', (req, res) => {
    res.json(books)
})

app.post('/api/books', (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ error: 'title is missing' })
    }
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author || 'Anonymous'
    }
    books.push(book)
    res.status(201).json(book)
})

app.put('/api/books/:book_id', (req, res) => {
    const updated_books = books.map((b) => {
        if (b.id == req.params.book_id) {
            b.title = req.body.title
            b.author = req.body.author
        }
        return b
    })

    res.json(updated_books)
})

app.delete('/api/books/:book_id', (req, res) => {

    const updated_books = books.filter((b) => {
        if (b.id != req.params.book_id) return b
    })
    res.json(updated_books)
})

app.get('/api/books/:book_id', (req, res) => {
    const book_id = Number(req.params.book_id)
    const book = books.find((b) => b.id === book_id)
    res.json(book)
})


app.listen(3001, () => {
    console.log('Server is running at port 3001')
})

