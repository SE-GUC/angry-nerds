var InvestorController = require('./Controllers/InvestorController')
const AdminController = require('./Controllers/AdminController')
const LawyerController = require('./Controllers/LawyerController')
const ReviewerController = require('./Controllers/ReviewerController')
const UserController = require('./Controllers/UserController')
const express = require('express')
var router = express.Router();



//--------------------------------Investor Routes----------------------------------------------------------

router.post('/InvestorPayFees' , InvestorController.authenticate , InvestorController.InvestorPayFees) 
router.post('/InvestorFillForm',InvestorController.authenticate ,InvestorController.investorFillForm)
router.put('/InvestorUpdateForm/:id',InvestorController.authenticate , InvestorController.investorUpdateForm)
router.put('/InvestorEditProfile',InvestorController.authenticate ,InvestorController.InvestorEditProfile)
router.get('/InvestorViewProfile',InvestorController.authenticate,InvestorController.investorViewProfile)
router.get('/CalcFeesImmediately/:lawNumber/:capital',InvestorController.CalcFeesImmediately)
router.get('/InvestorViewFees',InvestorController.authenticate, InvestorController.InvestorViewFees)
router.get('/InvestorMyNotifications/:id',InvestorController.authenticate , InvestorController.investorMyNotifications)
router.get('/viewMyPublishedCompanies',InvestorController.authenticate,InvestorController.viewMyPublishedCompanies)
router.get('/viewMyPendingCompanies',InvestorController.authenticate,InvestorController.viewMyPendingCompanies)
router.get('/generatePdf/:id',InvestorController.authenticate,InvestorController.generatePdf)
//this endpoint allows the investor to pay fees for a pending company



//this endpoint allows investor to view his company fees
router.get('/InvestorViewingPublishedCompanies', InvestorController.InvestorViewingPublishedCompanies)
router.get('/InvestorViewingCompany/:id', InvestorController.InvestorViewingCompany)
router.post('/InvestorRateLawyer/:id', InvestorController.authenticate, InvestorController.InvestorRateLawyer)
//router.get('/InvestorViewComment',InvestorController.authenticate ,InvestorController.investorViewComment)
//router.get('/InvestorViewing/:id', InvestorController.InvestorViewing)
// router.put('/InvestorChangePassword/:id',InvestorController.investorChangePassword)


//-------------------------------Admin Routes------------------------------------------------------------
// router.get('/AdminViewComment', AdminController.adminViewComment)
router.post('/AdminRegisterAdmin',AdminController.authenticate, AdminController.AdminRegisterAdmin)
router.put('/AdminEditCompany/:id',AdminController.authenticate, AdminController.AdminEditCompany)
router.delete('/AdminDeleteInvestor/:id',AdminController.authenticate, AdminController.AdminDeleteInvestor)
router.post('/AdminRegisterLawyer',AdminController.authenticate, AdminController.AdminRegisterLawyer)
router.post('/AdminRegisterReviewer',AdminController.authenticate, AdminController.AdminRegisterReviewer)
router.delete('/AdminDeleteLawyer/:id',AdminController.authenticate, AdminController.AdminDeleteLawyer)
router.delete('/AdminDeleteReviewer/:id',AdminController.authenticate, AdminController.AdminDeleteReviewer)
router.delete('/AdminDeleteAdmin/:id',AdminController.authenticate, AdminController.AdminDeleteAdmin)
router.put('/AdminChangePricingStrategy/:id',AdminController.authenticate, AdminController.AdminChangePricingStrategy)
router.get('/AdminViewingPublishedCompanies', AdminController.AdminViewingPublishedCompanies)
router.get('/AdminViewingCompany/:id', AdminController.AdminViewingCompany)
router.get('/AdminViewing/:id', AdminController.AdminViewing)
router.delete('/AdminDeleteQuestion/:id',AdminController.authenticate, AdminController.AdminDeleteQuestion)
router.delete('/AdminDeleteCase/:id',AdminController.authenticate, AdminController.AdminDeleteCase)
router.get('/AdminViewLawyersLeaderBoard',AdminController.authenticate, AdminController.adminViewLawyersLeaderBoard)
router.get('/AdminViewReviewersLeaderBoard',AdminController.authenticate, AdminController.adminViewReviewersLeaderBoard)
router.put('/AdminAnswerQuestions', AdminController.authenticate,AdminController.AdminAnswerQuestions)
router.get('/AdminFindLaw', AdminController.authenticate, AdminController.AdminFindLaw)
router.put('/AdminChangePassword/:id',AdminController.authenticate, AdminController.adminChangePassword)
router.post('/AdminCreateNewLaw',AdminController.authenticate, AdminController.AdminCreateNewLaw)
router.put('/AdminAssignLawyer',AdminController.authenticate,AdminController.AdminAssignLawyer)
router.put('/AdminAssignReviewer',AdminController.authenticate,AdminController.AdminAssignReviewer)
router.post('/SendAttachmentMail',AdminController.authenticate, AdminController.SendAttachmentMail)
router.post('/addFormType',AdminController.authenticate, AdminController.addFormType)
router.get('/getFormType/:formName',AdminController.authenticate, AdminController.getFormType)
router.get('/getAllFormTypes',AdminController.authenticate, AdminController.getAllFormTypes)
router.delete('/deleteFormType/:formName',AdminController.authenticate, AdminController.deleteFormType)
router.get('/calculateFees/:id', AdminController.SystemCalcFees)
router.post('/AdminCreateFormType',AdminController.authenticate, AdminController.AdminCreateFormType)
router.delete('/AdminDeleteFormType/:id',AdminController.authenticate, AdminController.AdminDeleteFormType)
router.get('/AdminFindFormType',AdminController.authenticate, AdminController.AdminFindFormType)
router.get('/AdminFindFormType/:id',AdminController.authenticate, AdminController.AdminFindFormTypeID)

