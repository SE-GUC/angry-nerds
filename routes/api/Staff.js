const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Staff = require('../../models/Staff')
const Case = require('../../models/Cases')
const staff_functions = require('./Staff.js')
// const validator = require('../../validations/staffValidations')


global.investor_id = ""

router.get('/', async (req,res) => {
    const staffi = await Staff.find()
    res.json({data: staffi})
})
router.get('/:id', async (req,res) => {
    const id = req.params.id
    const staffi = await Staff.findById(id)
    res.json({data: staffi})
})
// make a functioin to call the get method in casses


var request = require('request');


//As a staff I should be able view a list of my cases assigned to me
router.showForLawyer =  function(id){

    var clientServerOptions = {

        uri: global.heroku + '/api/Cases',
        body: "",
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions,  function (error, response) {
               
        var data = JSON.parse(response.body).data

        var text = "{ \"data\": ["
        console.log(data.length)
        for(let i=0;i<data.length-1;i++){
            if(data[i].caseStatus === "lawyer" && data[i].lawyerID === id ){
                text += (JSON.stringify(data[i]) + ",")
            }
        }
        if(data.length>0){
            if(data[data.length-1].caseStatus === "lawyer" && data[data.length-1].lawyerID === id ){
                text += (JSON.stringify(data[data.length-1]))
            }
        }
        text += "] }"
        var obj = JSON.parse(text);
        console.log(obj)

        return obj;
    });
}

router.showForReviewer =  function(id){

    var clientServerOptions = {

        uri: global.heroku + '/api/Cases',
        body: "",
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions,  function (error, response) {
               
        var data = JSON.parse(response.body).data

        var text = "{ \"data\": ["
        console.log(data.length)
        for(let i=0;i<data.length-1;i++){
            if(data[i].caseStatus === "reviewer" && data[i].reviewerID === id ){
                text += (JSON.stringify(data[i]) + ",")
            }
        }
        if(data.length>0){
            if(data[data.length-1].caseStatus === "reviewer" && data[data.length-1].reviewerID === id ){
                text += (JSON.stringify(data[data.length-1]))
            }
        }
        text += "] }"
        var obj = JSON.parse(text);
        console.log(obj)

        return obj;
    });
}

////////////As a Staff I should be able to approve and reject cases assigned to me////////////

router.caseDisAproveedAtLawyer =  function(id){                                   /// COMMENT

    // var dec = "null"

    var clientServerOptions = {   /// assume en caseStatus was lawyer
        uri: global.heroku + '/api/Cases/' + id,
        body: "{\"caseStatus\": \"null\"}",
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, function(error, response){


        console.log(error,response)
    })

     ;
}

router.caseAproveedAtLawyer =  function(id){
    // var dec = "reviewer";
    
    
        var clientServerOptions = {   /// assume en caseStatus was lawyer
            uri: global.heroku + '/api/Cases/' + id,
            body: "{\"caseStatus\": \"reviewer\"}",
            method: 'PUT',
            headers: {
                  'Content-Type': 'application/json'
            }
            
        }
        request(clientServerOptions, function(error, response){
            console.log(error,response)
        })
    
         ;
    }

    router.caseDisAprovesAtReviewr =  function(id){
        // var dec = "lawyer"
        
        
            var clientServerOptions = {   /// assume en caseStatus was reviewer
                uri: global.heroku + '/api/Cases/' + id,
                body: "{\"caseStatus\": \"lawyer\"}",
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(clientServerOptions, function(error, response){
        
            })
        
             ;
        }

        router.caseAprovesAtReviewr =  function(id){
            // var dec = "pending"
            
            
                var clientServerOptions = {   /// assume en caseStatus was reviewer
                    uri: global.heroku + '/api/Cases/' + id,
                    body: "{\"caseStatus\": \"pending\"}",
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                request(clientServerOptions, function(error, response){
            
                })
            
                 ;
            }


  ///////////////////// As a Staff I should be able to view and comment on cases assigned to me/////////////////#endregion


  router.staffComment =  function(id,text,caseID){

    var commentArray = []

    

    //get ALL CASES 
    var clientServerOptions1 = {

        uri: global.heroku + '/api/Cases/' + caseID,
        body: "",
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions1,  function (error, response) {
               
        
        var data = JSON.parse(response.body).data

        commentArray = data.comment
        console.log(commentArray)
        commentArray.push(JSON.parse(text))
       // console.log(JSON.stringify("{"+commentArray+"}"))

        var com = {comment: commentArray} 
       // com.put("comment",commentArray.toString)

        var clientServerOptions2 = {

            uri: global.heroku + '/api/Cases/' + caseID,
            body: JSON.stringify(com),
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        request(clientServerOptions2,  function (error, response) {
           // console.log(error, response)
        });

        return ;
    });

    console.log("hello world")
    
}


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Create a staff
router.post('/', async (req,res) => {
   try {
    // const isValidated = validator.createValidation(req.body)
    // if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newStaff = await Staff.create(req.body)
    res.json({msg:'Staff was created successfully', data: newStaff})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

// Update a staff
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const staff = await Staff.findById(id)
     if(!staff) return res.status(404).send({error: 'Staff does not exist'})
    //  const isValidated = validator.updateValidation(req.body)
    //  if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedStaff = await Staff.findByIdAndUpdate(id,req.body)
     res.json({msg: 'Staff updated successfully'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedStaff = await Staff.findByIdAndRemove(id)
     res.json({msg:'Staff was deleted successfully', data: deletedStaff})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.get('/StfViewing/:id', async (req, res)=>{
    const idf = "5c77c2b0c5973234f492f33e"
     const Invs = await Investor.findById(idf)
     const stf = await Staff.findById(idf)
    if ( stf || Invs)
    var proj = {"_id": 0 , "password": 0}
    else
    var proj = {"_id":0, "firstName": 1,  "MiddleName" : 1,  "LastName":1,  "Nationality": 1 ,"Address": 1 ,"birthdate" :1  ,"telephone_number": 1 ,"gender":1};
    
   try{
       const id = req.params.id
        const Staf = await Staff.findById(id,proj)
        res.json({data: Staf})
   } 
   catch(error){
    console.log(error)
   }
})

router.changePassword =  function(id,password){

    var clientServerOptions = {

        uri: global.heroku + '/api/Staff/' +id,
        body: "{\"password\":" +password+ "}",
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions,  function (error, response) {
               
        console.log(error,response)
    });
}

router.viewMyNotifications =  function(id){

    var clientServerOptions = {

        uri: gloabl.heroku + '/api/Notifications',
        body: "",
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions,  function (error, response) {
               
        var data = JSON.parse(response.body).data

        var text = "{ \"data\": ["
        var flag = false
        console.log(data.length)
        for(let i=0;i<data.length-1;i++){
            if(data[i].receiverStaff === id){
                text += (JSON.stringify(data[i]) + ",")
                flag = true
            }
        }
        if(data.length>0){
            if(data[data.length-1].receiverStaff === id){
                text += (JSON.stringify(data[data.length-1]))
                text += "] }"
            }
            else{
                console.log("Im here");
                if(flag){
                    text = text.substring(0,text.length-1)
                }    
                text += "] } "
            }
        }
        var obj = JSON.parse(text);
        console.log(obj)

        return obj;
    });
}   


module.exports = router
