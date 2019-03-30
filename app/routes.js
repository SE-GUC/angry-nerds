var InvestorController = require('./Controllers/InvestorController')
const AdminController = require('./Controllers/AdminController')
const LawyerController = require('./Controllers/LawyerController')
const ReviewerController = require('./Controllers/ReviewerController')
const UserController = require('./Controllers/UserController')
const express = require('express')
var router = express.Router();
var fs  = require('fs');



//--------------------------------Investor Routes----------------------------------------------------------

//this endpoint allows the investor to pay fees for a pending company
router.post('/InvestorPayFees', InvestorController.InvestorPayFees)






//-------------------------------Admin Routes------------------------------------------------------------

router.post('/forgotpassword', AdminController.forgotpassword)

router.post('/resetpassword/:token', AdminController.resetpassword)

router.get('/resetpass/:token',(req,res)=>{
    var userToken =  req.params.token
    fs.readFile('../views/reset_page',null,function(error,data){
        if(error){
            res.writeHead(404)
            return
        }
        else{
            data.reset_link.action='routes/resetpassword/'+userToken
            res.write(data)
            return
        }
    })
})







//------------------------------------Lawyer Routes----------------------------------------------------









//----------------------------------------------Reviewer Routes-----------------------------------------










//-------------------------------User Routes---------------------------------------------------------

module.exports = router