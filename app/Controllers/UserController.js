const validator = require("../../validations/caseValidations");
const stripe = require("stripe")("sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0");
const Case = require("./../models/Cases");
const Questions = require("./../models/Questions");
var crypto = require("crypto");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Laws = require("./../models/Laws");
const Investor = require("./../models/Investor");
const Admin = require("./../models/Admin");
const Reviewer = require("./../models/Reviewer");
const Lawyer = require("./../models/Lawyer");
const tempUser = require("./../models/tempUser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/key')
const mailer =require ('../../misc/mailer')
const tokenKey = config.secretOrKey;
var passport = require('passport');
require('../../config/passport')(passport);

let UserController = {

  //write methods here: check InvestorController for example
  authenticate: passport.authenticate('jwt', { session: false }),

  UnregisteredViewQuestions: async (req, res) => {
    try {
      const projection = { _id: 0, question: 1, answer: 1, time: 1 };
      const ques = await Questions.find({}, projection);
      res.status(200).json({ data: ques });
    } catch (err) {
      return next(err);
    }
  },

  viewLawyers: async (req, res) => {
    try {
      // const projection = { _id: 1, password: 0 }
      const lawyers = await Lawyer.find();
      res.json({ data: lawyers });
    } catch (err) {
      return next(err);
    }
},
UserViewLaws: async function(req, res){
    const Law = await Laws.find()
    res.json({ data: Law })
},

//Viewing One specific Company
UnregisterViewingCompany: async (req, res)=> {
    
    const id = req.params.id
    var Cas = await Case.findById(id)    
    try {
        if (Cas.caseStatus == 'published') {
            var proj1 = {
                '_id': 0, 'arabic_name': 1, 'english_name': 1, 'government': 1, 'city': 1
                , 'hq_address': 1, 'hq_city': 1, 'hq_state': 1, 'main_center_phone': 1, 'main_center_fax': 1
            }   
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

//Displaying a List of all published companies
UnregisterViewingPublishedCompanies: async (req,res) => {
    
    try {
        var Case = await Cases.find({ caseStatus: 'published' }, projx)
        
        for (var i = 0; i < Case.length; i++) {
            var projx = {
                '_id': 0, 'arabic_name': 1, 'english_name': 1, 'government': 1, 'city': 1,
                'hq_address': 1, 'hq_city': 1, 'hq_state': 1, 'main_center_phone': 1, 'main_center_fax': 1
            }        }
            Case = await Cases.find({ caseStatus: 'published' }, projx)
            res.json({ message:'Cases',data: Case })
        }
        catch (error) {
            console.log(error)
        }
    },
    
//Viewing a specific User of any type 
UnregisterViewing: async (req,res) => {
var proj = { '_id': 0, 'firstName': 1, 'MiddleName': 1, 'LastName': 1, 'Nationality': 1, 'Address': 1, 'birthdate': 1, 'telephone_number': 1, 'gender': 1 };

try {
    const id = req.params.id
    const Inv = await Investor.findById(id, proj)
    const Revs = await Reviewer.findById(id, proj)
    const Adm = await Admin.findById(id,proj)
    const Lawy = await Lawyer.findById(id, proj)
    if(Inv)
    res.json({ message:'investor' ,data: Inv})
        else if(Revs)
        res.json({message: 'Rev' ,data: Revs})
        else if(Lawy)
        res.json({message: 'lawyer',data: Lawy})
        else if(Adm)
        res.json({message: 'Admin',data: Adm})
        else {
            res.json({message: 'User does not exist'})

        }
}
catch (error) {
console.log(error)
}


},

makeQuestion:async (req, res) => {
  try {
    const newQuestion = await Questions.create(req.body)
    const createdQuestion= await Questions.findByIdAndUpdate(newQuestion.id,{"time":new Date()})
    res.json({ msg: 'Question created successfully', data: newQuestion })
}
catch (error) {
    console.log(error)
}
},






  Login : async (req, res) => {
    try {
      const { email, password } = req.body;
      const investor = await Investor.findOne({ email });
      const lawyer = await Lawyer.findOne({ email });
      const reviewer = await Reviewer.findOne({ email });
      const admin = await Admin.findOne({ email });
      
      if ( (!investor) && (!lawyer) && (!reviewer) && (!admin) ) return res.status(400).json({ error : "Email does not exist" });
      
      console.log('testt')

      if (investor){
        console.log('1')
        const match = bcrypt.compareSync(password, investor.password);
        if (match) {
          if (investor.active===true){
            const payload = {
                id: investor._id,
                email: investor.email,
                type:'investor'
              };
              const token = jwt.sign(payload, tokenKey, { expiresIn: "1h" });
              return res.json({data: `Bearer ${token}`})
            }else {
              return res.json({data:'You need to verify the email that is used in registeration'})
            }
            }else return res.status(400).send({ error: "Wrong password" });
      }
      else if (lawyer){
        console.log('2')
        const match = bcrypt.compareSync(password, lawyer.password);
        if (match) {
            const payload = {
                id: lawyer._id,
                email: lawyer.email,
                type:'lawyer'
              };
              const token = jwt.sign(payload, tokenKey, { expiresIn: "1h" });
              return res.json({data: `Bearer ${token}`})
            }else return res.status(400).send({ error: "Wrong password" });
      }
      else if (reviewer) {
        console.log('3')
        const match = bcrypt.compareSync(password, reviewer.password);
        if (match) {
            const payload = {
                id: reviewer._id,
                email: reviewer.email,
                type:'reviewer'
              };
              const token = jwt.sign(payload, tokenKey, { expiresIn: "1h" });
              return res.json({data: `Bearer ${token}`})
            }else return res.status(400).send({ error: "Wrong password" });
      }
      else if (admin){
        console.log('4')
        const match = bcrypt.compareSync(password, admin.password);
        if (match) {
            const payload = {
                id: admin._id,
                email: admin.email,
                type:'admin'
              };
              const token = jwt.sign(payload, tokenKey, { expiresIn: "1h" });
              return res.json({data: `Bearer ${token}`})
            }else return res.status(400).send({ error: "Wrong password" });
      }

      

    } 
    catch (e) {
        console.log(e)
    }
  },

  register : async (req, res) => {
    const { firstName ,MiddleName,LastName,email,password,
            ID_type,SSID, Nationality,Type,Address, birthdate,
            telephone_number, gender, photoID } = req.body
    
    const user = await Investor.findOne({ email })
    const admin = await Admin.findOne({ email })
    const lawyer = await Lawyer.findOne({ email })
    const reviewer = await Reviewer.findOne({ email })
    console.log(user)
    if (user || admin || lawyer || reviewer)
    {
        console.log('Email Exists')
        return res.status(400).json({ error: 'Email already exists' })
    }
    else{
      const payload = {
        email: email,
        type:'investor'
      };
      const token = jwt.sign(payload, tokenKey, { expiresIn: "1h" });
      const salt = bcrypt.genSaltSync(10); 
      const hashPass = bcrypt.hashSync(password, salt);
            const investor1 = await Investor.create({
                firstName : firstName ,
                MiddleName : MiddleName ,
                LastName : LastName ,
                email : email,
                password : hashPass ,
                ID_type : ID_type,
                SSID : SSID,
                Nationality : Nationality,
                Type : Type,
                Address : Address,
                birthdate : birthdate,
                telephone_number : telephone_number,
                gender : gender,
                active : false,
                photoID: photoID,
                secret : token
            })
            console.log(investor1.secret)
            res.json({ msg: 'registere Succefully', data: investor1 })
            const html = 'Hi there, <br/> Thank you for registering <br/><br/> Please verify your email by clicking on the following page:<a href= "http://localhost:3001/verify/'+investor1.secret+'">Click here to verify</a></br></br> '
            await mailer.sendEmail(config.user, req.body.email, 'Please verify your email', html)
    }
},


verify: async (req,res) => {
    try{
        const user = await Investor.findOne({"secret":req.params.tok})
        const update = await Investor.findByIdAndUpdate( user._id,{"active" :true})
    }
    catch(error){
        console.log(error)
        res.json({message:'error'})
    }
},

forgotPassword: async (req, res) => {
  const email = req.body.email;
  const investor = await Investor.findOne({ email });
  const lawyer = await Lawyer.findOne({ email });
  const reviewer = await Reviewer.findOne({ email });
  const admin = await Admin.findOne({ email });

  if ( (!investor) && (!lawyer) && (!reviewer) && (!admin) ) return res.status(400).json({ error : "Email does not exist" });
  
  else{
    let token
    if (investor){
      token = jwt.sign({
        type:'investor',
        email:email
        }, tokenKey, { expiresIn: "1h" })
        investor.secret = token;
        investor.save();
    }
    if (lawyer){
      token = jwt.sign({
        type:'lawyer',
        email:email
        }, tokenKey, { expiresIn: "1h" })
        lawyer.secret = token;
        lawyer.save();
    }
    if (reviewer){
      token = jwt.sign({
        type:'reviewer',
        email:email
        }, tokenKey, { expiresIn: "1h" })
        reviewer.secret = token;
        reviewer.save();
    }
    if (admin){
      token = jwt.sign({
        type:'admin',
        email:email
        }, tokenKey, { expiresIn: "1h" })
        admin.secret = token;
        admin.save();
    }
          

          let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: config.user,
                  pass: config.pass
              }

          });
          let mailOptions = {
              from: '"Angry Nerds 👻" <angry.nerds2019@gmail.com>', // sender address
              to: email ,
              subject: 'Resetting Password', // Subject line
              text: 'reset Link expires in 1 hour', // plain text body
              html: '<h3>The code expires within an hour</h3> <br> <p>Click <a href="http://localhost:3001/resetPassword/' + token + '">here</a> to reset your password</p>'
          };
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return res.status(400).json({ message: 'please try again' })
              }
              res.status(200).json({ success: true, message: 'An email has been sent check your email' });
          });
      }
},
resetPassword:async (req,res) =>{
  try{
      const password = req.body.password
      const salt = bcrypt.genSaltSync(10); 
      const hashPass = bcrypt.hashSync(password, salt);
      const token = req.params.tok
      const decoded = jwt.decode(token)
      if (decoded.type==='investor'){
        const investor = await Investor.findOne({"secret":req.params.tok});
        investor.password = hashPass;
        investor.save();
      }
      else if (decoded.type==='lawyer'){
        const lawyer = await Lawyer.findOne({"secret":req.params.tok});
        lawyer.password = hashPass;
        lawyer.save();
      }else if (decoded.type==='reviewer'){
        const reviewer = await Reviewer.findOne({"secret":req.params.tok});
        reviewer.password = hashPass;
        reviewer.save();
      }else if (decoded.type==='admin'){
        const admin = await Admin.findOne({"secret":req.params.tok});
        admin.password = hashPass;
        admin.save();
      }
  }
  catch(e)
  {

  }
}


};

module.exports = UserController;
