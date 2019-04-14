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
// const pic = require('./app/routes/api/uploadPic')   ////


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

 const mongoURI = 'mongodb+srv://ramyGabra:Nike-1234@angrynerds-ymdpc.mongodb.net/test?retryWrites=true';
 const conn = mongoose.createConnection(mongoURI);
// let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// // Create storage engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       const filename = file.originalname;
//       const fileInfo = {
//         filename: filename,
//         bucketName: 'uploads'
//       };
//       resolve(fileInfo);
//     });
//   }
// });
// const upload = multer({ storage });




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



// //////////UPLOAD IMAGE TO DATABASE /////////////


// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');          // change with react later

// Create mongo connection

// Init gfs
let gfs;     ////  variable for grid fs stream

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);   /// when database coonection is open we need to fet gfs tp gtid
  gfs.collection('uploads');   // picturs will be in uploads   'uploads da el collection name'
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////uploading/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });    // uploading to database        

// @route GET /
// @desc Loads form
app.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('index', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('index', { files: files });
    }
  });
});

// @route POST /upload       
// @desc  Uploads file to DB                                             // need to edit this to post the profile of user schema
app.post('/upload/:id', upload.single('file'), async (req, res) => {    // file is the name of the file field from the HTML doc 
  try {
    const id = req.file.filename // id of picture
    const incID= "5cabb438c2f6c432a8e244ca"
    const investor = await Investor.findByIdAndUpdate(incID, { 'photoID': id,  })    //   putting the photo id in schema
  
   
    
        res.json({ msg: 'Form updated successfully', data: investor })
   
    }
    catch (error) {
         console.log(error)
        
    }
  //    const newInvestor = await Investor.findById(id)
  //const inv = JSON.stringify(investor.photoID)
  // const json = JSON.stringify(investor);

  //res.status(200).json({data: 'Success' })


  // res.json({ file: req.file.filename });     /// id el pic el hayroo7 el schema " make it a global variable ?"  findbyidandupdate
  //res.json( {id: investor._id} );     /// id el pic el hayroo7 el schema " make it a global variable ?"  findbyidandupdate

  //console.log("Imhere")

  //   res.redirect('/');                            // redirects to home page , change it to whatever 
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////uploading END/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// @route GET /files
// @desc  Display all files in JSON                     // displays all Uploded pics as querys from mongo db atlas
app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

//Enable CORS on the express server
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// @route GET /files/:filename
// @desc  Display single file object                        /// display query results from mongodb atlas
app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});

// @route GET /image/:filename                                ///// to be able to retrive image using filename  "take file name from investor,"
// @desc Display Image                     to see uploaded pic   /// http://localhost:3000/image/9f2afd767a8c1dd18de66671eeb5ea33.jpg  :)
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});


// ///////////END OF UPLOADING image to database/////////////

//Enable CORS on the express server
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use('/api/Staff', Staffi)
// app.use('/api/uploadPic', pic)   ///
app.use('/api/Cases', Cases)
app.use('/api/Investor', investor)
app.use('/api/Lawyer', lawyer)
app.use('/api/Reviewer', reviewer)
app.use('/api/Notifications', Notification)
app.use('/api/Questions', questions)
app.use('/api/Comments', Commentj)
app.use('/api/Admin', Admin)
app.use('/', routes)

app.use((req, res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server on ${port}`))