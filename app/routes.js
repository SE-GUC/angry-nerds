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







//-------------------------------Admin Routes------------------------------------------------------------
router.delete('/AdminDeleteInvestor/:id',AdminController.AdminDeleteInvestor)
router.post('/AdminRegisterLawyer',AdminController.AdminRegisterLawyer)
router.post('AdminRegisterReviewer',AdminController.AdminRegisterReviewer)








//------------------------------------Lawyer Routes----------------------------------------------------









//----------------------------------------------Reviewer Routes-----------------------------------------










//-------------------------------User Routes---------------------------------------------------------

module.exports = router