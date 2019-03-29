const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto'); /// to generate file names
const mongoose = require('mongoose');
const multer = require('multer'); // 
const GridFsStorage = require('multer-gridfs-storage');  // used to create crud 
const Grid = require('gridfs-stream');    /// badal crud 3ala schema
const methodOverride = require('method-override'); // 
const router = express.Router()


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');          // change with react later

// // Mongo URI
// const mongoURI = 'mongodb+srv://ramyGabra:Nike-1234@angrynerds-ymdpc.mongodb.net/test?retryWrites=true';

// // Create mongo connection
// const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;     ////  variable for grid fs stream

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);   /// when database coonection is open we need to fet gfs tp gtid
  gfs.collection('uploads');   // picturs will be in uploads
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



// @route POST /upload
// @desc  Uploads file to DB                                             // need to edit this to post the profile of user schema
app.post('/upload/', upload.single('file'), (req, res) => {    //26:32
  // res.json({ file: req.file });
  res.redirect('/');                            // redirects to home page , change it to whatever 
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// @route GET /files
// @desc  Display all files in JSON                  // displays all Uploded pics
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
// @desc  Display single file object
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

// @route GET /image/:filename                 ////
// @desc Display Image
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






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////DELETE/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// @route DELETE /files/:id
// @desc  Delete file
app.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.redirect('/');
  });
});

// const port = 5000;

// app.listen(port, () => console.log(`Server started on port ${port}`));


module.exports = router  /////////////// check
