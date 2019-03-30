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




//this endpoint allows investor to view his company fees
router.get('/InvestorViewFees', InvestorController.InvestorViewFees)




//-------------------------------Admin Routes------------------------------------------------------------
router.put('/AdminEditCompany/:id', AdminController.AdminEditCompany)
router.delete('/AdminDeleteInvestor/:id',AdminController.AdminDeleteInvestor)
router.post('/AdminRegisterLawyer',AdminController.AdminRegisterLawyer)
router.post('AdminRegisterReviewer',AdminController.AdminRegisterReviewer)
router.delete('/AdminDeleteLawyer/:id',AdminController.AdminDeleteLawyer)








//------------------------------------Lawyer Routes----------------------------------------------------
router.post('/lawyerFillForm',LawyerController.lawyerFillForm)









//----------------------------------------------Reviewer Routes-----------------------------------------










//-------------------------------User Routes---------------------------------------------------------
router.get('/UnregisteredViewQuestions',UserController.UnregisteredViewQuestions)

module.exports = router