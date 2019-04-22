var InvestorController = require('./Controllers/InvestorController')
const AdminController = require('./Controllers/AdminController')
const LawyerController = require('./Controllers/LawyerController')
const ReviewerController = require('./Controllers/ReviewerController')
const UserController = require('./Controllers/UserController')
const express = require('express')
var router = express.Router();



//--------------------------------Investor Routes----------------------------------------------------------

//this endpoint allows the investor to pay fees for a pending company
router.post('/InvestorPayFees' , InvestorController.InvestorPayFees)
router.post('/InvestorFillForm',InvestorController.investorFillForm)
router.put('/InvestorUpdateForm/:id', InvestorController.investorUpdateForm)
router.put('/InvestorEditProfile',InvestorController.InvestorEditProfile)
router.get('/InvestorViewComment',InvestorController.investorViewComment)
router.get('/InvestorViewProfile',InvestorController.investorViewProfile)
router.get('/CalcFeesImmediately/:lawNumber/:capital',InvestorController.CalcFeesImmediately) 



//this endpoint allows investor to view his company fees
router.get('/InvestorViewFees', InvestorController.InvestorViewFees)
router.put('/InvestorChangePassword/:id',InvestorController.investorChangePassword)
router.get('/InvestorMyNotifications/:id',InvestorController.investorMyNotifications)
router.get('/viewMyPublishedCompanies',InvestorController.viewMyPublishedCompanies)
router.get('/viewMyPendingCompanies',InvestorController.viewMyPendingCompanies)
router.get('/generatePdf/:id',InvestorController.generatePdf)
router.get('/InvestorViewingPublishedCompanies', InvestorController.InvestorViewingPublishedCompanies)
router.get('/InvestorViewingCompany/:id', InvestorController.InvestorViewingCompany)
router.get('/InvestorViewing/:id', InvestorController.InvestorViewing)
router.post('/InvestorRateLawyer/:id', InvestorController.InvestorRateLawyer)


//-------------------------------Admin Routes------------------------------------------------------------
router.get('/AdminViewComment', AdminController.adminViewComment)
router.post('/AdminRegisterAdmin', AdminController.AdminRegisterAdmin)
router.put('/AdminEditCompany/:id', AdminController.AdminEditCompany)
router.delete('/AdminDeleteInvestor/:id', AdminController.AdminDeleteInvestor)
router.post('/AdminRegisterLawyer', AdminController.AdminRegisterLawyer)
router.post('/AdminRegisterReviewer', AdminController.AdminRegisterReviewer)
router.delete('/AdminDeleteLawyer/:id', AdminController.AdminDeleteLawyer)
router.delete('/AdminDeleteReviewer/:id', AdminController.AdminDeleteReviewer)
router.delete('/AdminDeleteAdmin/:id', AdminController.AdminDeleteAdmin)
router.put('/AdminChangePricingStrategy/:id', AdminController.AdminChangePricingStrategy)
router.get('/AdminViewingPublishedCompanies', AdminController.AdminViewingPublishedCompanies)
router.get('/AdminViewingCompany/:id', AdminController.AdminViewingCompany)
router.get('/AdminViewing/:id', AdminController.AdminViewing)
router.delete('/AdminDeleteQuestion/:id', AdminController.AdminDeleteQuestion)
router.delete('/AdminDeleteCase/:id', AdminController.AdminDeleteCase)
router.get('/AdminViewLawyersLeaderBoard', AdminController.adminViewLawyersLeaderBoard)
router.get('/AdminViewReviewersLeaderBoard', AdminController.adminViewReviewersLeaderBoard)
router.put('/AdminAnswerQuestions',AdminController.AdminAnswerQuestions)


router.put('/AdminChangePassword/:id', AdminController.adminChangePassword)
router.post('/AdminCreateNewLaw', AdminController.AdminCreateNewLaw)
router.put('/AdminAssignLawyer',AdminController.AdminAssignLawyer)
router.put('/AdminAssignReviewer',AdminController.AdminAssignReviewer)
router.post('/SendAttachmentMail', AdminController.SendAttachmentMail)
router.post('/addFormType', AdminController.addFormType)
router.get('/getFormType/:formName', AdminController.getFormType)
router.get('/getAllFormTypes', AdminController.getAllFormTypes)
router.delete('/deleteFormType/:formName', AdminController.deleteFormType)

