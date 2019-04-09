var InvestorController = require('./Controllers/InvestorController')
const AdminController = require('./Controllers/AdminController')
const LawyerController = require('./Controllers/LawyerController')
const ReviewerController = require('./Controllers/ReviewerController')
const UserController = require('./Controllers/UserController')
const express = require('express')
var router = express.Router();
var fs = require('fs');



//--------------------------------Investor Routes----------------------------------------------------------

//this endpoint allows the investor to pay fees for a pending company
router.get('/InvestorSignIn/:email/:password',InvestorController.InvestorSignIn)
router.post('/InvestorPayFees', InvestorController.InvestorPayFees)
router.post('/InvestorFillForm', InvestorController.investorFillForm)
router.put('/InvestorUpdateForm/:id', InvestorController.investorUpdateForm)
router.put('/InvestorEditProfile',InvestorController.InvestorEditProfile)

//this endpoint allows investor to view his company fees
router.get('/InvestorViewFees', InvestorController.InvestorViewFees)
router.put('/InvestorChangePassword/:id',InvestorController.investorChangePassword)
router.get('/InvestorMyNotifications/:id',InvestorController.investorMyNotifications)
router.get('/ViewPublishedCompanies',InvestorController.viewMyPublishedCompanies)
router.get('/ViewPendingCompanies',InvestorController.viewMyPendingCompanies)
router.get('/generatePdf/:id',InvestorController.generatePdf)
router.get('/InvCompListViewing', InvestorController.InvCompListViewing)
router.get('/InvCompViewing/:id', InvestorController.InvCompViewing)
router.get('/InvViewing/:id', InvestorController.InvViewing)
router.post('/InvestorRateLawyer/:id', InvestorController.InvestorRateLawyer)


//-------------------------------Admin Routes------------------------------------------------------------
router.post('/AdminRegisterLawyer', AdminController.AdminRegisterLawyer)
router.post('/AdminRegisterReviewer', AdminController.AdminRegisterReviewer)
router.get('/AdminViewComment', AdminController.adminViewComment)
router.post('/AdminRegisterAdmin', AdminController.AdminRegisterAdmin)
router.put('/AdminEditCompany/:id', AdminController.AdminEditCompany)
router.delete('/AdminDeleteInvestor/:id', AdminController.AdminDeleteInvestor)
router.post('/AdminRegisterLawyer', AdminController.AdminRegisterLawyer)
router.post('AdminRegisterReviewer', AdminController.AdminRegisterReviewer)
router.delete('/AdminDeleteLawyer/:id', AdminController.AdminDeleteLawyer)
router.delete('/AdminDeleteReviewer/:id', AdminController.AdminDeleteReviewer)
router.delete('/AdminDeleteAdmin/:id', AdminController.AdminDeleteAdmin)

router.post('/forgotpassword', AdminController.forgotpassword)

router.post('/resetpassword/:token', AdminController.resetpassword)



router.put('/AdminChangePricingStrategy/:id', AdminController.AdminChangePricingStrategy)
router.post('/AdminCreateNewLaw', AdminController.AdminCreateNewLaw)
router.get('/AdmCompListViewing', AdminController.AdmCompListViewing)
router.get('/AdmCompViewing/:id', AdminController.AdmCompViewing)
router.get('/AdmViewing/:id', AdminController.AdmViewing)
router.delete('/AdmDelQuestion/:id', AdminController.AdmDelQuestion)
router.delete('/AdmDelCase/:id', AdminController.AdmDelCase)
router.get('AdminViewLawyersLeaderBoard', AdminController.adminViewLawyersLeaderBoard)
router.get('AdminViewReviewersLeaderBoard', AdminController.adminViewReviewersLeaderBoard)

router.put('/AdminChangePassword/:id', AdminController.adminChangePassword)
router.put('/AdminChangePricingStrategy/:id', AdminController.AdminChangePricingStrategy)
router.post('/AdminCreateNewLaw', AdminController.AdminCreateNewLaw)
router.put('/AdminAssignLawyer',AdminController.AdminAssignLawyer)
router.put('/AdminAssignReviewer',AdminController.AdminAssignReviewer)
router.post('/SendAttachmentMail', AdminController.SendAttachmentMail)



