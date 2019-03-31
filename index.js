const express = require('express')
const mongoose = require('mongoose')
const hbs = require('hbs')
const client = require('socket.io').listen('4000').sockets
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
const db1 = require('./config/keys').mongoURI

// Connect to mongo
mongoose.connect('mongodb+srv://ramyGabra:Nike-1234@angrynerds-ymdpc.mongodb.net/test?retryWrites=true', function (err, db) {
    if (err) {
        throw err;
    }
    console.log('Connected to MongoDB')
    //connect to socket.io
    client.on('connection', function (socket) {
        let chat = db.collection('chats')

        //create function to send status
        sendStatus = function (s) {
            socket.emit('status', s)
        }

        //get chats from mongo collection

        chat.find().limit(100).sort({ _id: 1 }).toArray(function (err, res) {
            if (err) {
                throw err
            }

            //Emit the messages
            socket.emit('output', res)


            //handle input events

            socket.on('input', function (data) {
                let name = data.name
                let message = data.message


                //check for the name and message 
                if (name === '' || message === '') {
                    sendStatus('Please enter name and message')
                } else {
                    //insert message
                    chat.insert({ name: name, message: message }, function () {
                        client.emit('output', [data])


                        //send status object
                        sendStatus({
                            message: 'Message sent',
                            clear: true
                        });
                    });
                }

            });

            //handle clear
            socket.on('clear', function () {
                //remove all chats from collection
                chat.remove({}, function () {
                    //Emit cleared

                    socket.emit('Cleared')
                })
            })

        });

    });
});

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
app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/views/chat.html');
  });
app.use('/api/Staff', Staffi)
app.use('/api/Cases', Cases)
app.use('/api/Investor', investor)
app.use('/api/Notifications', Notification)
app.use('/api/Questions', questions)
app.use('/api/Comments',Commentj)
app.use('/api/Admin',Admin)
app.use('/routes', routes)


app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server on ${port}`))

