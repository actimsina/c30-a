const express = require('express')
let books = require('../data/books')

const router = express.Router()

router.route('/')
    .get((req, res) => {
        res.json(books)
    })
    .post((req, res) => {
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
    .put((req, res) => {
        res.status(405).json({ error: "PUT request is not allowed" })
    })
    .delete((req, res) => {
        res.json({})
    })

// Classwork implement these routes
router.route('/:book_id')
    .get((req, res) => {

    })
    .post((req, res) => {
        res.status(405).json({ error: 'POST request is not allowed' })
    })
    .put((req, res) => {

    })
    .delete((req, res) => {

    })

module.exports = router

// app.post('/api/books', (req, res) => {
// })

// app.put('/api/books/:book_id', (req, res) => {
//     const updated_books = books.map((b) => {
//         if (b.id == req.params.book_id) {
//             b.title = req.body.title
//             b.author = req.body.author
//         }
//         return b
//     })

//     res.json(updated_books)
// })

// app.delete('/api/books/:book_id', (req, res) => {

//     const updated_books = books.filter((b) => {
//         if (b.id != req.params.book_id) return b
//     })
//     res.json(updated_books)
// })

// app.get('/api/books/:book_id', (req, res) => {
//     const book_id = Number(req.params.book_id)
//     const book = books.find((b) => b.id === book_id)
//     res.json(book)
// })
