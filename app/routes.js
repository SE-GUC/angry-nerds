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
router.get('/InvestorViewComment',InvestorController.investorViewComment)





//this endpoint allows investor to view his company fees
router.get('/InvestorViewFees', InvestorController.InvestorViewFees)




//-------------------------------Admin Routes------------------------------------------------------------
router.post('/AdminRegisterLawyer',AdminController.AdminRegisterLawyer)
router.post('AdminRegisterReviewer',AdminController.AdminRegisterReviewer)
router.get('/AdminViewComment',AdminController.adminViewComment)

router.post('/AdminRegisterAdmin',AdminController.AdminRegisterAdmin)
router.put('/AdminEditCompany/:id', AdminController.AdminEditCompany)
router.delete('/AdminDeleteInvestor/:id',AdminController.AdminDeleteInvestor)
router.delete('/AdminDeleteAdmin/:id',AdminController.AdminDeleteAdmin)








//------------------------------------Lawyer Routes----------------------------------------------------
router.post('/LawyerFillForm',LawyerController.lawyerFillForm)
router.put('/LawyerUpdateForm/:id',LawyerController.lawyerUpdateForm)
router.get('/LawyerViewComment',LawyerController.lawyerViewComment)













//----------------------------------------------Reviewer Routes-----------------------------------------










//-------------------------------User Routes---------------------------------------------------------
router.get('/UnregisteredViewQuestions',UserController.UnregisteredViewQuestions)

module.exports = router