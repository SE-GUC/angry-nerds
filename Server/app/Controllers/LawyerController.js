const validator = require("../../validations/caseValidations");
const stripe = require("stripe")("sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0");
const Case = require("./../models/Cases");
const express = require("express");
const Admins = require("./../models/Admin");
const Investor = require("./../models/Investor");
const router = express.Router();
const mongoose = require("mongoose");
const PasswordGenerator = require("secure-random-password");
const Lawyer = require("../models/Lawyer");

const Reviewer = require("./../models/Reviewer");

let LawyerController = {
  //write methods here: check InvestorController for example
  lawyerRegisterInvestor: async body => {
    const email = body.email;
    const user = await Investor.findOne({ email });

    if (user) throw "habda";
    else {
      const password = PasswordGenerator.randomPassword({
        characters: [
          PasswordGenerator.lower,
          PasswordGenerator.upper,
          PasswordGenerator.digits
        ]
      });
      console.log(password);
      const newUser = await Investor.create(body);
      const updatePassword = await Investor.findByIdAndUpdate(newUser._id, {
        password: password
      });

      return newUser._id;
    }
  },

  /**
   * BODY = {
   *  investor={
   *      //investor information
   *  },
   *  case={
   *      //case information
   *  }
   * }*/
   
  lawyerFillForm: async (req, res) => {
    try {
      const id = "5c9f69180ec7b72d689dba6d"; //From Token
      const lawyer = await Lawyer.findById(id);

      if (!lawyer)
        return res
          .status(404)
          .send({ error: "You are not allowed to fill this form" });

      /*const userID = await LawyerController.lawyerRegisterInvestor(
        req.body.investor
      );*/

      const newForm = await Case.create(req.body);
      const casecreated = await Case.findByIdAndUpdate(newForm._id, {
       // investorID: userID,
        caseStatus: "reviewer",
        walk_in: true,
        locked: false,
        log: [
          {
            id: id,
            destination: "reviewer",
            date: new Date()
          }
        ]
      });
      res.json({ msg: "The form was created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: "Form cant be created" });
    }
  },

  lawyerUpdateForm: async (req, res) => {
    try {
      const id = req.params.id;
      const lawyerid = "5c9f69180ec7b72d689dba6d";
      const lawyer = await Lawyer.findById(lawyerid);
      const form = await Case.findById(id);
      if (!lawyer)
        return res
          .status(404)
          .send({ error: "You are not allowed to update this form" });
      if (!form)
        return res
          .status(404)
          .send({ error: "The form you are trying to update does not exist" });
      var updatedForm = await Case.findByIdAndUpdate(id, req.body);
      res.json({ msg: "Form updated successfully", data: updatedForm });
    } catch (error) {
      return res.status(404).send({ error: "Form cant be updated" });
    }
  },

  /*
    GET request to view the comments on the case.
    PARAMS:{   caseID: String }    
    RETURNS 404 NOT FOUND: if the ID is not in the database.
            403 FORBIDDEN: if the user is not a lawyer.
            200 OK: if the query is done.
            400 BAD REQUEST: if an exception is thrown.   

    */

  lawyerViewComment: async (req, res) => {
    try {
      const caseID = '5caea6d0656a5b5b52c79e9f'
      const lawyerID = "5c9f69180ec7b72d689dba6d"; //from Token
      //const caseID = req.params.caseID;

      const lawyer = await Lawyer.findById(lawyerID);
      const c = await Case.findById(caseID);
      if (!c) return res.status(404).send({ error: "The form does not exist" });
      if (!lawyer)
        return res.status(403).send({
          error:
            "You are not allowed to view this comment, You are not a lawyer"
        });

      return res.json({ data: c.comment });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: "Comment cant be viewed" });
    }
  },

  lawyerViewLawyersLeaderBoard: async (req, res) => {
    try {
      const lawyerid = "5c9f69180ec7b72d689dba6d";
      const lawyer = await Lawyer.findById(lawyerid);
      if (!lawyer)
        return res
          .status(404)
          .send({ error: "You are not allowed to view the Leaderboard" });
      const leaderboard = await Lawyer.find().sort({
        completed_number_of_cases: 1
      });
      console.log(Lawyer);
      console.log(leaderboard);
      return res.json({ data: leaderboard, msg: "Done" });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ error: "LeaderBoard cant be viewed" });
    }
  },

  //NEEDS ADJUTMENTS ??
  calc_fees: async function(req, res) {
    const CaseId = req.params.CaseId;
    const LawyerId = req.params.LawyerId;
    const fees = req.params.fees;
    const Cases = await Case.findById(CaseId);
    if (Cases.caseStatus === "Lawyer" && Cases.lawyerID === LawyerId) {
      const updateCase = await Case.findByIdAndUpdate(CaseId, { fees: fees });
    }
  },

  /*
    PUT request to change password of the lawyer
    PARAMS:{ lawyerID: String }
    BODY:{   oldPassword: String,
            newPassword: String }
    * Checks if the lawyer is in the database,
    then checks if the oldPassword matches the one in the database.
    Then changes the password in the database.     
    RETURNS 404 NOT FOUND: if the ID is not in the database.
            403 FORBIDDEN: if the old password does not match the password in the database.
            200 OK: if the password is updated.
            400 BAD REQUEST: if an exception is thrown.   

    */

  lawyerChangePassword: async function(req, res) {
    try {
      const id = req.params.id;
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      let lawyer = await Lawyer.findById(id);
      if (!lawyer) {
        return res
          .status(404)
          .json({ error: "Cannot find an admin account with this ID" });
      } else {
        if (oldPassword != lawyer.password) {
          return res.status(403).json({ error: "The passwords do not match" });
        } else {
          const updatedLawyer = await Lawyer.findByIdAndUpdate(id, {
            ////////////
            password: newPassword
          });
          lawyer = await Lawyer.findById(id);
          return res
            .status(200)
            .json({ message: "The password was updated", data: lawyer });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Error processing query." });
    }
  },

  caseDisAproveedAtLawyer: async function(req, res) {
    /// :idStaff/:idCase'  routs
    // var CASE = new Case(req.body);
    // const staff= await Staff.findById(id)

    const caseID = req.params.idCase;
    const staffID = "5c9f69180ec7b72d689dba6d";

    const CASE = await Case.findById(caseID);
    const lawyer = await Lawyer.findById(staffID);

    if (!CASE) {
      return res.status(404).json({ error: "cannot find this case" });
    }

    const newLog = CASE.log;
    newLog.push({
      id: staffID,
      destination: "investor",
      date: new Date()
    });

    await Case.findByIdAndUpdate(caseID, {
      caseStatus: "investor",
      locked: false,
      log: newLog
    });

    LawyerController.lawyerWriteComment(caseID, req.body.comment, staffID);

    return res
      .status(200)
      .json({ msg: "Case rejected and sent to investor", data: CASE }); // in test check that caseStatus is reviewer
  },

  caseAproveedAtLawyer: async function(req, res) {
    /// :idStaff/:idCase'  routs

    const caseID = req.params.idCase;
    const staffID = "5c9f69180ec7b72d689dba6d";

    const CASE = await Case.findById(caseID);
    const lawyer = await Lawyer.findById(staffID);

    if (!CASE) {
      return res.status(404).json({ error: "cannot find this case" });
    }

    const newLog = CASE.log;
    newLog.push({
      id: staffID,
      destination: "reviewer",
      date: new Date()
    });

    await Case.findByIdAndUpdate(caseID, {
      caseStatus: "reviewer",
      locked: false,
      log: newLog
    });
    return res
      .status(200)
      .json({ msg: "Case approved and sent to reviewer", data: CASE }); // in test check that caseStatus is reviewer
  },

  lawyerWriteComment: async function(caseID, comment, lawyerID) {
    //   Only  called in caseDisAproveedAtLawyer !! and takes caseID and comment as inputs
    const CASE = Case.findById(caseID);

    const newComment = {
      text: comment,
      date: new Date(),
      Lawyer: lawyerID
    };

    const writecomment = await Case.findByIdAndUpdate(caseID, {
      comment: newComment
    });
    return writecomment;
  },

  viewCasesLawyer: async function(req, res) {
    // req contain the lawyer id
    try {
      let cases = await Case.find({
        $or: [
          { caseStatus: "lawyer-investor" },
          { caseStatus: "lawyer-reviewer" }
        ]
      });

      return res.status(200).json({ data: cases });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Error processing query." });
    }
  },

  /*
        GET request to view the notifications of the lawyer.
        PARAMS:{ adminID: String }
        * Checks if the lawyer is in the database,
        then checks gets thier notifications.   
        RETURNS 404 NOT FOUND: if the ID is not in the database.
                200 OK: if it pereforms the query.
                400 BAD REQUEST: if an exception is thrown.   
    */
  lawyerMyNotifications: async function(req, res) {
    try {
      const id = req.params.id;
      let lawyer = await lawyer.findById(id);
      if (!lawyer) {
        return res
          .status(404)
          .json({ error: "Cannot find an lawyer account with this ID" });
      } else {
        let notifications = lawyer.notifications;
        return res.status(200).json({ data: notifications });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Error processing query." });
    }
  },

  lawyerViewReviewersLeaderBoard: async (req, res) => {
    try {
      const lawyerid = "5c9f69180ec7b72d689dba6d";
      const lawyer = await Lawyer.findById(lawyerid);
      if (!lawyer)
        return res
          .status(404)
          .send({ error: "You are not allowed to view the Leaderboard" });
      const leaderboard = await Reviewer.find().sort({
        completed_number_of_cases: 1
      });
      //console.log(leaderboard)
      return res.json({ data: leaderboard, msg: "Done" });
    } catch (error) {
      //console.log(error)
      return res.status(404).send({ error: "LeaderBoard cant be viewed" });
    }
  },

  //view all published companies
  LawCompListViewing: async (req, res) => {
    try {
      var Cas = await Case.find({ caseStatus: "published" });

      res.json({ data: Cas });
    } catch (error) {
      console.log(error);
    }
  },

  LawCompViewing: async (req, res) => {
    const id = req.params.id;
    var Cas = await Case.findById(id);

    try {
      if (Cas.caseStatus === "published") {
        var proj1 = { _id: 0, reviewerID: 0, lawyerID: 0, InvestorID: 0 };
        Cas = await Case.findById(id, proj1);
        res.json({ data: Cas });
      } else {
        res.json({ message: "Case was not published" });
      }
    } catch (error) {
      console.log(error);
    }
  },

  LawViewing: async (req, res) => {
    var proj = { _id: 0, password: 0 };
    var projy = { _id: 0, password: 0, ratings: 0 };

    try {
      const id = req.params.id;
      const Inv = await Investor.findById(id, proj);
      const Revs = await Reviewer.findById(id, proj);
      const Adm = await Admins.findById(id, proj);
      const Lawy = await Lawyer.findById(id, projy);
      if (Inv) res.json({ message: "investor", data: Inv });
      else if (Revs) res.json({ message: "Rev", data: Revs });
      else if (Lawy) res.json({ message: "lawyer", data: Lawy });
      else if (Adm) res.json({ message: "Admin", data: Adm });
      else {
        res.json({ message: "User does not exist" });
      }
    } catch (error) {
      console.log(error);
    }
  },

  //opening and closing a case
  lawyerOpenCase: async (req, res) => {
    const lawyerID = "5cabb3ae42c62531851d9cfc";

    try {
      const id = req.params.id;
      var c = await Case.findById(id);

      if (c.locked) {
        res.status(403).json({ error: "Case is locked" });
      } else {
        var newLog = c.log;
        newLog.push({
          id: lawyerID,
          destination: "open",
          date: new Date()
        });
        await Case.findByIdAndUpdate(id, {
          locked: true,
          log: newLog
        });
        res.status(200).json({ data: c });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "error processsing query" });
    }
  },

  lawyerCloseCase: async (req, res) => {
    try {
      const lawyerID = "5cabb3ae42c62531851d9cfc";

      const id = req.params.id;
      var c = await Case.findById(id);
      var newLog = c.log;
      newLog.push({
        id: lawyerID,
        destination: "close",
        date: new Date()
      });
      var c = await Case.findByIdAndUpdate(id, {
        locked: false,
        log: newLog
      });
      res.status(200).json({ data: c });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "error processsing query" });
    }
  }
};

module.exports = LawyerController;
