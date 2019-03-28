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

//this endpoint allows investor to view his company fees
router.get('/InvestorViewFees', InvestorController.InvestorViewFees)




//-------------------------------Admin Routes------------------------------------------------------------
router.put('/AdminEditCompany/:id', AdminController.AdminEditCompany)






//------------------------------------Lawyer Routes----------------------------------------------------









//----------------------------------------------Reviewer Routes-----------------------------------------










//-------------------------------User Routes---------------------------------------------------------

module.exports = router