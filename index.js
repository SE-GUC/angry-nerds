const express = require('express');
const mongoose = require('mongoose');


const directors = require('./routes/api/BoardOfDirectors')


const app = express()

const db = require('./config/keys').mongoURI

mongoose
    .connect(db)
    .then(()=>console.log('connected to MongoDB'))
    .catch(err => console.log(err))

app.use(express.json())

app.get('/', (req,res) => res.send(`<h1>GAFI WEBSITE!!!</h1>`))
app.get('/test', (req,res) => res.send(`<h1>Hello Sara</h1>`))


app.use('/api/directors', directors)


app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server on ${port}`))