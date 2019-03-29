var InvestorController = require('./Controllers/InvestorController')
const AdminController = require('./Controllers/AdminController')
const LawyerController = require('./Controllers/LawyerController')
const ReviewerController = require('./Controllers/ReviewerController')
const UserController = require('./Controllers/UserController')
const express = require('express')
var router = express.Router();


//--------------------------------Investor Routes----------------------------------------------------------

//this endpoint allows the investor to pay fees for a pending company
router.post('/InvestorPayFees', InvestorController.InvestorPayFees)






//-------------------------------Admin Routes------------------------------------------------------------








//------------------------------------Lawyer Routes----------------------------------------------------


router.put('/caseDisAproveedAtLawyer/:idStaff:idCase',LawyerController.caseDisAproveedAtLawyer)
router.put('/caseAproveedAtLawyer/:idStaff:idCase',LawyerController.caseAproveedAtLawyer)
router.get('/viewCasesLawyer/:id',LawyerController.viewCasesLawyer)
// router.post('/lawyerComment/:id',LawyerController.lawyerComment)









//----------------------------------------------Reviewer Routes-----------------------------------------

// router.put('/caseAproveedAtReviewer/:idStaff/:idCase',ReviewerController.caseAproveedAtReviewer)    // fix this
router.put('/caseDisAproveedAtReviewer',ReviewerController.caseDisAproveedAtReviewer)
router.get('/viewCasesReviewer/:id',ReviewerController.viewCasesReviewer)










//-------------------------------User Routes---------------------------------------------------------

module.exports = router