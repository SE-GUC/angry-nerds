const express = require('express')
const mongoose = require('mongoose')
const hbs = require('hbs')
const fs = require('fs')


// Require Router Handlers
const investor = require('./app/routes/api/Investor')
const Staffi = require('./app/routes/api/Staff')
const Cases = require('./app/routes/api/Cases')
const Notification = require('./app/routes/api/Notifications')
const questions = require('./app/routes/api/Questions')
const Commentj = require('./app/routes/api/Comments')
const fun = require('./app/routes/api/Cases_func')
const Perform = require('./app/routes/api/Performance')
const Admin = require('./app/routes/api/Admin')
const routes = require('./app/routes.js')


global.heroku = "https://angrynerds1.herokuapp.com"

const app = express()
app.set('view engine', 'hbs')

// DB Config
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose
    .connect("mongodb+srv://ramyGabra:Nike-1234@angrynerds-ymdpc.mongodb.net/test?retryWrites=true")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

// Init middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Entry point
app.get('/', (req,res) => res.send(`<h1>Hello World!</h1>`))
app.get('/Ramy', (req,res) => res.send('<h1>Ramy test page</h1>'))

app.get('/payment',(req,res)=>{
    //res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./views/payment.html',null,function(error,data){
        if(error){
            res.writeHead(404)
            return
        }
        else{

            res.write(data)
            return

        }
            

    })
})

// Direct to Route Handlers
app.use('/api/Staff', Staffi)
app.use('/api/Cases', Cases)
app.use('/api/Investor', investor)
app.use('/api/Notifications', Notification)
app.use('/api/Questions', questions)
app.use('/api/Comments',Commentj)
app.use('/api/Admin',Admin)
app.use('/', routes)


app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server on ${port}`))
//process.on('uncaughtException',.close(),app)
