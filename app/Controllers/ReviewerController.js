const validator = require("../../validations/caseValidations");
const stripe = require("stripe")("sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0");
const Case = require("./../models/Cases");
const Reviewer = require("./../models/Reviewer");
const express = require("express");
const Admins = require("./../models/Admin");
const Investor = require("./../models/Investor");
const router = express.Router();
const mongoose = require("mongoose");
const Lawyer = require("./../models/Lawyer");
const passport = require('passport')


let ReviewerController = {
  //write methods here: check InvestorController for example

  authenticate: passport.authenticate('jwt', { session: false }),  
  // the case will go baack to the lawyer to fix his mistake
  // will resume timer for lawer's work on case

  caseDisAproveedAtReviewer: async function(req, res) {
    /// /:idCase
    // var CASE = new Case(req.body);
    //call comment from frontend

    const caseID = req.params.idCase;
    const staffID = req.user.id //get from token
    const CASE = await Case.findById(caseID);
    console.log(CASE)
    if (!CASE) {
      return res.status(404).json({ message: "error, case not found" });
    } 
    else {

    const newLog = CASE.log
    newLog.push({
        id: staffID,
        destination: 'lawyer',
        date: new Date()
    })

    console.log(newLog)

    const newCase = await Case.findByIdAndUpdate(caseID, 
    {caseStatus: 'lawyer-reviewer', locked:false, log: newLog})
    var notify = Investor.findById(CASE.investorID)
    newnot.push(
   {CaseID: caseID,
   text: CASE.english_name + "has been disapproved",
   ArText : CASE.arabic_name + "لم يتم الموافقة عليها ",
   time: Date.now })
     await Investor.findOneAndUpdate(CASE.investorID, {  notifications: newnot } )
    ReviewerController.reviewerWriteComment(caseID, req.body.comment, staffID)
    return res.status(200).json({ msg: "Case disaproved", data: CASE }); 
    }
    
  },

  caseAproveedAtreviewer: async function(req, res) {
    // var CASE = new Case(req.body);
    // const staff= await Staff.findById(id)

    const caseID = req.params.idCase;
    const staffID = req.user.id; //get from token
    const CASE = await Case.findById(caseID);
    console.log(CASE)
    if (!CASE) {
      return res.status(404).json({ message: "error, case not found" });
    } 
    else {

    const newLog = CASE.log
    newLog.push({
        id: staffID,
        destination: 'pending',
        date: new Date()
    })


    const newCase = await Case.findByIdAndUpdate(caseID, 
    {caseStatus: 'pending', locked:false, log: newLog})
    console.log('here')
    console.log(newCase)
    var notify = [{  'CaseID': caseID, 'text': "has been approved", 'time': Date.now }]
     await Investor.findOneAndUpdate(CASE.investorID, { $push: { notifications: notify } })

    return res.status(200).json({ msg: "Case approved, awaiting payment", data: newCase }); 
    }
  },

  
    reviewerWriteComment: async function(caseID, comment, lawyerID) {
        //   Only  called in caseDisAproveedAtReviwer !! and takes caseID and comment as inputs
        const CASE = Case.findById(caseID);
    
        const newComment = {
            text: comment,
            date: new Date(),
            Lawyer: lawyerID
        }
    
        const writecomment = await Case.findByIdAndUpdate(caseID, {
          comment : newComment
        });
        return writecomment;
      
  },

  viewCasesReviewer: async function(req, res) {
    // req contain the lawyer id
    try {
        
        let cases = await Case.find({ caseStatus: 'reviewer', locked:false });
        if (!cases) {
          return res.status(200).json({ message: "Cannot find cases" });
        }
        
        return res.status(200).json({ data: cases , msg: "Done"  });
      }
     catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Error processing query." });
    }
  },

  /*
        PUT request to change password of the reviewer
        PARAMS:{ adminID: String }
        BODY:{   oldPassword: String,
                 newPassword: String }
        * Checks if the admin is in the database,
        then checks if the oldPassword matches the one in the database.
        Then changes the password in the database.     
        RETURNS 404 NOT FOUND: if the ID is not in the database.
                403 FORBIDDEN: if the old password does not match the password in the database.
                200 OK: if the password is updated.
        */
  reviewerChangePassword: async function(req, res) {
    const id = req.params.id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    let reviewer = await Reviewer.findById(id);
    if (!reviewer) {
      return res
        .status(404)
        .json({ error: "Cannot find an admin account with this ID" });
    } else {
      if (oldPassword != reviewer.password) {
        return res.status(403).json({ error: "Incorrect old password" });
      } else {
        const updatedReviewer = await Reviewer.findByIdAndUpdate(id, {
          password: newPassword
        });
        reviewer = await Reviewer.findById(id);
        return res
          .status(200)
          .json({ msg: "The password was updated", data: reviewer });
      }
    }
  },

  /*
        GET request to view the notifications of the reviewer.
        PARAMS:{ adminID: String }
        * Checks if the reviewer is in the database,
        then checks gets thier notifications.   
        RETURNS 404 NOT FOUND: if the ID is not in the database.
                200 OK: if it pereforms the query.
                400 BAD REQUEST: if an exception is thrown.   
    */
  reviewerMyNotifications: async function(req, res) {
    try {
      // const id = "5ca772654d70710fa843bd5f";
      const id = req.params.id
      let reviewer = await Reviewer.findById(id);
      if (!reviewer) {
        return res
          .status(404)
          .json({ error: "Cannot find an reviewer account with this ID" });
      } else {
        let notifications = reviewer.notifications
        return res.status(200).json({ data: notifications });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Error processing query." });
    }
  },
  
  //ask paul about performance...
  reviewerViewLawyersLeaderBoard: async (req, res) => {
    try {
      const reviewerid = "5caedcb44452700f484617ac"; //get from token
      const reviewer = await Reviewer.findById(reviewerid);
      if (!reviewer)
        return res
          .status(404)
          .send({ error: "You are not allowed to view the Leaderboard" });
      const leaderboard = await Lawyer.find().sort({
        completed_number_of_cases: 1
      });
      // console.log(Lawyer)
      //console.log(leaderboard)
      return res.status(200).send({ data: leaderboard , msg:"Done" });
    } catch (error) {
      //console.log(error)
      return res.status(404).send({ error: "LeaderBoard cant be viewed" });
    }
  },

  reviewerViewReviewersLeaderBoard: async (req, res) => {
    try {
      const reviewerid = req.user.id;
      const reviewer = await Reviewer.findById(reviewerid);
      if (!reviewer)
        return res
          .status(404)
          .send({ error: "You are not allowed to view the Leaderboard" });
      const leaderboard = await Reviewer.find().sort({
        completed_number_of_cases: 1
      });
      //console.log(leaderboard)
      return res.status(200).send({ data: leaderboard, msg: "Done" });
    } catch (error) {
      console.log(error)
      return res.status(404).send({ error: "LeaderBoard cant be viewed" });
    }
  },




  //reviewer open a case and lock
  ReviewerOpenCase: async(req,res) => {

    reviewerID = req.user.id //get from token
    caseID = req.params.id
    try{
        c = await Case.findById(caseID)
        lock = c.locked
        if(lock){
            return res.status(403).json({message: 'this case is already opened by another employee'})
        }
        else{
            caseLog = c.log
            newLog = {
                id: reviewerID, 
                date: new Date(),
                destination: 'open'
            }
            caseLog.push(newLog)
            c = await Case.findByIdAndUpdate(caseID, {locked:true, log: caseLog})
            return res.status(200).json({message: 'case opened by reviewer', data: c})
        }
    }
    catch(error){
        console.log(error)
        res.status(400).json({message: error})
    }
  },

  //reviewer close a case and unlock
  ReviewerCloseCase: async(req,res) => {

    reviewerID = req.user.id //get from token
    caseID = req.params.id
    c = await Case.findById(caseID)
    try{
        caseLog = c.log
            newLog = {
                id: reviewerID, 
                date: new Date(),
                destination: 'close'
            }
            caseLog.push(newLog)
        c = await Case.findByIdAndUpdate(caseID, {locked:false, log: caseLog})
        res.status(200).json({data: c})
    }
    catch(error){
        res.status(400).json({message: error})
    }
},

//Displaying a List of all published companies

ReviewerViewingPublishedCompanies: async (req,res) => {
    
    try {
        var Cas = await Case.find({ caseStatus: 'published' }, projx)
        
        for (var i = 0; i < Case.length; i++) {
            var projx = { '_id': 0, 'reviewerID': 0, 'lawyerID': 0, 'investorID': 0 }
        }
        Cas = await Case.find({ caseStatus: 'published' }, projx)

            res.json({ message:'Cases',data: Cas })
        }
        catch (error) {
            console.log(error)
        }
},

//Viewing One specific Company
ReviewerViewingCompany: async (req, res)=> {
    
    const id = req.params.id
    var Cas = await Case.findById(id)
    
    try {
        if (Cas.caseStatus == 'published') {
            var proj1 = { '_id': 0,'reviewerID': 0, 'lawyerID': 0, 'InvestorID': 0 }
            Cas = await Case.findById(id, proj1)
            res.json({message:'case' , data: Cas }) 
        } else {
            res.json({ message: 'Case was not published' })
            
        }
    }
    catch (error) {
        console.log(error)
    }
},

//Viewing a specific User of any type 
ReviewerViewing: async (req, res)=> {
  var proj = { '_id': 0, 'firstName': 1, 'MiddleName': 1, 'LastName': 1, 'Nationality': 1, 'Address': 1, 'birthdate': 1, 'telephone_number': 1, 'gender': 1 };

  try {
      const id = req.params.id
      const Inv = await Investor.findById(id, proj)
     
      if(Inv)
      res.json({ message:'investor' ,data: Inv})
          else {
              res.json({message: 'User does not exist'})
  
          }
  }
  catch (error) {
  console.log(error)
  }
  
  
    }
  //    reviewerComment: async function (req, res) {

  //    }   ,
};

module.exports = ReviewerController;
