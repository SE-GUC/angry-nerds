const validator = require("../../validations/caseValidations");
const stripe = require("stripe")("sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0");
const Case = require("./../models/Cases");
const Investor = require("./../models/Investor");
const AdminController = require("./AdminController");
const Notification = require("./../models/Notifications");
const Admins = require("./../models/Admin");
const express = require("express");
const caseFunctions = require('../routes/api/Cases')
const router = express.Router();
const mongoose = require("mongoose");
const pdfMakePrinter = require("pdfmake/src/printer");

const pdfMake = require('pdfmake')

const Laws = require('./../models/Laws')
const Reviewer = require("./../models/Reviewer");
const Lawyer = require("./../models/Lawyer");
const config = require("../../config/mailer");
const tokenKey = config.tokenKey;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const passport = require("passport");
require("../../config/passport")(passport);

let InvestorController = {
    //authenticate: passport.authenticate("jwt", { session: false }),

    /* 
      this is a function that takes a request body that contains credit card info
      it creates a token of this info and then it creates a charge
      when the payment is successfully complete the case status is changed to published
      */

    InvestorPayFees: async function (req, res) {

        console.log(req.body);
        const invID = "5ca772654d70710fa843bd5f"; //get this from login token
        const CaseID = req.body.caseID;
        const myCase = await Case.findById(CaseID);
        const inv = await Investor.findOne({ _id: invID });
        const userEmail = inv.email;
        if (!myCase) return res.json({ message: "this case does not exist" });

        if (myCase.caseStatus !== "pending") {
            console.log(myCase);
            return res
                .status(400)
                .json({ message: "company is not ready for payment" });
        }

        if (myCase.investorID == invID) {
            stripe.tokens.create(
                {
                    card: {
                        number: req.body.creditNumber,
                        exp_month: req.body.month,
                        exp_year: req.body.year,
                        cvc: req.body.cvc
                    }
                },
                async function (err, token) {
                    console.log("myError");
                    console.log(err);
                    if (err) return res.status(400).json({ message: "card declined" });
                    else {
                        //use axios to get amount
                        const response = await axios.get(
                            "http://127.0.0.1:3000/calculateFees/" + CaseID
                        );
                        console.log("the response is :", response);
                        const chargeAmount = response.data.fees * 100;
                        console.log("my charge amount is:   " + chargeAmount);
                        const charge = stripe.charges.create(
                            {
                                amount: chargeAmount,
                                currency: "usd", // currency from database case
                                source: token.id
                            },
                            async function (err) {
                                if (err) {
                                    return res.status(400).json({
                                        message: "your card is declined, try again!" + err
                                    });
                                } else {
                                    const casecreated = await Case.findByIdAndUpdate(CaseID, {
                                        caseStatus: "published"
                                    });
                                    // let transporter = nodemailer.createTransport({
                                    //     service: 'gmail',
                                    //     auth: {
                                    //         user: 'angry.nerds2019@gmail.com',
                                    //         pass: 'Angry1234'
                                    //     }

                                    // });
                                    // let mailOptions = {
                                    //     from: '"Angry Nerds 👻" <angry.nerds2019@gmail.com>', // sender address
                                    //     to: userEmail, // list of receivers
                                    //     subject: 'Invoice', // Subject line
                                    //     text: 'you now have a company', // plain text body
                                    //     html: '<h3>The code expires within an hour</h3> '
                                    //     // html body
                                    // };
                                    // transporter.sendMail(mailOptions, (error, info) => {
                                    //     if (error) {
                                    //         return console.log(error);
                                    //     }
                                    //     res.json({ success: true, message: 'An email has been sent check your email' });
                                    // });
                                    return res.json({
                                        message:
                                            "your payment has been made; you will receive an invoice via your mail",
                                        data: casecreated
                                    });
                                }
                            }
                        );
                    }
                }
            );
        } else
            return res.status(400).json({
                message: "you cannot pay for a company that is not yours"
            });

        //console.log(req.body)
    },

    InvestorViewFees: async function (req, res) {
        try {
            const id = req.params.id;
            const projection = { _id: 0, Fees: 1 };
            const Cases = await Case.findById(id, projection);
            if (!Cases) {
                res.json({ msg: "Can not find company" });
            } else {
                console.log(Cases);
                res.json({ data: Cases, msg: "This is your fees" });
            }
        } catch {
            res.json({ msg: "Cannot find company" });
        }
    },

    /* delete cases with investor_id and the case is not published yet*/

    deleteInvestor: async id => {
        try {
            //  const id = req.params.id
            mongoose.set("useFindAndModify", false);
            const deletedInvestor = await Investor.findByIdAndRemove(id);
            const query = { investorID: id };
            const deletedCases = await Case.find(query);
            for (let i = 0; i < deletedCases.length; i += 1) {
                if (deletedCases[i].caseStatus !== "published") {
                    await Case.findByIdAndRemove(deletedCases[i]._id);
                    // delete cases controller to be called
                }
            }
            return;
        } catch (error) { }
    },

    investorFillForm: async (req, res) => {
        try {
            const id = "5c93ac9555b21722fc46eb9b"; //From Token
            const investor = await Investor.findById(id);

            if (!investor) {
                return res
                    .status(404)
                    .send({ error: "You are not allowed to fill this form" });
            }

            console.log(req.body)
            req.body.investorID = id

            const check = await caseFunctions.CheckForms(req.body)
            console.log('check')
            console.log(check)

            if (check !== 'Done') {
                return res.status(400).json(check)
            }

            const newForm = await Case.create(req.body);
            const casecreated = await Case.findByIdAndUpdate(newForm._id, {
                investorID: id,
                caseStatus: "lawyer-investor",
                walk_in: false,
                locked: false,
                log: [
                    {
                        id: id,
                        destination: "lawyer",
                        date: new Date()
                    }
                ]
            });
            console.log(newForm)
            console.log(casecreated)
            res.json({ msg: "The form was created successfully" });
        } catch (error) {
            console.log(error);
            return res.status(404).send({ error: "Form cant be created" });
        }
    },

    investorUpdateForm: async (req, res) => {
        try {
            const id = req.params.id;
            const investorid = "5c9911dcb757601b7c691fa6";  //tokennnnn
            const investor = await Investor.findById(investorid);
            const form = await Case.findById(id);
            if (!investor)
                return res
                    .status(404)
                    .send({ error: "You are not allowed to update this form" });
            if (!form)
                return res
                    .status(404)
                    .send({ error: "The form you are trying to update does not exist" });
            const updatedForm = await Case.findByIdAndUpdate(id, req.body);
            res.json({ msg: "Form updated successfully" });
        } catch (error) {
            return res.status(404).send({ error: "Form cant be updated" });
        }
    },

    investorViewComment: async (req, res) => {
        try {
            const formid = req.params.idf;
            const investorid = "5caea6cf656a5b5b52c79e9e"; //tokennnnnnnn
            const investor = await Investor.findById(investorid);
            const form = await Case.findById(formid);
            /*console.log(form)
                  console.log(formid)
                  console.log(form.investorID)
                  console.log(investorid)*/
            if (!form)
                return res.status(404).send({ error: "The form does not exist" });
            if (!investor)
                return res
                    .status(404)
                    .send({
                        error:
                            "You are not allowed to view this comment, You are not an investor"
                    });
            if (form.investorID.toString() === investorid.toString()) {
                //  console.log('hhhhhhhhhhhhhhhhhhhhhhh')
                return res.json({ data: form.comment });
            } else {
                return res
                    .status(404)
                    .send({
                        error:
                            "You are not allowed to view this comment, You are not the investor of this company"
                    });
            }
        } catch (error) {
            console.log(error);
            return res.status(404).send({ error: "Comment cant be viewed" });
        }
    },

    investorViewProfile: async (req, res) => {
        try {
            const investorId = '5cae8dce70fe6265f034aa00' //tokennnn
            const investor = await Investor.findById(investorId)
            if (!investor)
                return res.status(404).send({ error: 'Investor doesnt exist ' });
            else
                console.log('OK')
            return res.status(200).json({ msg: 'Done', data: investor })


        }
        catch (error) {
            console.log(error)
        }
    },

    /*
          PUT request to change password of the investor
          PARAMS:{ investorID: String }
          BODY:{   oldPassword: String,
                   newPassword: String }
          * Checks if the investor is in the database,
          then checks if the oldPassword matches the one in the database.
          Then changes the password in the database.   
          RETURNS 404 NOT FOUND: if the ID is not in the database.
                  403 FORBIDDEN: if the old password does not match the password in the database.
                  200 OK: if the password is updated.  
                  400 BAD REQUEST: if an exception is thrown.   
      */
    investorChangePassword: async function (req, res) {
        try {
            const id = req.params.id
            const oldPassword = req.body.oldPassword
            const newPassword = req.body.newPassword
            let investor = await Investor.findById(id)
            if (!investor) {
                return res.status(404).json({ error: 'Cannot find an investor account with this ID' })
            }
            else {
                if (oldPassword != investor.password) {
                    return res.status(403).json({ error: 'Incorrect old password' })
                }
                else {
                    const updatedInvestor = await Investor.findByIdAndUpdate(id, {
                        'password': newPassword
                    })
                    investor = await Investor.findById(id)
                    return res.status(200).json({ msg: 'The password was updated', data: investor })
                }
            }
        }
        catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })

        }
    },

    /*
        GET request to view the notifications of the investor.
        PARAMS:{ investorID: String }
        * Checks if the investor is in the database,
        then checks gets thier notifications.   
        RETURNS 404 NOT FOUND: if the ID is not in the database.
                200 OK: if it pereforms the query.
                400 BAD REQUEST: if an exception is thrown.   
    */
    investorMyNotifications: async function (req, res) {
        try {
            // const id = '5ca772654d70710fa843bd5f'
            const id = req.params.id
            let investor = await Investor.findById(id)
            if (!investor) {
                return res.status(404).json({ error: 'Cannot find an investor account with this ID' })
            }
            else {
                let notifications = investor.notifications
                return res.status(200).json({ msg: 'Done' , data: notifications })
            }

        }
        catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })
        }
    }, 


    

    /*
        GET request to view the published companies of the investor.
        PARAMS:{ investorID: String }
        * Checks if the investor is in the database,
        then checks gets thier published cases.   
        RETURNS 404 NOT FOUND: if the ID is not in the database.
                200 OK: if it pereforms the query.
                400 BAD REQUEST: if an exception is thrown.   
    */
    viewMyPublishedCompanies: async function (req, res) {
        try {
            // const id = req.params.id
            const ids = '5cbdc3fb68600e2298ebdded' // will take from login
            let investor = await Investor.findById(ids)
            if (!investor) {
                return res.status(404).json({ error: 'Cannot find an investor account with this ID' })
            }
            else {
                let cases = await Case.find({ 'caseStatus': 'published', 'investorID': ids })
                return res.status(200).json({ msg:'Done',data: cases })
            }

        }
        catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })
        }
    },

    /*
       GET request to view the published companies of the investor.
       PARAMS:{ investorID: String }
       * Checks if the investor is in the database,
       then checks if the caseStatus != 'published'.   
       RETURNS 404 NOT FOUND: if the ID is not in the database.
               200 OK: if it pereforms the query.
               400 BAD REQUEST: if an exception is thrown.   
   */
    viewMyPendingCompanies: async function (req, res) {
        try {
            //  const id = req.params.id
            const ids = '5cbdc3fb68600e2298ebdded' // will take from login
            let investor = await Investor.findById(ids)
            if (!investor) {
                return res.status(404).json({ error: 'Cannot find an investor account with this ID' })
            }
            else {
                let cases = await Case.find({ 'caseStatus': { $ne: 'published' }, 'investorID': ids})
                return res.status(200).json({ msg: 'Done', data: cases })
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: "Error processing query." });
        }
        },


    returnStyle(field) {    
        const arabic = /[\u0600-\u06FF]/
        if(arabic.test(field)){
            return {text: field, style: 'normal_arabic'}
        }
        else{
            return {text: field, style: 'normal_english'}
        }
    },

