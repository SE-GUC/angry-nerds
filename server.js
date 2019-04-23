const express = require('express')
const mongoose = require('mongoose')
const hbs = require('hbs')
const client = require('socket.io').listen('4000').sockets
const fs = require('fs')
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto'); /// to generate file names
const multer = require('multer'); // 
const GridFsStorage = require('multer-gridfs-storage');  // used to create crud 
const Grid = require('gridfs-stream');    /// badal crud 3ala schema
const methodOverride = require('method-override'); // 
const router = express.Router()


/// TEST MESSAGE "ON DEV 3.o"




// Require Router Handlers
const investor = require('./app/routes/api/Investor')
const lawyer = require('./app/routes/api/Lawyer')
const reviewer = require('./app/routes/api/Reviewer')
const UploadPic = require('./app/routes/api/uploadPic')   ////
express.static('./app/routes/api/uploadPic')


const Staffi = require('./app/routes/api/Staff')
const Cases = require('./app/routes/api/Cases')
const Notification = require('./app/routes/api/Notifications')
const questions = require('./app/routes/api/Questions')
const Commentj = require('./app/routes/api/Comments')
// const fun = require('./app/routes/api/Cases_func')
const Perform = require('./app/routes/api/Performance')
const Admin = require('./app/routes/api/Admin')
const AdminContoller = require('./app/Controllers/AdminController')



const routes = require('./app/routes.js')

// const routes = require('./app/routes.js')
// const AdminController= require('./app/Controllers/AdminController')
//AdminController.AdminChangePricingStrategy("revenues159", 10)
//console.log(Cases_func.revenue159)

global.heroku = "https://angrynerds1.herokuapp.com"


//ammar code 
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname),'client', 'build', 'index.html');
  }
)}




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
app.use(express.urlencoded({ extended: false }))


// let gfs;

// conn.once('open', () => {      ///// ????
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });




// Entry point
app.get('/', (req, res) => res.send(`<h1>Hello World!</h1>`))
app.get('/Ramy', (req, res) => res.send('<h1>Ramy test page</h1>'))
app.get('/test', (req, res) => res.sendFile(__dirname + '/views/test.html'))
app.get('/stocks', (req, res) => res.sendFile(__dirname + '/views/stocks.html'))
//app.post('/upload', upload.single('file'), InvestorController.uploadFile);


app.get('/payment', (req, res) => {
  //res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./views/payment.html', null, function (error, data) {
    if (error) {
      res.writeHead(404)
      return
    }
    else {

      res.write(data)
      return

    }
  })
})
app.get('//resetpass/:token', (req, res) => {
  var userToken = req.params.token
  fs.readFile('./views/reset_page.html', null, function (error, data) {
    if (error) {
      res.writeHead(404)
      return
    }
    else {
      //data.reset_link='resetpassword/'+userToken
      console.log(data.getElementById("reset").action)
      res.write(data)
      return
    }
  })
})

// Middleware  // for Image Upload
app.use(bodyParser.json());
app.use(methodOverride('_method'));







//Enable CORS on the express server
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Direct to Route Handlers
app.get('/chat', function (req, res) {
  res.sendFile(__dirname + '/views/chat.html');
});

app.use('/api/Staff', Staffi)
app.use('/api/uploadPic', UploadPic)   ///
app.use('/api/Cases', Cases)
app.use('/api/Investor', investor)
app.use('/api/Lawyer', lawyer)
app.use('/api/Reviewer', reviewer)
app.use('/api/Notifications', Notification)
app.use('/api/Questions', questions)
app.use('/api/Comments', Commentj)
app.use('/api/Admin', Admin)
app.use('/', routes)

app.use(express.static('./app/routes/api/uploadPic')) ////


app.use((req, res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server on ${port}`))