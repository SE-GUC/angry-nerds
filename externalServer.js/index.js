const express = require('express')
const app = express()
app.use(express.json())

app.post('/api/externalCompany/', (req, res) => {
    const title = req.body.title
    const author = req.body.author
    const numberOfPages = req.body.numberOfPages
    const releaseYear = req.body.releaseYear
    
    const book = {
        title: title,
        author: author,
        numberOfPages: numberOfPages,
        releaseYear: releaseYear,
        id: books.length + 1
    }
    books.push(book)
    res.send(books)
})