/*
      GET method to generate a   contract based on the case object.
      PARAMS:{ caseID: String }
      * Checks if the case is in the database,
      then constructs the docDefinition constant based on the data in the c object (case),
      then it uses the "pfdmake" library to constryct a pdf file,
      then it converts it to a base64 string and send it to the client.
      RETURNS 404 NOT FOUND: if the ID is not in the database.
              200 OK: if it pereforms the pdf construction.
              400 BAD REQUEST: if an exception is thrown.  
  */
generatePdf: async function(req, res) {
    try {
        const id = req.params.id;
        const c = await Case.findById(id);

        if (!c) {
            return res
                .status(404)
                .json({ error: "Cannot find an case with this ID" });
        } else {

            const arabic = /[\u0600-\u06FF]/
            const investor = await Investor.findById(c.investorID)



            let title1 = '\n ' + 'النظام الأساسي'
            title1 = title1.split(" ").reverse().join(" ")

            let title2 = '\n ' + 'لشركــــة' + c.arabic_name 
            title2 = title2.split(" ").reverse().join(" ")

            let title3 = '\n ' +  'شركـــة شخص واحد' 
            title3 = title3.split(" ").reverse().join(" ")

            let title4 = ' خاضعة لأحكام قانون شركات المساھمة وشركات التوصیة بالأسھم والشركات ذات المسئولیة المحدودة وشركات'
            title4 = title4.split(" ").reverse().join(" ")

            let title5 = '\n ' + 'الشخص الواحد الصادر بالقانون رقم ١٥٩ لسنة ١٩٨١' 
            title5 = title5.split(" ").reverse().join(" ")


            let title6 = '\n ' + 'رقم العقد'
            title6 = title6.split(" ").reverse().join(" ")

            let text1 = 'إنھ في یوم الثلاثاء الموافق  تم إقرار ھذا النظام الأساسي وفقا للمواد الآتیة'
            text1 = text1.split(" ").reverse().join(" ")



            ///////////////

            let title7 = 'تمھید'

            let text2 = ''
            let text3 = ''
            if(c.regulated_law === '72'){
                text2 = 'في إطار أحكام القانون المصري وافق الموقع على هذا النظام الأساسي على تأسيس شركة شخص واحد تحت اسم'
                text2 = text2.split(" ").reverse().join(" ")
                text3 = 'ولائحته التنفيذية وأحكام هذا النظام الأساسي' + ' \n ' +'ولائحته التنفيذية وقانون الاستثمار الصادر بالقانون رقم ٢٧ لسنة ٧١٠٢ ، ويشار إليه فيما بعد باسم قانون الاستثمار' +' \n ' +'وقد وافق على تأسيس شركة شخص واحد مصرية الجنسية وفقاً لأحكام القوانين النافذة وعلى وجه الخصوص قانون الشركات' +' \n ' + 'إليها ، ويترتب على مخالفة ذلك سقوط التمتع بالحافز المشار إليه والتزام الشركة بسداد جميع المستحقات الضريبية ' +' \n ' + 'المادة ٢١ من اللائحة التنفيذية لقانون الاستثمار بغرض إنشاء مشروع استثماري جديد يتمتع بالحوافز الخاصة المشار' +' \n ' + 'لشركة أو منشأة قائمة وقت العمل بأحكام هذا القانون أو قام بتصفية تلك الشركة أو المنشأة خلال المدة المبينة بالبند ٢ من' +' \n ' + 'كما يقر أنه لم يقدم أو يساهم أو يستخدم في إنشاء أو تأسيس أو إقامة مشروع الاستثمار المتمتع بالحافز أياً من الأصول المادية' + ' \n\n ' +'وأنه غير محظور عليه تأسيس شركات طبقاً لأحكام القانون ' + ' \n ' + 'الواحد الصادر بالقانون رقم ٩٥١ لسنة ١٨٩١ ، ويشار إليه فيما بعد باسم قانون الشركات ، ما لم يكن قد رُد إليه اعتباره ،' + ' \n ' + '٣٦١ ، ٦٤١ من قانون شركات المساهمة وشركات التوصية بالأسهم والشركات ذات المسئولية المحدودة وشركات الشخص ' +  ' \n ' + 'أحكام عليه بعقوبة جناية أو جنحة مخلة بالشرف أو الأمانة أو بعقوبة من العقوبات المُشار إليها في المواد ٨٩ ، ٢٦١' + ' \n ' + 'ويقر الموقع على هذا النظام الأساسي بأنه قد توافرت فيه الأهلية اللازمة لتأسيس شركة شخص واحد ، وبأنه لم يسبق صدور' + ' \n\n ' + ' حيث قامت بإجراء المراجعة  اللازمة له' +' \n '+  'وتأسيساً على ذلك تقدم بهذا النظام الأساسي إلى الهيئة العامة للاستثمار والمناطق الحرة ،'
                text3 = text3.split(" ").reverse().join(" ")
            }
            else{
                if(c.regulated_law === '159'){
                    text2 = 'في إطار أحكام القانون المصري وافق الموقع على هذا النظام الأساسي على تأسيس شركة شخص واحد تحت اسم'
                    text2 = text2.split(" ").reverse().join(" ")
                    text3 = 'ولائحته التنفيذية' + ' \n '+'وقد أقر المؤسس بالالتزام بأحكام هذا النظام الأساسي وأحكام القانون المصري، وبصفة خاصة قانون الشركات المشار إليه' + ' \n\n ' +'وأنه غير محظور عليه تأسيس شركات طبقاً لأحكام القانون ' + ' \n ' + 'الواحد الصادر بالقانون رقم ٩٥١ لسنة ١٨٩١ ، ويشار إليه فيما بعد باسم قانون الشركات ، ما لم يكن قد رُد إليه اعتباره ،' + ' \n ' + '٣٦١ ، ٤٦١ من قانون شركات المساهمة وشركات التوصية بالأسهم والشركات ذات المسئولية المحدودة وشركات الشخص ' +  ' \n ' + 'أحكام عليه بعقوبة جناية أو جنحة مخلة بالشرف أو الأمانة أو بعقوبة من العقوبات المُشار إليها في المواد ٨٩ ، ٢٦١' + ' \n ' + 'ويقر الموقع على هذا النظام الأساسي بأنه قد توافرت فيه الأهلية اللازمة لتأسيس شركة شخص واحد ، وبأنه لم يسبق صدور' + ' \n\n ' + ' حيث قامت بإجراء المراجعة  اللازمة له' +' \n '+  'وتأسيساً على ذلك تقدم بهذا النظام الأساسي إلى الهيئة العامة للاستثمار والمناطق الحرة ،'
                    text3 = text3.split(" ").reverse().join(" ")
                }
            }
           
            let title8 = ' الماده ١ '
            title8 = title8.split(" ").reverse().join(" ")
            let text4 = ' اسم الشركة '
            text4 = text4.split(" ").reverse().join(" ")
            let text5 = ' شركة شخص واحد محدودة المسئولیة '
            text5 = text5.split(" ").reverse().join(" ")

            let title9 = ' ' + 'الماده ٢ '
            title9 = title9.split(" ").reverse().join(" ")

            let text6 = 'بیانات مؤسس الشركة'
            text6 = text6.split(" ").reverse().join(" ")

            let header1 = 'تاریخ المیلاد'
            header1 = header1.split(" ").reverse().join(" ")

            let header2 = 'إثبات الشخصیة'
            header2 = header2.split(" ").reverse().join(" ")

            let title10 = ' ' + 'الماده ٣ '
            title10 = title10.split(" ").reverse().join(" ")

            let text7 = 'يكون المركز الرئيسى لإدارة الشركة ومحلها القانوني في العنوان الآتى'
            text7 = text7.split(" ").reverse().join(" ")

            let text10 = 'مصر العربية بموافقة مؤسس أو مالك الشركة ' +' \n ' + 'لها داخل جمهورية مصر العربية أو خارجها ، وللشركة أن تقرر نقل المركز الرئيسي لها إلى أي مدينة أخرى داخل جمهورية'+' \n '+'مع مراعاة القانون رقم ٤١ لسنة ٢١٠٢ بشأن التنمية المتكاملة في شبه جزيرة سيناء ، لمدير الشركة إنشاء فروع أو وكالات'
            text10 = text10.split(" ").reverse().join(" ")

            let title11 = ' ' + 'الماده ٤ '
            title11 = title11.split(" ").reverse().join(" ")

            let text8 = 'حدد رأسمال الشركة بمبلغ'
            text8 = text8.split(" ").reverse().join(" ")

            let text9 = 'جنیھ مصرى، وقد أودع رأسمال الشركة بالكامل في البنك بموجب الشھادة المرفقة'
            text9 = text9.split(" ").reverse().join(" ")

            let title12 = ' ' + 'الماده ٥ '
            title12 = title12.split(" ").reverse().join(" ")

            let text11 =   'حصص ، وذلك بقرار من مؤسس أو مالك الشركة وطبقا للأحكام المنصوص عليها في قانون الشركات' +' \n '+ 'يجوز زيادة رأس مال الشركة على دفعة واحدة أو أكثر ، سواء بإصدار حصص جديدة أو بتحويل المال الاحتياطي إلى'
            text11 = text11.split(" ").reverse().join(" ")

            let title13 = ' ' + 'الماده ٦ '
            title13 = title13.split(" ").reverse().join(" ")

            let text12 = ''
            if(c.currency === 'EGP'){
                text12 = 'ولا يجوز تخفيض رأس المال إلى أقل من خمسين ألف جنيه ' + ' \n ' +  'القيمة الاسمية لكل منها ، وفقاً لأحكام قانون الشركات ولائحته التنفيذية ' +  ' \n ' + 'لمؤسس أو مالك الشركة أن يقرر تخفيض رأس مال الشركة لأي سبب ، سواء عن طريق إنقاص عدد الحصص أو تخفيض'
            }
            else{
                text12 = 'ولا يجوز تخفيض رأس المال إلى أقل من ما يعادل خمسين ألف جنيه ' + ' \n ' +  'القيمة الاسمية لكل منها ، وفقاً لأحكام قانون الشركات ولائحته التنفيذية ' +  ' \n ' + 'لمؤسس أو مالك الشركة أن يقرر تخفيض رأس مال الشركة لأي سبب ، سواء عن طريق إنقاص عدد الحصص أو تخفيض'
            }
            text12 = text12.split(" ").reverse().join(" ")

            let title14 = ' ' + 'الماده ٧ '
            title14 = title14.split(" ").reverse().join(" ")

            let text13 = 'يتولى إدارة الشركة مؤسس الشركة أو مدير أو أكثر يعينهم مؤسس الشركة على النحو التالي'
            text13 = text13.split(" ").reverse().join(" ")

            let title15 = ' ' + 'الماده ٨ '
            title15 = title15.split(" ").reverse().join(" ")

            let text14 = ''
            if(c.regulated_law === '159'){
                text14 = 'تسري على الشركة أحكام قانون الشركات ولائحته التنفيذية فيما لم يرد بشأنه نص خاص في هذا النظام '
            }else{
                if(c.regulated_law === '72')
                text14 = 'تسري على الشركة أحكام قانون الشركات وقانون الاستثمار ولائحتيهما التنفيذية فيما لم يرد بشأنه نص خاص في هذا النظام '
            }
            text14 = text14.split(" ").reverse().join(" ")

            let title16 = ' ' + 'الماده ٩ '
            title16 = title16.split(" ").reverse().join(" ")

            let text15 = 'ينشر هذا النظام طبقا لأحكام القانون '
            text15 = text15.split(" ").reverse().join(" ")

            let title17 = ' ' + 'الماده ٠١ '
            title17 = title17.split(" ").reverse().join(" ")

            let text16 ='المصروفات العامة' + ' \n ' + 'وتلتزم الشركة بأداء المصروفات والنفقات والأجور والتكاليف التي تم انفاقها بسبب تأسيس الشركة ، وذلك خصماً من حساب ' + ' \n ' + 'قام مؤسس الشركة بشخصه باتخاذ كافة الإجراءات اللازمة في هذا الشأن '
            text16 = text16.split(" ").reverse().join(" ")

            let tableOwnerBody = [ InvestorController.returnStyle(investor.Address),
                InvestorController.returnStyle(investor.ID_type),
                {text: investor.birthdate.toDateString(), style: 'normal_english'},
                InvestorController.returnStyle(investor.Nationality),
                InvestorController.returnStyle( investor.firstName + ' ' + investor.lastName),
                {text: '١', style: 'normal_arabic'} ]

            let tableManagersBody = []
            console.log(c.managers)
            tableManagersBody.push([ {text:'الإقامة',style: 'normal_arabic'},{text: header2 ,style: 'normal_arabic'},
            {text: header1, style: 'normal_arabic'},{text: 'الجنسیة',style: 'normal_arabic'},
            {text:'الاسم' ,style: 'normal_arabic'}, {text:'م',style: 'normal_arabic'} ])
            c.managers.map((manager,index) => {
                console.log('manager #',index, ' : ',manager, 'birthdate: >>> ',manager.birthdate, ' firstname >>> ',manager.firstName)
                tableManagersBody.push( [ InvestorController.returnStyle(manager.Address),
                    InvestorController.returnStyle(manager.ID_type),
                    {text: manager.birthdate.toDateString(), style: 'normal_english'},
                    InvestorController.returnStyle(manager.Nationality),
                    InvestorController.returnStyle( manager.firstName + ' ' + manager.lastName),
                    {text: index, style: 'normal_english'} ] )
            })    

            const docDefinition = {
                header: {
                    margin: 10,
                    alignment: 'right',
                    columns: [
                        {
                            // usually you would use a dataUri instead of the name for client-side printing
                            // sampleImage.jpg however works inside playground so you can play with it
                            image: 'client/src/Images/logo.png',
                            width: 70,
                        },
                        // {
                        //     margin: [10, 0, 0, 0],
                        //     text: 'Here goes the rest'
                        // }
                    ]
                },
                // header: 
                //     {image: 'client/src/Images/logo.png',
                //     alignment: 'right',
                //     opacity: 0.8
                //     },
                
                footer: function(currentPage, pageCount) { return {text: currentPage.toString() + ' of ' + pageCount, alignment: 'center' }},
                content: [
                    
                    {text: title1,
                    style: 'center_arabic'},
                    {text: [
                        {text: c.english_name,
                        style: 'center_english'},
                        {text: title2,
                        style: 'center_arabic'}
                    ]},
                    {text: title3,
                    style: 'center_arabic'},
                    {text: title4,
                    style: 'center_arabic'},
                    {text: title5,
                    style: 'center_arabic'},
                    {text: [
                        {text: c._id,
                        style: 'code_center'},
                        {text: title6,
                        style: 'center_arabic'},  
                    ]},
                    {text: text1,
                    style: 'normal_arabic'},
                    {text: title7,
                    style: 'center_arabic'},   
                    {text: text2,
                    style: 'normal_arabic'},
                    {text: [
                        {text: ' ' + c.english_name + ' ',
                        style: 'center_english_normal'},
                        {text: c.arabic_name,
                        style: 'center_arabic_normal'},
                    ]},
                    {text: text3,
                    style: 'normal_arabic'},
                    {text: title8,
                    style: 'center_arabic'},
                    {text: [
                        {text: text5,
                        style: 'normal_arabic'},
                        {text: c.arabic_name,
                        style: 'normal_arabic'},
                        {text: ' ' + c.english_name + ' ',
                        style: 'normal_english'},
                        {text: text4,
                        style: 'normal_arabic'},
                    ]},
                    {text: title9,
                    style: 'center_arabic'},
                    {text: text6,
                    style: 'normal_arabic'},
                    {
                        table: {
                          
                          headerRows: 1,
                          widths: [ '*', '*', '*', '*','*','*' ],
                          alignment: 'right',
                          body: [
                            [ {text:'الإقامة',style: 'normal_arabic'},{text: header2 ,style: 'normal_arabic'},
                              {text: header1, style: 'normal_arabic'},{text: 'الجنسیة',style: 'normal_arabic'},
                              {text:'الاسم' ,style: 'normal_arabic'}, {text:'م',style: 'normal_arabic'} ],
                              tableOwnerBody
                          ]
                        }
                      },
                    {text: title10 + '\n',
                    style: 'center_arabic'},  
                    {text:[
                        InvestorController.returnStyle(' ' + c.address + ' ' + c.city + ' ' + c.governorate + ' '), 
                        {text: text7,
                        style: 'normal_arabic'},
                    ]},
                    {text: text10,
                    style: 'normal_arabic'},
                    {text: title11,
                    style: 'center_arabic'},
                    {text:[
                        {text: text9,
                        style: 'normal_arabic'},
                        {text: ' ' + c.equality_capital + ' ',
                        style: 'normal_english'},
                        {text: text8,
                        style: 'normal_arabic'}
                    ]}  ,
                    {text: title12,
                    style: 'center_arabic'},
                    {text: text11,
                    style: 'normal_arabic'},
                    {text: title13,
                    style: 'center_arabic'},
                    {text: text12,
                    style: 'normal_arabic'},
                    {text: title14,
                    style: 'center_arabic'},
                    {text: text13,
                    style: 'normal_arabic'},
                    {
                        table: {
                          
                          headerRows: 1,
                          widths: [ '*', '*', '*', '*','*','*' ],
                          alignment: 'right',
                          body: tableManagersBody
                        }
                      },
                    {text: title15,
                    style: 'center_arabic'},
                    {text: text14,
                    style: 'normal_arabic'},
                    {text: title16,
                    style: 'center_arabic'},
                    {text: text15,
                    style: 'normal_arabic'},
                    {text: title17,
                    style: 'center_arabic'},
                    {text: text16,
                    style: 'normal_arabic'},

                ],
        
                styles: {
                    center_arabic: {
                        fontSize: 10,
                        bold: true,
                        alignment: 'center',
                        font: 'DroidKufi'
                    },
                    normal_arabic: {
                        fontSize: 10,
                        font: 'DroidKufi',
                        alignment: 'right'
                    },
                    center_english: {
                        alignment: 'center',
                        font: 'Times',
                        bold: true
                    },
                    normal_english: {
                        font: 'Times',
                        alignment: 'right'
                    },
                    code_center:{
                        font: 'Courier',
                        alignment: 'center'
                    },
                    center_english_normal:{
                        alignment: 'center',
                        font: 'Times',
                    },
                    center_arabic_normal:{
                        fontSize: 10,
                        alignment: 'center',
                        font: 'DroidKufi'
                    }
                },
                pageSize: 'A4',
                pageMargins: [ 17, 85, 17, 40 ],
                info: {
                    title: c.english_name + ' Contract',
                    author: 'GAFI',
                    subject: 'Legal contract for the to be established company of name ' + c.english_name,
                    keywords: 'Contract'
                  }
            };

            const fontDescriptors = {
                Roboto: {
                    normal: new Buffer(
                        require("pdfmake/build/vfs_fonts.js").pdfMake.vfs[
                        "Roboto-Regular.ttf"
                        ],
                        "base64"
                    )
                },
                NotoKufiArabic: {
                    normal: "fonts/NotoKufiArabic-Regular.ttf"
                   
                },
                DroidKufi: {
                    normal: "fonts/DroidKufi-Regular.ttf",
                    bold: "fonts/DroidKufi-Bold.ttf"
                       
                },
                Courier: {
                    normal: 'Courier',
                    bold: 'Courier-Bold',
                    italics: 'Courier-Oblique',
                    bolditalics: 'Courier-BoldOblique'
                },
                Times: {
                    normal: 'Times-Roman',
                    bold: 'Times-Bold',
                    italics: 'Times-Italic',
                    bolditalics: 'Times-BoldItalic'
                  }

                
            };
 
            const printer = new pdfMakePrinter(fontDescriptors);
            const doc = printer.createPdfKitDocument(docDefinition);

            let chunks = [];

            doc.on("data", chunk => {
                chunks.push(chunk);
            });

            doc.on("end", async () => {
                const result = Buffer.concat(chunks);
                await Case.findByIdAndUpdate(id, {
                    pdfString: result.toString("base64")
                });
                return res
                    .status(200)
                    .json({
                        msg: "Done",
                        data: "data:application/pdf;base64," + result.toString("base64")
                    });
            });

            doc.end();
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Error processing query." });
    }
},

//Displaying a List of all published companies
InvestorViewingPublishedCompanies: async (req, res) => {
    try {
        const Cas = await Case.find({ caseStatus: "published" }, projx);

        for (const i = 0; i < Cas.length; i++) {
            const projx = {
                _id: 0,
                reviewerID: 0,
                lawyerID: 0,
                investorID: 0,
                equality_capital: 0,
                currency: 0,
                fees: 0
            };
        }
        Cas = await Case.find({ caseStatus: "published" }, projx);

        res.json({ message: "Cases", data: Cas });
    } catch (error) {
        console.log(error);
    }
},

    //Viewing One specific Company
    InvestorViewingCompany: async (req, res) => {
        const id = req.params.id;
        const Cas = await Case.findById(id);

        try {
            if (Cas.caseStatus == "published") {
                const proj1 = {
                    _id: 0,
                    reviewerID: 0,
                    lawyerID: 0,
                    investorID: 0,
                    equality_capital: 0,
                    currency: 0,
                    fees: 0
                };
                Cas = await Case.findById(id, proj1);
                res.json({ message: "case", data: Cas });
            } else {
                res.json({ message: "Case was not published" });
            }
        } catch (error) {
            console.log(error);
        }
    },

        //Viewing a specific User of any type

        InvestorViewing: async (req, res) => {
            const proj = { _id: 0, password: 0 };
            const projy = { _id: 0, password: 0, ratings: 0 };
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
            
            
        },

            uploadFile: (req, res, next) => {
                const file = req.file;
                if (!file) {
                    const error = new Error("Please upload a file");
                    error.httpStatusCode = 400;
                    return next(error);
                }
                res.send(file);
            },
                InvestorRateLawyer: async function (req, res) {
                    const id = req.params.id // Lawyer ID
                    const invID = '5c78e4a73ba5f854b86f9058' //get this from login token
                    const CasID = '5c9517dff65058663c3010d7' //get this from frontend 
                    const Ratin = req.body.rating
                    const Comm = req.body.Comment
                    const aCase = await Case.findById(CasID)
                    const Lawy = await Lawyer.findById(id)
                    try {

                        if (!aCase)
                            res.json({ msg: 'this case does not exist' })
                        if (!Lawy)
                            res.json({ msg: 'not a lawyer, try again' })
                        else {
                            console.log('heeeerreeee')

                            console.log(Lawy.ratings)
                            for (let i = 1; i < rat.length; i++) {
                                if (rat[i].CaseID == CasID)
                                    res.json({ message: 'already rated the lawyer' })

                            }
                        }

                        if (aCase.investorID == invID && aCase.lawyerID == id) {
                            const newrate = [{ 'investorID': invID, 'CaseID': CasID, 'rating': Ratin, 'Comment': Comm }]
                            console.log(newrate)
                            const updat = await Lawyer.findOneAndUpdate(id, { $push: { ratings: newrate } })
                            res.json({ msg: 'Rating placed', Data: updat })
                        } else {
                            res.json({ msg: 'you are trying to access a case that is not yours or has a lawyer who did not work with you' })
                        }

                    }



                    catch (error) {
                        console.log(error)
                    }
                },


InvestorEditProfile: async (req, res) => {
    const InvestorID = '5cae8dce70fe6265f034aa00' //login token
    const newInvestor = await Investor.findById(InvestorID)
    if (!newInvestor)
        return res.status(400).json({ error: 'Not an investor' })
    const email = req.body.email
    const Investors = await Investor.findOne({ email })
    if (Investors)
        return res.status(400).json({ error: 'Email already exists' })
    else {
        const newInv = await Investor.findByIdAndUpdate(InvestorID, req.body)
        console.log('edited')
        return res.status(200).json({ msg: 'Investor was updated successfully', data: newInv })
        //  .catch(err => res.json('There was an error ,Try again later'))
    }

},


    forgotpassword: async (req, res) => {
        const userEmail = req.body.email;
        Investor.findOne({ email: userEmail }, function (err, user) {
            if (err) {
                res.json({ success: false, message: err.message });
            } else if (!user) {
                res.json({ success: false, message: "incorrect email" });
            } else {
                const token = jwt.sign(
                    {
                        _id: Investor._id,
                        firstname: user.firstname,
                        Type: "Investor"
                    },
                    tokenKey,
                    { expiresIn: "1h" }
                );

                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: config.user,
                        pass: config.pass
                    }
                });
                let mailOptions = {
                    from: '"Angry Nerds 👻" <angry.nerds2019@gmail.com>', // sender address
                    to: userEmail, // list of receivers
                    subject: "Resetting Password", // Subject line
                    text: "reset Link expires in 24 hours", // plain text body
                    html:
                        '<h3>The code expires within an hour</h3> <br> <p>Click <a href="http://localhost:3000//resetpass/' +
                        token +
                        '">here</a> to reset your password</p>'
                    // html body
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    user.token = token;
                    user.token_date = Date.now();
                    user.save();
                    res.json({
                        success: true,
                        message: "An email has been sent check your email"
                    });
                });
            }
        });
    },
        resetpassword: function(req, res) {
            const userToken = req.params.token;
            const newPassword = req.body.password;
            Investor.findOne({ token: userToken }, function (err, user) {
                if (err) {
                    res.json({
                        success: false,
                        message: "Token is expired please try again"
                    });
                } else {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(newPassword, salt, function (err, hash) {
                            user.password = hash;
                            user.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: err.message });
                                    console.log(err);
                                } else {
                                    res.json({
                                        success: true,
                                        message: "Password reseted succesfully"
                                    });
                                }
                            });
                        });
                    });
                }
            });
        },

     //this function called in frontend to make the investor be able to know the fees once he/she chooses the regulated law 
    CalcFeesImmediately: async function (req,res) {
        console.log('entered function')
        let fees = 0
        const regLaw = req.params.lawNumber
        const capital = req.params.capital
        const law = await Laws.findOne({ LawNumber: regLaw })        
        let fixedFees = 0
        let percentageFees = 0
        let message = ''
        if (law){
        for (let i = 0; i < law.fixedValues.length; i++) {
            fixedFees = fixedFees + law.fixedValues[i].value
            message = message + law.fixedValues[i].description + ' : ' + law.fixedValues[i].value + ' , '
        }
        let temp
        for (let i = 0; i < law.percentages.length; i++) {
            if(law.percentages[i].max < law.percentages[i].value/100 * capital){
                temp = law.percentages[i].max
                percentageFees = percentageFees + law.percentages[i].max
            }
            else{
                if(law.percentages[i].min > law.percentages[i].value/100 * capital){
                    temp = law.percentages[i].min
                    percentageFees = percentageFees + law.percentages[i].min
                }
                else{
                    temp = law.percentages[i].value/100 * capital
                    percentageFees = percentageFees + law.percentages[i].value/100 * capital
                }
            }
            if (i===law.percentages.length-1){
                 message = message + law.percentages[i].description + ' : ' + temp 
            }
            else{
                message = message + law.percentages[i].description + ' : ' + temp + ' , '
            }
        }
        const totalFees = fixedFees + percentageFees
        return res.status(200).json({fees: totalFees, invoice:message}) 
        }
        else{
            res.status(200).json({fees: '', invoice:''})
        }
    }
};

module.exports = InvestorController;
