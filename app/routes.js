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






//-------------------------------Admin Routes------------------------------------------------------------








//------------------------------------Lawyer Routes----------------------------------------------------









//----------------------------------------------Reviewer Routes-----------------------------------------










//-------------------------------User Routes---------------------------------------------------------

module.exports = router