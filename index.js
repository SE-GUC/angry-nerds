const express = require('express');
const mongoose = require('mongoose');

const Questions = require('./routes/api/Cases')


const app = express()

const db = require('./config/keys').mongoURI

mongoose
    .connect(db)
    .then(()=>console.log('connected to MongoDB'))
    .catch(err => console.log(err))

app.use(express.json())

app.get('/', (req,res) => res.send(`<h1>GAFI WEBSITE!!!</h1>`))
app.get('/Monica', (req,res) => res.send(`<h1>Monica test page</h1>`))

app.use('/api/Cases', Cases)

app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server on ${port}`))