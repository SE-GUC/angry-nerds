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

router.post('/InvestorPayFees',InvestorController.InvestorPayFees)
router.post('/InvestorFillForm',InvestorController.investorFillForm)









//-------------------------------Admin Routes------------------------------------------------------------
router.delete('/AdminDeleteInvestor/:id',AdminController.AdminDeleteInvestor)
router.post('/AdminRegisterLawyer',AdminController.AdminRegisterLawyer)
router.post('AdminRegisterReviewer',AdminController.AdminRegisterReviewer)

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
router.post('/lawyerFillForm',LawyerController.lawyerFillForm)









//----------------------------------------------Reviewer Routes-----------------------------------------










//-------------------------------User Routes---------------------------------------------------------
router.get('/UnregisteredViewQuestions',UserController.UnregisteredViewQuestions)

module.exports = router