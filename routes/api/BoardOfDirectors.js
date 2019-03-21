 const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// var express = require('express');         ////////////
// var app = express();                      ///////////
// var bodyParser = require('body-parser');  ////////////



// const Board = require('../../models/BoardOfDirectors')
// const validator = require('../../Validations/boardValidations')

router.get('/', async (req,res) => {   //get all board's directors
    const directors = await Board.find()
    res.json({data: directors})
})
// ////////////////////////TRESTING ////////////////////////

// //configure body-parser for express
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());


// //allow express to access our html (index.html) file
// app.get('/index.html', function(req, res) {
//         res.sendFile(__dirname + "/" + "index.html");
//     });

// //route the GET request to the specified path, "/user". 
// //This sends the user information to the path  
// app.post('/user', function(req, res){
//         response = {
//             companyID : req.body.companyID,
//             firstName : req.body.firstName,
//             middleName: req.body.middleName,
//             nationality :  req.body.nationality,
//             gender :  req.body.gender,
//             birthdate :  req.body.birthdate,
//             ssid :  req.body.ssid,
//             idType :  req.body.idType,
//             investorType :  req.body.investorType,
//             address :  req.body.address,
//             position :  req.body.position


//             };
        
//         //this line is optional and will print the response on the command prompt
//         //It's useful so that we know what infomration is being transferred 
//         //using the server
//         console.log(response);
        
//         //convert the response in JSON format
//         res.end(JSON.stringify(response));
//     });

// //This piece of code creates the server  
// //and listens to the request at port 8888
// //we are also generating a message once the 
// //server is created
// var server = app.listen(8888, function(){
//         var host = server.address().address;
//         var port = server.address().port;
//         console.log("Example app listening at http://%s:%s", host, port);
//     });



// /////////////////////   end of testing//////////////////////////

//get a specific director according to his id
router.get('/:id', async (req,res) => {
    try{
        const id = req.params.id
     const director = await Board.findById(id)
     //if(!director) return res.status(404).send({error: 'The specified director does not exist'})
    res.json({data: director})
    }
    catch(error){
        console.log(error)
       }
})





router.post('/', async (req,res) => {  // add a new director to the board
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newDirector = await Board.create(req.body)
    res.json({msg:'The new Director was created successfully', data: newDirector})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

// Update  the board
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     console.log(id)
     const director = await Board.findById(id)
     if(!director) return res.status(404).send({error: 'The specified director does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedDirector = await Board.findByIdAndUpdate(id, req.body)
     res.json({msg: 'Director updated successfully', data: updatedDirector} )
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedDirector = await Board.findByIdAndRemove(id)
     res.json({msg:'The specified director was deleted successfully', data: deletedDirector})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 

module.exports = router