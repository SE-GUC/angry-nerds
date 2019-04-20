const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const hbs = require('hbs')
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto'); /// to generate file names
const multer = require('multer'); // 
const GridFsStorage = require('multer-gridfs-storage');  // used to create crud 
const Grid = require('gridfs-stream');    /// badal crud 3ala schema
const methodOverride = require('method-override'); // 




const app = express()
app.set('view engine', 'hbs')




// //////////UPLOAD IMAGE TO DATABASE /////////////


// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');          // change with react later

// Create mongo connection

const mongoURI = 'mongodb+srv://ramyGabra:Nike-1234@angrynerds-ymdpc.mongodb.net/test?retryWrites=true';
const conn = mongoose.createConnection(mongoURI);

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
      res.render('test', { files: false });
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
      res.render('test', { files: files });
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
  console.log("Imhere")

    });



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


module.exports = router


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////uploading END/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////