router.get('/calculateFees/:id', AdminController.SystemCalcFees)
router.post('/AdminCreateFormType', AdminController.AdminCreateFormType)
router.delete('/AdminDeleteFormType/:id', AdminController.AdminDeleteFormType)
router.get('/AdminFindFormType', AdminController.AdminFindFormType)
router.get('/AdminFindFormType/:id', AdminController.AdminFindFormTypeID)

//------------------------------------Lawyer Routes----------------------------------------------------
router.post('/LawyerFillForm', LawyerController.lawyerFillForm)
router.put('/LawyerUpdateForm/:id', LawyerController.lawyerUpdateForm)
router.get('/LawyerViewComment', LawyerController.lawyerViewComment)
router.get('/LawyerViewLawyersLeaderBoard', LawyerController.lawyerViewLawyersLeaderBoard)
router.get('/LawyerViewReviewersLeaderBoard', LawyerController.lawyerViewReviewersLeaderBoard)
router.put('/LawyerChangePassword/:id', LawyerController.lawyerChangePassword)
router.get('/LawyerMyNotifications/:id', LawyerController.lawyerMyNotifications)

// router.post('/lawyerWriteComment',LawyerController.lawyerComment)

//------------------------------------Lawyer Routes----------------------------------------------------


router.put('/caseDisAproveedAtLawyer/:idCase', LawyerController.authenticate ,LawyerController.caseDisAproveedAtLawyer)
router.put('/caseAproveedAtLawyer/:idCase',LawyerController.authenticate ,LawyerController.caseAproveedAtLawyer)
router.get('/viewCasesLawyer',  LawyerController.viewCasesLawyer)
router.get('/LawyerViewingPublishedCompanies', LawyerController.LawyerViewingPublishedCompanies)
router.get('/lawyerOpenCase/:id', LawyerController.lawyerOpenCase)
router.get('/lawyerCloseCase/:id', LawyerController.lawyerCloseCase)
router.get('/LawyerViewing/:id', LawyerController.LawyerViewing)
router.get('/LawyerViewingCompany/:id', LawyerController.LawyerViewingCompany)



//----------------------------------------------Reviewer Routes-----------------------------------------
router.put('/ReviewerChangePassword/:id',ReviewerController.reviewerChangePassword)
router.get('/ReviewerMyNotifications/:id',ReviewerController.reviewerMyNotifications)
router.get('/ReviewerViewLawyersLeaderBoard',ReviewerController.reviewerViewLawyersLeaderBoard)
router.get('/ReviewerViewingPublishedCompanies', ReviewerController.ReviewerViewingPublishedCompanies)
router.get('/ReviewerViewingCompany/:id', ReviewerController.ReviewerViewingCompany)
router.get('/ReviewerViewing/:id', ReviewerController.ReviewerViewing)
router.get('/ReviewerOpenCase/:id', ReviewerController.ReviewerOpenCase)
router.get('/ReviewerCloseCase/:id', ReviewerController.ReviewerCloseCase)
router.put('/caseAproveedAtReviewer/:idCase', ReviewerController.caseAproveedAtreviewer)// fix this
router.put('/caseDisAproveedAtReviewer/:idCase', ReviewerController.caseDisAproveedAtReviewer)
router.get('/viewCasesReviewer/', ReviewerController.viewCasesReviewer)
router.get('/ReviewerViewReviewersLeaderBoard',ReviewerController.reviewerViewReviewersLeaderBoard)



//-------------------------------User Routes---------------------------------------------------------
router.get('/UnregisteredViewQuestions',UserController.UnregisteredViewQuestions)
router.get('/UnregisteredViewLawyers',UserController.viewLawyers)
router.get('/UnregisterViewingPublishedCompanies', UserController.UnregisterViewingPublishedCompanies)
router.get('/UnregisterViewingCompany/:id', UserController.UnregisterViewingCompany)
router.get('/UnregisterViewing/:id', UserController.UnregisterViewing)
router.post('/login', UserController.Login)
router.post('/register', UserController.register)
router.put('/verify/:tok', UserController.verify)
router.get('/UserViewLaws', UserController.UserViewLaws)
router.post('/MakeQuestion',UserController.makeQuestion)
router.put('/forgotpassword', UserController.forgotPassword)
router.put('/resetpassword/:tok', UserController.resetPassword)



//--------------------------------------------------done
module.exports = router