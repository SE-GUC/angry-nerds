//1. Load the mongoose driver
var mongooseDrv = require("mongoose");
//4. The Path object
var path = require("path");   /// 
//5. The grid-stream
var grid = require("gridfs-stream");    //  to stream fikes to and from mongo
//6. The File-System module
var fs = require("fs");

//7.Read the video/image file from the videoread folder
    var filesrc = path.join(__dirname, "./filestoread/bird.png");   //used to read path of photo .... put it in a get function ?
    //8. Establish connection between Mongo and GridFS
    Grid.mongo = mongooseDrv.mongo;
    //9.Open the connection and write file
    connection.once("open", () => {
        console.log("Connection Open");
        var gridfs = grid(connection.db);       /// to acces the GridFs object over the mongoDB connection 
        if (gridfs) {
            //9a. create a stream, this will be
            //used to store file in database
            var streamwrite = gridfs.createWriteStream({
                //the file will be stored with the name
                filename: "bird.png"
            });
            //9b. create a readstream to read the file
            //from the filestored folder
            //and pipe into the database
            fs.createReadStream(filesrc).pipe(streamwrite);
            //9c. Complete the write operation
            streamwrite.on("close", function (file) {
                console.log("Write written successfully in database");
            });
        } else {
            console.log("Sorry No Grid FS Object");
        }
    });

console.log("done");