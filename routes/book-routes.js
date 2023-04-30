const express = require('express')
const Book = require('../models/Book')

const router = express.Router()

router.route('/')
    .get((req, res, next) => {
        Book.find()
            .then(books => res.json(books))
            .catch(next)
    })
    .post((req, res, next) => {
        Book.create(req.body)
            .then((book) => res.status(201).json(book))
            .catch(err => next(err))
    })
    .put((req, res) => {
        res.status(405).json({ error: "PUT request is not allowed" })
    })
    .delete((req, res, next) => {
        Book.deleteMany()
            .then(reply => res.json(reply))
            .catch(next)
    })


// Classwork implement these routes
router.route('/:book_id')
    .get((req, res, next) => {
        Book.findById(req.params.book_id)
            .then((book) => {
                if (!book) {
                    res.status(404).json({ error: 'book not found' })
                }
                res.json(book)
            })
            .catch(next)
    })
    .post((req, res) => {
        res.status(405).json({ error: 'POST request is not allowed' })
    })
    .put((req, res, next) => {
        Book.findByIdAndUpdate(
            req.params.book_id,
            { $set: req.body },
            { new: true }
        ).then(updated => res.json(updated))
            .catch(next)
    })
    .delete((req, res, next) => {
        Book.findByIdAndDelete(req.params.book_id)
            .then(reply => res.status(204).end())
            .catch(next)
    })

router.route('/:book_id/reviews')
    .get((req, res, next) => {
        Book.findById(req.params.book_id)
            .then((book) => {
                if (!book) return res.status(404).json({ error: 'book not found' })
                res.json(book.reviews)
            }).catch(next)
    })
    .post((req, res, next) => {
        Book.findById(req.params.book_id)
            .then((book) => {
                if (!book) return res.status(404).json({ error: 'book not found' })
                const review = {
                    text: req.body.text
                }
                book.reviews.push(review)
                book.save()
                    .then((book) => res
                        .status(201)
                        .json(book.reviews[book.reviews.length - 1]))
                    .catch(next)
            }).catch(next)
    })
    .put((req, res) => {
        res.status(405).json({ error: "PUT request is not allowed" })
    })
    .delete((req, res, next) => {
        Book.findById(req.params.book_id)
            .then((book) => {
                if (!book) return res.status(404).json({ error: 'book not found' })
                book.reviews = []
                book.save()
                    .then((book) => res.status(204).end())
                    .catch(next)
            }).catch(next)
    })

router.route('/:book_id/reviews/:review_id')
    .get((req, res, next) => {
        Book.findById(req.params.book_id)
            .then(book => {
                if (!book) return res.status(404).json({ error: 'book not found' })
                const review = book.reviews.id(req.params.review_id)
                if (!review) return res.status(404).json({ error: 'review not found' })
                res.json(review)
            }).catch(next)
    })
    .put((req, res, next) => {
        Book.findById(req.params.book_id)
            .then(book => {
                if (!book) return res.status(404).json({ error: 'book not found' })
                book.reviews = book.reviews.map((r) => {
                    if (r.id === req.params.review_id) {
                        r.text = req.body.text
                    }
                    return r
                })
                book.save().then(book => {
                    res.json(book.reviews.id(req.params.review_id))
                }).catch(next)
            }).catch(next)
    })
    .delete((req, res, next) => {
        Book.findById(req.params.book_id)
            .then(book => {
                if (!book) return res.status(404).json({ error: 'book not found' })
                book.reviews = book.reviews.filter((r) => {
                    return r.id !== req.params.review_id
                })
                book.save()
                    .then(book => res.status(204).end())
                    .catch(next)
            }).catch(next)
    })


module.exports = router
