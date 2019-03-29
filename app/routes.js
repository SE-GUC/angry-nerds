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


router.put('/InvestorChangePassword/:id',InvestorController.investorChangePassword)
router.get('/InvestorMyNotifications/:id',InvestorController.investorMyNotifications)
router.get('/ViewPublishedCompanies/:id',InvestorController.viewMyPublishedCompanies)
router.get('/ViewPendingCompanies/:id',InvestorController.viewMyPendingCompanies)
router.get('/generatePdf/:id',InvestorController.generatePdf)



//-------------------------------Admin Routes------------------------------------------------------------
router.put('/AdminEditCompany/:id', AdminController.AdminEditCompany)
router.delete('/AdminDeleteInvestor/:id',AdminController.AdminDeleteInvestor)
router.post('/AdminRegisterLawyer',AdminController.AdminRegisterLawyer)
router.post('AdminRegisterReviewer',AdminController.AdminRegisterReviewer)

router.put('/AdminChangePassword/:id',AdminController.adminChangePassword)






//------------------------------------Lawyer Routes----------------------------------------------------
router.post('/lawyerFillForm',LawyerController.lawyerFillForm)

router.put('/LawyerChangePassword/:id',LawyerController.lawyerChangePassword)
router.get('/LawyerMyNotifications/:id',LawyerController.lawyerMyNotifications)








//----------------------------------------------Reviewer Routes-----------------------------------------


router.put('/ReviewerChangePassword/:id',ReviewerController.reviewerChangePassword)
router.get('/ReviewerMyNotifications/:id',ReviewerController.reviewerMyNotifications)








//-------------------------------User Routes---------------------------------------------------------
router.get('/UnregisteredViewQuestions',UserController.UnregisteredViewQuestions)

module.exports = router