router.get('/calculateAverageMins/:id', AdminController.calculateAverageMins)
router.get('/calculateUniqueCases/:id', AdminController.calculateUniqueCases)
router.put('/calculateRange/:id', AdminController.calculateRange)



//------------------------------------Lawyer Routes----------------------------------------------------

// router.post('/lawyerWriteComment',LawyerController.lawyerComment)

//------------------------------------Lawyer Routes----------------------------------------------------
router.post('/LawyerFillForm',LawyerController.authenticate , LawyerController.lawyerFillForm)
router.put('/LawyerUpdateForm/:id',LawyerController.authenticate , LawyerController.lawyerUpdateForm)
router.get('/LawyerMyNotifications/:id', LawyerController.authenticate ,LawyerController.lawyerMyNotifications)
router.put('/LawyerChangePassword/:id',LawyerController.authenticate , LawyerController.lawyerChangePassword)
router.put('/caseDisAproveedAtLawyer/:idCase', LawyerController.authenticate ,LawyerController.caseDisAproveedAtLawyer)
router.put('/caseAproveedAtLawyer/:idCase',LawyerController.authenticate ,LawyerController.caseAproveedAtLawyer)
router.get('/viewCasesLawyer',LawyerController.authenticate ,  LawyerController.viewCasesLawyer)
router.get('/LawyerViewingPublishedCompanies', LawyerController.LawyerViewingPublishedCompanies)
router.get('/lawyerOpenCase/:id',LawyerController.authenticate , LawyerController.lawyerOpenCase)
router.get('/lawyerCloseCase/:id',LawyerController.authenticate , LawyerController.lawyerCloseCase)
router.get('/LawyerViewing/:id', LawyerController.LawyerViewing)
router.get('/LawyerViewingCompany/:id', LawyerController.LawyerViewingCompany)
// router.get('/LawyerViewComment',LawyerController.authenticate , LawyerController.lawyerViewComment)
// router.get('/LawyerViewLawyersLeaderBoard', LawyerController.lawyerViewLawyersLeaderBoard)
// router.get('/LawyerViewReviewersLeaderBoard', LawyerController.lawyerViewReviewersLeaderBoard)
// router.post('/lawyerWriteComment',LawyerController.lawyerComment)



//----------------------------------------------Reviewer Routes-----------------------------------------
router.put('/ReviewerChangePassword/:id',ReviewerController.authenticate ,ReviewerController.reviewerChangePassword)
router.get('/ReviewerMyNotifications/:id',ReviewerController.authenticate ,ReviewerController.reviewerMyNotifications)
router.get('/ReviewerViewLawyersLeaderBoard',ReviewerController.reviewerViewLawyersLeaderBoard)
router.get('/ReviewerViewingPublishedCompanies', ReviewerController.ReviewerViewingPublishedCompanies)
router.get('/ReviewerViewingCompany/:id', ReviewerController.ReviewerViewingCompany)
router.get('/ReviewerViewing/:id', ReviewerController.ReviewerViewing)
router.get('/ReviewerOpenCase/:id',ReviewerController.authenticate, ReviewerController.ReviewerOpenCase)
router.get('/ReviewerCloseCase/:id',ReviewerController.authenticate, ReviewerController.ReviewerCloseCase)
router.put('/caseAproveedAtReviewer/:idCase',ReviewerController.authenticate, ReviewerController.caseAproveedAtreviewer)// fix this
router.put('/caseDisAproveedAtReviewer/:idCase',ReviewerController.authenticate, ReviewerController.caseDisAproveedAtReviewer)
router.get('/viewCasesReviewer',ReviewerController.authenticate, ReviewerController.viewCasesReviewer)
router.get('/ReviewerViewReviewersLeaderBoard',ReviewerController.authenticate,ReviewerController.reviewerViewReviewersLeaderBoard)



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

//You arrived here , You can 
//YOU did , Great JOB xD


//--------------------------------------------------done
module.exports = router