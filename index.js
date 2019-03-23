const express = require('express')
const mongoose = require('mongoose')
const hbs = require('hbs')
const fs = require('fs')


// Require Router Handlers



const investor = require('./routes/api/Investor')
const Staffi = require('./routes/api/Staff')
const Cases = require('./routes/api/Cases')
const Notification = require('./routes/api/Notifications')
const questions = require('./routes/api/Questions')
const Commentj = require('./routes/api/Comments')
const fun = require('./routes/api/Cases_func')
const Perform = require('./routes/api/Performance')


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


app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server on ${port}`))



// Staffi.caseAproveedAtLawyer("5c93e4ae5b66b31668f0e28c")

//Staffi.staffComment("5c94f427dc1af752f81f698a","{\"text\": \"a5er test wenaby\"}","5c93c8fb1692ea457895901c")        //  function(id,text,Case,){
investor.viewMyPendingCompanies("5c7aee579c27c860c43d54b9")
// start = async function(){
//     var mins = await Perform.minsSpentLawyer("5c94f427dc1af752f81f698a")
//     return mins
    
// }

// var x = start().then(console.log())
// //var x = Perform.minsSpentLawyer("5c94f427dc1af752f81f698a")

// console.log(x)