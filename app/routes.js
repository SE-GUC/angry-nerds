var InvestorController = require('./Controllers/InvestorController')
const AdminController = require('./Controllers/AdminController')
const LawyerController = require('./Controllers/LawyerController')
const ReviewerController = require('./Controllers/ReviewerController')
const UserController = require('./Controllers/UserController')
const express = require('express')
var router = express.Router();


//--------------------------------Investor Routes----------------------------------------------------------

//this endpoint allows the investor to pay fees for a pending company

router.post('/InvestorPayFees',InvestorController.InvestorPayFees)
router.post('/InvestorFillForm',InvestorController.investorFillForm)
router.put('/InvestorUpdateForm/:id',InvestorController.investorUpdateForm)









//-------------------------------Admin Routes------------------------------------------------------------
router.delete('/AdminDeleteInvestor/:id',AdminController.AdminDeleteInvestor)
router.post('/AdminRegisterLawyer',AdminController.AdminRegisterLawyer)
router.post('AdminRegisterReviewer',AdminController.AdminRegisterReviewer)








//------------------------------------Lawyer Routes----------------------------------------------------
router.post('/LawyerFillForm',LawyerController.lawyerFillForm)
router.put('/LawyerUpdateForm/:id',LawyerController.lawyerUpdateForm)











//----------------------------------------------Reviewer Routes-----------------------------------------










//-------------------------------User Routes---------------------------------------------------------
router.get('/UnregisteredViewQuestions',UserController.UnregisteredViewQuestions)

module.exports = router