const express = require('express')
const mongoose = require('mongoose')

// Require Router Handlers


const Company = require('./routes/api/Companies')
const Forms = require('./routes/api/Forms')
const investor = require('./routes/api/investor')
const Staffi = require('./routes/api/Staff')
const Cases = require('./routes/api/Cases')
const Notification = require('./routes/api/Notifications')
const questions = require('./routes/api/Questions')
const directors = require('./routes/api/BoardOfDirectors')
const Commentj = require('./routes/api/Comments')


//f
const f=require('./routes/api/f')


const app = express()

// DB Config
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

// Init middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Entry point
app.get('/', (req,res) => res.send(`<h1>Hello World!</h1>`))
app.get('/Ramy', (req,res) => res.send('<h1>Ramy test page</h1>'))

// Direct to Route Handlers

app.use('/api/Staff', Staffi)
app.use('/api/Forms', Forms)
app.use('/api/Cases', Cases)
app.use('/api/investor', investor)
app.use('/api/Notifications', Notification)
app.use('/api/Questions', questions)
app.use('/api/Companies', Company)
app.use('/api/BoardOfDirectors',directors)
app.use('/api/Comments',Commentj)


app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server on ${port}`))


f.calc_fees("5c78020ee16d4a182424d153");