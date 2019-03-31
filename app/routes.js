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
<<<<<<< HEAD
// router.get('/InvestorViewComment',InvestorController.investorViewComment)
=======
router.get('/InvestorViewComment',InvestorController.investorViewComment)
//router.post('/upload', upload.single('file'), InvestorController.uploadFile);
>>>>>>> 24bc814efd8763f39ff0f7ada95e4384d1fdf6ae





//this endpoint allows investor to view his company fees
router.get('/InvestorViewFees', InvestorController.InvestorViewFees)
router.put('/InvestorChangePassword/:id',InvestorController.investorChangePassword)
router.get('/InvestorMyNotifications/:id',InvestorController.investorMyNotifications)
router.get('/ViewPublishedCompanies/:id',InvestorController.viewMyPublishedCompanies)
router.get('/ViewPendingCompanies/:id',InvestorController.viewMyPendingCompanies)
router.get('/generatePdf/:id',InvestorController.generatePdf)



//-------------------------------Admin Routes------------------------------------------------------------
router.post('/AdminRegisterLawyer',AdminController.AdminRegisterLawyer)
router.post('/AdminRegisterReviewer',AdminController.AdminRegisterReviewer)
router.get('/AdminViewComment',AdminController.adminViewComment)
router.post('/AdminRegisterAdmin',AdminController.AdminRegisterAdmin)
router.put('/AdminEditCompany/:id', AdminController.AdminEditCompany)
router.delete('/AdminDeleteInvestor/:id',AdminController.AdminDeleteInvestor)
router.post('/AdminRegisterLawyer',AdminController.AdminRegisterLawyer)
router.post('AdminRegisterReviewer',AdminController.AdminRegisterReviewer)
router.delete('/AdminDeleteLawyer/:id',AdminController.AdminDeleteLawyer)
router.delete('/AdminDeleteReviewer/:id',AdminController.AdminDeleteReviewer)
router.delete('/AdminDeleteAdmin/:id',AdminController.AdminDeleteAdmin)
router.put('/AdminChangePassword/:id',AdminController.adminChangePassword)
router.get('AdminViewLawyersLeaderBoard',AdminController.adminViewLawyersLeaderBoard)
router.get('AdminViewReviewersLeaderBoard',AdminController.adminViewReviewersLeaderBoard)
router.put('/AdminChangePricingStrategy/:id', AdminController.AdminChangePricingStrategy)
router.post('/AdminCreateNewLaw', AdminController.AdminCreateNewLaw)






//------------------------------------Lawyer Routes----------------------------------------------------
router.post('/LawyerFillForm',LawyerController.lawyerFillForm)
router.put('/LawyerUpdateForm/:id',LawyerController.lawyerUpdateForm)
router.get('/LawyerViewComment',LawyerController.lawyerViewComment)
router.get('/LawyerViewLawyersLeaderBoard',LawyerController.lawyerViewLawyersLeaderBoard)
router.get('/LawyerViewReviewersLeaderBoard',LawyerController.lawyerViewReviewersLeaderBoard)
router.put('/LawyerChangePassword/:id',LawyerController.lawyerChangePassword)
router.get('/LawyerMyNotifications/:id',LawyerController.lawyerMyNotifications)

router.put('/caseDisAproveedAtLawyer/:idStaff/:idCase',LawyerController.caseDisAproveedAtLawyer)  
router.put('/caseAproveedAtLawyer/:idStaff:idCase',LawyerController.caseAproveedAtLawyer)
router.get('/viewCasesLawyer/:id',LawyerController.viewCasesLawyer)
// router.post('/lawyerWriteComment',LawyerController.lawyerComment)




//----------------------------------------------Reviewer Routes-----------------------------------------

 router.put('/caseAproveedAtReviewer/:idStaff/:idCase',ReviewerController.caseAproveedAtreviewer)    // fix this
router.put('/caseDisAproveedAtReviewer/:idStaff/:idCase',ReviewerController.caseDisAproveedAtReviewer)
 router.get('/viewCasesReviewer/:id',ReviewerController.viewCasesReviewer)
// router.post('/reviewrWriteComment',ReviewerController.reviewrWriteComment)



router.put('/ReviewerChangePassword/:id',ReviewerController.reviewerChangePassword)
router.get('/ReviewerMyNotifications/:id',ReviewerController.reviewerMyNotifications)
router.get('/ReviewerViewLawyersLeaderBoard',ReviewerController.reviewerViewLawyersLeaderBoard)


//-------------------------------User Routes---------------------------------------------------------
router.get('/UnregisteredViewQuestions',UserController.UnregisteredViewQuestions)
router.get('/UnregisteredViewLawyers',UserController.viewLawyers)
//router.get('/UserViewLaws', UserController.UserViewLaws)

//--------------------------------------------------done
module.exports = router