//------------------------------------Lawyer Routes----------------------------------------------------
router.post('/LawyerFillForm', LawyerController.lawyerFillForm)
router.put('/LawyerUpdateForm/:id', LawyerController.lawyerUpdateForm)
router.get('/LawyerViewComment', LawyerController.lawyerViewComment)
router.get('/LawyerViewLawyersLeaderBoard', LawyerController.lawyerViewLawyersLeaderBoard)
router.get('/LawyerViewReviewersLeaderBoard', LawyerController.lawyerViewReviewersLeaderBoard)
router.put('/LawyerChangePassword/:id', LawyerController.lawyerChangePassword)
router.get('/LawyerMyNotifications/:id', LawyerController.lawyerMyNotifications)

router.put('/caseDisAproveedAtLawyer/:idCase', LawyerController.caseDisAproveedAtLawyer)
router.put('/caseAproveedAtLawyer/:idCase', LawyerController.caseAproveedAtLawyer)
router.get('/viewCasesLawyer/:id', LawyerController.viewCasesLawyer)

router.get('/lawyerOpenCase/:id', LawyerController.lawyerOpenCase)
router.get('/lawyerCloseCase/:id', LawyerController.lawyerCloseCase)

//------------------------------------Lawyer Routes----------------------------------------------------
router.post('/LawyerFillForm',LawyerController.lawyerFillForm)
router.put('/LawyerUpdateForm/:id',LawyerController.lawyerUpdateForm)
router.get('/LawyerViewComment',LawyerController.lawyerViewComment)
router.get('/LawyerViewLawyersLeaderBoard',LawyerController.lawyerViewLawyersLeaderBoard)
router.get('/LawyerViewReviewersLeaderBoard',LawyerController.lawyerViewReviewersLeaderBoard)
router.put('/LawyerChangePassword/:id',LawyerController.lawyerChangePassword)
router.get('/LawyerMyNotifications/:id',LawyerController.lawyerMyNotifications)
router.get('/LawCompListViewing', LawyerController.LawCompListViewing)
router.get('/LawCompViewing/:id', LawyerController.LawCompViewing)
router.get('/LawViewing/:id', LawyerController.LawViewing)


//----------------------------------------------Reviewer Routes-----------------------------------------
router.put('/ReviewerChangePassword/:id',ReviewerController.reviewerChangePassword)
router.get('/ReviewerMyNotifications/:id',ReviewerController.reviewerMyNotifications)
router.get('/ReviewerViewLawyersLeaderBoard',ReviewerController.reviewerViewLawyersLeaderBoard)
router.get('/RevCompListViewing', ReviewerController.RevCompListViewing)
router.get('/RevCompViewing/:id', ReviewerController.RevCompViewing)
router.get('/RevViewing/:id', ReviewerController.RevViewing)
router.get('/ReviewerOpenCase/:id', ReviewerController.ReviewerOpenCase)
router.get('/ReviewerCloseCase/:id', ReviewerController.ReviewerCloseCase)




//-------------------------------User Routes---------------------------------------------------------
router.get('/UnregisteredViewQuestions',UserController.UnregisteredViewQuestions)
router.get('/UnregisteredViewLawyers',UserController.viewLawyers)
router.get('/UnregCompListViewing', UserController.UnregCompListViewing)
router.get('/UnregCompViewing/:id', UserController.UnregCompViewing)
router.get('/UnregViewing/:id', UserController.UnregViewing)




//----------------------------------------------Reviewer Routes-----------------------------------------

router.put('/caseAproveedAtReviewer/:idCase', ReviewerController.caseAproveedAtreviewer)// fix this
router.put('/caseDisAproveedAtReviewer/:idCase', ReviewerController.caseDisAproveedAtReviewer)
router.get('/viewCasesReviewer/', ReviewerController.viewCasesReviewer)
// router.post('/reviewrWriteComment',ReviewerController.reviewrWriteComment)





//-------------------------------User Routes---------------------------------------------------------
router.get('/UnregisteredViewQuestions',UserController.UnregisteredViewQuestions)
router.get('/UnregisteredViewLawyers',UserController.viewLawyers)
router.get('/UserViewLaws', UserController.UserViewLaws)

//--------------------------------------------------done
module.exports = router