//const lawyer = require('./tests/lawyerFunctions');
const adminFunctions = require('./tests/adminFunctions')
const investorFunctions = require('./tests/investorFunctions')
const userFunctions = require('./tests/userFunctions')
const Lawyer = require('./app/models/Lawyer')
const Question = require('./app/models/Questions')
const Reviewer = require('./app/models/Reviewer')
const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')
jest.setTimeout(30000)
const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')


//Hemaya before tests


test('Forgot password with valid mail', async () => {
  jest.setTimeout(30000)
  const t1 = await axios({
    method: 'post',
    url:'http://127.0.0.1:3000/api/admin',
    headers: {}, 
    data: {
      "FName": "FoFu",
      "MName": "Ramremo",
      "LName": "Gamd",
      "email": "modyjack71@gmail.com",
      "password": "cnjdqqcrjcsjn151215'",
      "gender": "Male",
      "Nationality": "Egyptian",
      "birthdate": "1980",
      "Address": "11 makram",
      "fax": "125252",
      "telephone_number": "151515",
      "total_number_of_cases": "588",
      "completed_number_of_cases": "561",
      "number_of_cases": "2",
      "total_time_on_cases": "25",
      "ssid": "15552"
    }
  });
  const msg =  await adminFunctions.MailForgotPassword(t1.data.data.email)
  await axios.delete('http://127.0.0.1:3000/api/admin/'+t1.data.data._id)
  expect(msg.data.message).toEqual('An email has been sent check your email');

});

test('Forgot password with invalid mail', async () => {
  const msg =  await adminFunctions.MailForgotPassword('Wrong_mail@gmail.com')
  expect(msg.data.message).toEqual('incorrect email');
});

test('Reset password with expired token', async () => {
  const msg =  await adminFunctions.MailResetPassword('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGTmFtZSI6IkZhZHkiLCJpYXQiOjE1NTQwNjU1MjMsImV4cCI6MTU1NDA2OTEyM30.ByMt8yx_wNQGwhxH00LD_2xAjJpzkS7SlaX3rOUB2nE','Fady2512')
  expect(msg).toEqual('Token is expired please try again');
});

test('Reset password with valid token', async () => {
  const t1 = await axios({
    method: 'post',
    url:'http://127.0.0.1:3000/api/admin',
    headers: {}, 
    data: {
      "FName": "Romba",
      "MName": "Ramremo",
      "LName": "Gamd",
      "email": "charbil.wasfalla@gmail.com",
      "password": "cnjdqqcrjcsjn151215'",
      "gender": "Male",
      "Nationality": "Egyptian",
      "birthdate": "1980",
      "Address": "11 makram",
      "fax": "125252",
      "telephone_number": "151515",
      "total_number_of_cases": "588",
      "completed_number_of_cases": "561",
      "number_of_cases": "2",
      "total_time_on_cases": "25",
      "ssid": "15552"
    }
  });
  const x = await adminFunctions.MailForgotPassword(t1.data.data.email)
  console.log('One',t1.data.data._id)
  const tok = await axios.get('http://127.0.0.1:3000/api/admin/'+t1.data.data._id)
  console.log('TWo', tok.data.data )
  console.log('Three',t1.data.data.token)
  const msg =  await adminFunctions.MailResetPassword(tok.data.data.token,'Fady22551122')
  await axios.delete('http://127.0.0.1:3000/api/admin/'+t1.data.data._id)
  expect(msg).toEqual('Password reseted succesfully');
})


// test('Forgot password with valid mail', async () => {
//   jest.setTimeout(30000)
//   const msg =  await Admin.MailForgotPassword('fady.wasfalla@gmail.com')
//   expect(msg).toEqual('An email has been sent check your email');
// });

// test('Forgot password with invalid mail', async () => {
//   const msg =  await Admin.MailForgotPassword('Wrong_mail@gmail.com')
//   expect(msg).toEqual('incorrect email');
// });

// test('Reset password with valid token', async () => {
//   const msg =  await Admin.MailResetPassword('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGTmFtZSI6Im1vbmljYSIsImlhdCI6MTU1NDA1Njk4NiwiZXhwIjoxNTU0MDYwNTg2fQ.JbMkTDaIJd4lkkjtxL3tVF9LyuiZw-Xh9KKFDNl5MuM','Fad5y2512')
//   expect(msg).toEqual('Password reseted succesfully');
// })






// test('investor fill form', async () => {
//   const msg =  await Investor.investorFillForm()
//   expect(msg.data.msg).toEqual('The form was created successfully');
// });
// test('investor update form', async () => {
//   const msg =  await Investor.investorFillForm()
//   expect(msg.data.msg).toEqual('The form was created successfully');
// });
// test('investor view comment', async () => {
//   const msg =  await Investor.investorFillForm()
//   expect(msg.data.msg).toEqual('The form was created successfully');
// });


// test('lawyer fill form', async () => {
//   const msg =  await Lawyer.lawyerFillForm()
//   expect(msg.data.msg).toEqual('The form was created successfully');
// });

// test('lawyer update form', async () => {
//   const msg =  await Lawyer.lawyerFillForm()
//   expect(msg.data.msg).toEqual('The form was created successfully');
// });

// /*test('lawyer view comment', async () => {
//   const msg =  await Lawyer.lawyerViewComment()
//   expect(msg.data.msg).toEqual('Done');
// });*/

// test('lawyer view lawyerLeaderBoard', async () => {
//   const msg =  await Lawyer.lawyerViewLawyersLeaderBoard()
//   expect(msg.data.msg).toEqual('Done');
// });

//   test('lawyer view reviewerLeaderBoard', async () => {
//     const msg =  await Lawyer.lawyerViewReviewersLeaderBoard()
//     expect(msg.data.msg).toEqual('Done');
//   });

  
  
// test ('Updates Password Investor with valid ID and valid old password', async () => {
//   var validInvestorID = "5c7a9b46470a360ac8b0d412"
//   var validOldPassword = "newPass"
//   var newPassword = "newPass"
//   //expect.assertions(1)
//   const response = await Investor.investorChangePassword(validInvestorID,validOldPassword,newPassword)
//   expect(response.data.msg).toEqual('The password was updated')
// })


// test ('Updates Password Investor with valid ID and invalid old password', async () => {
//   var validInvestorID = "5c7a9b46470a360ac8b0d412"
//   var validOldPassword = "x"
//   var newPassword = "newPass"
//   //expect.assertions(1)

//   try {
//     const response = await Investor.investorChangePassword(validInvestorID,validOldPassword,newPassword)
//   } catch (e) {
//     //console.log(e.response.data)
//     expect(e.response.data.error).toMatch('The passwords do not match');
//   }
  
// })

// test ('Updates Password Investor with invalid ID and valid old password', async () => {
//   var validInvestorID = "x"
//   var validOldPassword = "newPass"
//   var newPassword = "newPass"
//   //expect.assertions(1)

//   try {
//     const response = await Investor.investorChangePassword(validInvestorID,validOldPassword,newPassword)
//   } catch (e) {
//    // console.log(e.response.data)
//     expect(e.response.data.error).toMatch('Error processing query.');
//   }
  
// })

// test ('View notification of an investor', async () => {
//   var validInvestorID = "5c7a9b46470a360ac8b0d412"
//   //expect.assertions(1)
//     const response = await Investor.investorMyNotifications(validInvestorID)
//     //console.log(response)
//     expect(response.data.msg).toEqual('Done')
// })

//                  //// dany boy

// test(`case disaproves at lawyer and casestatus should be investor`, async () => {
//   const CASE =  await lawyer.caseDisAproveedAtLawyer('5c7a9b46470a360ac8b0d412','5c94df923c95ff18c8866d54')    // stafID+'/:'+caseID,
//   expect(CASE.data.msg).toEqual('Case disaproved')
// });

// test(`case aproved at lawyer and casestatus should be reviewer`, async () => {
//   const CASE =  await lawyer.caseAproveedAtLawyer('5c9e4dc353415c34a0f35cd1','5c93e0be81a45d15089ab710')    // stafID+'/:'+caseID,
//   expect(CASE.data.msg).toEqual('Case aproved')
// });


// test(`case disaproves at reviewer and casestatus should be lawyer`, async () => {
//   const CASE =  await lawyer.caseDisAproveedAtLawyer('5c7a9b46470a360ac8b0d412','5c94df923c95ff18c8866d54')    // stafID+'/:'+caseID,
//   expect(CASE.data.msg).toEqual('Case disaproved')
// });

// test(`case aproved at reviewer and casestatus should be pending`, async () => {
//   const CASE =  await lawyer.caseAproveedAtReviewer('5c7a9b46470a360ac8b0d412','5c94df923c95ff18c8866d54')    // stafID+'/:'+caseID,
//   expect(CASE.data.msg).toEqual('Case aproved')
// });






// //Admin tests

// test(`Editing company city to Alex`, async () => {
//     const company =  await adminFunctions.adminEditCompany('5c9507e0384b413494812ddb')
//     expect(company.data.data.city).toEqual('Alex')
//   });

//   test(`Editing company that does not exist`, async () => {
//     const company =  await adminFunctions.adminEditCompany('5c9502b9d2e00c0bc7a')
//     expect(company.data.message).toEqual('This id is not valid a company.')    
//   });

//   test('Delete a company that does not exist ', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.AdmDelCase('5c94e18af1eg6f3e48b0a2b8')
//     console.log('shiitt')
//     expect(id.data.message).toEqual('not a case')
//   });



//   test('Delete a company ', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.AdmDelCase('5c94e18af1ef0f3e48b0a2b8')
//     console.log('yeeh')
//     expect(id.data.message).toEqual('Case was deleted successfully')
//   });

//   test('Delete a Question that does not exist ', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.AdmDelQuestion('5c94e18af1eg6f3e48b0a2b8')
//     console.log('notQUessss')
//     expect(id.data.message).toEqual('not a ques')
//   });

//   test('Delete a Question ', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.AdmDelQuestion('5c77f15454746a2ec800e532')
//     console.log('Quessss')
//     expect(id.data.message).toEqual('This question was deleted successfully')
//   });

//   test('view as admin Inv', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.AdmViewing('5c93ac9555b21722fc46eb9b')
//     console.log('view')
//     expect(id.data.message).toEqual('investor')
//   });

//   test('view as admin Lawyer', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.AdmViewing('5c9e4dc353415c34a0f35cd1')
//     console.log('view')
//     expect(id.data.message).toEqual('lawyer')
//   });
//   test('view as admin Reviewer', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.AdmViewing('5c9f81974829dc64cc2c1d0e')
//     console.log('view')
//     expect(id.data.message).toEqual('Rev')
//   });

//   test('view as admin Admin', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.AdmViewing('5c9bb0dc5185793518ea84fb')
//     console.log('view')
//     expect(id.data.message).toEqual('Admin')
//   });

//   test('view as admin neither', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.AdmViewing('5c77f15454789a2ec800e532')
//     console.log('view')
//     expect(id.data.message).toEqual('User does not exist')
//   });
//   //----------------------------------------------
//   test('view as Inv Inv', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.InvViewing('5c93ac9555b21722fc46eb9b')
//     console.log('view')
//     expect(id.data.message).toEqual('investor')
//   });

//   test('view as Inv Lawyer', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.InvViewing('5c9e4dc353415c34a0f35cd1')
//     console.log('view')
//     expect(id.data.message).toEqual('lawyer')
//   });
//   test('view as Inv Reviewer', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.InvViewing('5c9f81974829dc64cc2c1d0e')
//     console.log('view')
//     expect(id.data.message).toEqual('Rev')
//   });

//   test('view as Inv Admin', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.InvViewing('5c9bb0dc5185793518ea84fb')
//     console.log('view')
//     expect(id.data.message).toEqual('Admin')
//   });

//   test('view as Inv neither', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.InvViewing('5c77f15454789a2ec800e532')
//     console.log('view')
//     expect(id.data.message).toEqual('User does not exist')
//   });
//   //----------------------------------------------
//   test('view as Rev Inv', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.RevViewing('5c93ac9555b21722fc46eb9b')
//     console.log('view')
//     expect(id.data.message).toEqual('investor')
//   });

//   test('view as Rev Lawyer', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.RevViewing('5c9e4dc353415c34a0f35cd1')
//     console.log('view')
//     expect(id.data.message).toEqual('lawyer')
//   });
//   test('view as Rev Reviewer', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.RevViewing('5c9f81974829dc64cc2c1d0e')
//     console.log('view')
//     expect(id.data.message).toEqual('Rev')
//   });

//   test('view as Rev Admin', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.RevViewing('5c9bb0dc5185793518ea84fb')
//     console.log('view')
//     expect(id.data.message).toEqual('Admin')
//   });

//   test('view as Rev neither', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.RevViewing('5c77f15454789a2ec800e532')
//     console.log('view')
//     expect(id.data.message).toEqual('User does not exist')
//   });
//   //----------------------------------------------
//   test('view as unreg Inv', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.UnregViewing('5c93ac9555b21722fc46eb9b')
//     console.log('view')
//     expect(id.data.message).toEqual('investor')
//   });

//   test('view as unreg Lawyer', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.UnregViewing('5c9e4dc353415c34a0f35cd1')
//     console.log('view')
//     expect(id.data.message).toEqual('lawyer')
//   });
//   test('view as unreg Reviewer', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.UnregViewing('5c9f81974829dc64cc2c1d0e')
//     console.log('view')
//     expect(id.data.message).toEqual('Rev')
//   });

//   test('view as unreg Admin', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.UnregViewing('5c9bb0dc5185793518ea84fb')
//     console.log('view')
//     expect(id.data.message).toEqual('Admin')
//   });

//   test('view as unreg neither', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.UnregViewing('5c77f15454789a2ec800e532')
//     console.log('view')
//     expect(id.data.message).toEqual('User does not exist')
//   });
//   //----------------------------------------------
//   test('view as Lawyer Inv', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.LawViewing('5c93ac9555b21722fc46eb9b')
//     console.log('view')
//     expect(id.data.message).toEqual('investor')
//   });

//   test('view as Lawyer Lawyer', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.LawViewing('5c9e4dc353415c34a0f35cd1')
//     console.log('view')
//     expect(id.data.message).toEqual('lawyer')
//   });
//   test('view as Lawyer Reviewer', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.LawViewing('5c9f81974829dc64cc2c1d0e')
//     console.log('view')
//     expect(id.data.message).toEqual('Rev')
//   });

//   test('view as Lawyer Admin', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.LawViewing('5c9bb0dc5185793518ea84fb')
//     console.log('view')
//     expect(id.data.message).toEqual('Admin')
//   });

//   test('view as Lawyer neither', async()=>{
//     jest.setTimeout(50000)
//     const id = await adminFunctions.LawViewing('5c77f15454789a2ec800e532')
//     console.log('view')
//     expect(id.data.message).toEqual('User does not exist')
//   });
//   test ('Editing lawEntity to Malak', async () => {
//     let law = await adminFunctions.adminChangePricingStrategy('5c9e4b6c4edad508b45adac6')
//     expect(law.data.msg).toEqual('Laws updated successfully')
//   })

//   test ('Editing law that does not exist', async () => {
//     let law= await adminFunctions.adminChangePricingStrategy('5c9e4b6c4edad508b45ada')
//     expect(law.data.msg).toEqual('Law does not exist')

//   })


//   /*
//   either this test works or the previous two work
//   they are contradicting due hardcoding admin id in my function which is not of type super
//   */
//   //test ('Non-superAdmin tries to change law', async () => {
//     //let law= await adminFunctions.adminChangePricingStrategy('5c9e4b6c4edad508b45adac6')
//     //expect(law.data.data.message).toEqual('Only super admins have access')
//   //})

//   test ('Creating a new Law', async () =>{
//     jest.setTimeout(30000)
//     let law= await adminFunctions.adminCreateNewLaw()
//     expect(law.data.msg).toEqual('Law was created successfully')
//   })

//   /*
//   either this test works or the previous one work
//   they are contradicting due hardcoding admin id in my function which is not of type super
//   */
//   //test ('Non-superAdmin create new law', async() =>{
//     //let law= await adminFunctions.adminCreateNewLaw()
//     //expect(law.data.msg).toEqual('Only super admins have access')
//   //})
 
//   // test(`Case assigned to lawyer successfully`, async() =>{
   
//   //   const cases = await adminFunctions.AdminAssignLawyer()
//   //   console.log(cases)
//   //   expect(cases.data.lawyerID).toBe('5c9e4dc353415c34a0f35cd1')
   
//   // })

  
 //==========================MONICA==========================
  
//TESTING CHECK FORM

    test('successful form' , async() => {

        const newInvestor = await axios({
          method:'post',
          url: 'http://localhost:3000/api/Investor',
          headers:{},
          data:{
            "FirstName": "gegegegeg",
            "MiddleName":"gogggggg",
            "LastName":"fay",
            "email": "hehehhehe.achrwwwf@gma.com",
            "ID_type":"regular",
            "SSID" :"930240219012394",
            "Nationality":"egy",
            "gender":"female",
            "Type":"pass",
           "Address":"3489ihkbnke",
           "telephone_number":"894094820"
          }
        })
        
       
        
        const idI = newInvestor.data.data._id
        console.log(idI)
        

        const newC = await axios({
          method:'post',
          url: 'http://localhost:3000/api/Cases',
          headers:{},
          data:{
            "form_type": "SPC",
            "regulated_law": "44",
            "arabic_name": "ققتت",
            "english_name": "Hooo",
            "government": "ENG",
            "city": "Cairo",
            "hq_address": "gftfy",
            "hq_city": "yes",
            "main_center_phone": 123,
            "main_center_fax": 518563,
            "currency": "541",
            "equality_capital": 150000,
            "managers": [],
            "caseStatus": "published",
            "investorID": idI,
            "log": []
          }
        })
       const cr1 = newC.data.data._id
      console.log(cr1)
        

     
  //console.log(newC)
        expect(newC.data.msg).toEqual('Case was created successfully')
        console.log('done testc')


        const delC = await axios({
          method:'delete',
          url: 'http://localhost:3000/api/Cases/'+ cr1,
         
        })

        const delInvestor = await axios({
          method:'delete',
          url: 'http://localhost:3000/api/Investor/'+ idI,
          
        })


      })




//testing for checkForms 

      test('unsuccessful form' , async() => {

        const newInvestor = await axios({
          method:'post',
          url: 'http://localhost:3000/api/Investor',
          headers:{},
          data:{
            "FirstName": "gegegege",
            "MiddleName":"gogoloulo",
            "LastName":"fay",
            "email": "hehehee.achwwf@gma.com",
            "ID_type":"regular",
            "SSID" :"930240219012394",
            "Nationality":"french",
            "gender":"female",
            "Type":"pass",
           "Address":"3489ihkbnke",
           "telephone_number":"894094820"
          }
        })
        
       
        
        const idI = newInvestor.data.data._id
        console.log(idI)


        const newC = await axios({
          method:'post',
          url: 'http://localhost:3000/api/Cases',
          headers:{},
          data:{
            "form_type": "SPC",
            "regulated_law": "44",
            "arabic_name": "قتخججت",
            "english_name": "KKKoo",
            "government": "ENG",
            "city": "Cairo",
            "hq_address": "gftfy",
            "hq_city": "yes",
            "main_center_phone": 1236,
            "main_center_fax": 518563,
            "currency": "541",
            "equality_capital": 150000,
            "managers": [],
            "caseStatus": "published",
            "investorID": idI,
            "managers": [
              {
                  "_id": "5cad6203dc92d028730630fe",
                  "name": "Paul"
              }
          ],
            "log": []
          }
        })
const cr1 = newC.data.data._id
console.log(cr1)
        

     
  //console.log(newC)
        expect(newC.data.msg).toEqual('Could not create case')
        console.log('done testc')

        const delInvestor = await axios({
          method:'delete',
          url: 'http://localhost:3000/api/Investor/'+ idI,
          
        })


      })




//test not functionning because we removed the attribute 'lawyerId' from case schema//PLEASE leave it

// test('Admin assign lawyer' ,async() => {

 
//   const newInvestor = await axios({
//           method:'post',
//           url: 'http://localhost:3000/api/Investor',
//           headers:{},
//           data:{
//             "FirstName": "gee",
//             "MiddleName":"mourad",
//             "LastName":"fayez",
//             "email": "mouradd@gmail.com",
//             "ID_type":"regular",
//             "SSID" :"930240219012394",
//             "Nationality":"Egyptian",
//             "gender":"female",
//             "Type":"pass",
//            "Address":"3489ihkbnknwe",
//            "telephone_number":"89409820"
//           }
//         })
//         console.log('done inv')


  
  

//    const newL = await axios({
//            method:'post',
//            url: 'http://localhost:3000/api/Lawyer',
//            headers:{},
//            data:{
//             "FName": "R",
//             "MName": "Ramremo",
//             "LName": "Gamd",
//             "email": "fr@gmail.com",
//             "password": "cnjdqqcrjcsjn151215'",
//             "gender": "Male",
//             "Nationality": "Egyptian",
//             "birthdate": "1980-01-01T00:00:00.000Z",
//             "Address": "11 makram",
//             "fax": 125252,
//             "telephone_number": 151515,
//             "completed_number_of_cases": 561,
//             "number_of_cases": 2,
//             "total_time_on_cases": 25,
//             "ssid": 15552,
//             "notifications": [],
//             "ratings": []
//    }
//  })
//  const idL=newL.data.data._id
//  console.log(idL)


// const newC = await axios({
//         method:'post',
//         url: 'http://localhost:3000/api/Cases',
//         headers:{},
//         data:{
//           "form_type": "SPC",
//           "regulated_law": "44",
//           "arabic_name": "اححححنت",
//           "english_name": "lo6",
//           "government": "ENG",
//           "city": "Cairo",
//           "hq_address": "gftfy",
//           "hq_city": "yes",
//           "main_center_phone": 123515,
//           "main_center_fax": 518563,
//           "currency": "541",
//           "equality_capital": 150000,
//           "managers": [],
//           "caseStatus": "published",
//           "investorID": newInvestor.data.data._id,
//           "log": []
//         }
//       })

//       const idC = newC.data.data._id
//       console.log(idC)

//   const msg = await adminFunctions.AdminAssignLawyer(idL,idC)
//     expect(msg).toEqual('Please select a valid lawyer')

//     const delLawyer = await axios({
//            method:'delete',
//             url: 'http://localhost:3000/api/Lawyer/'+ idL,
            
//            })
  
//           const delC = await axios({
//             method:'delete',
//             url: 'http://localhost:3000/api/Cases/'+ idC,

//            })

// });



//test not functionning because we removed the attribute 'reviewerId' from case schema//PLEASE leave it

// test('Admin assign Reviewer' ,async() => {

 
//   const newInvestor = await axios({
//           method:'post',
//           url: 'http://localhost:3000/api/Investor',
//           headers:{},
//           data:{
//             "FirstName": "shouuu",
//             "MiddleName":"mou",
//             "LastName":"fayez",
//             "email": "mour@gmail.com",
//             "ID_type":"regular",
//             "SSID" :"930240219012394",
//             "Nationality":"Egyptian",
//             "gender":"female",
//             "Type":"pass",
//            "Address":"3489ihkbnknwe",
//            "telephone_number":"89409820"
//           }
//         })
//         console.log('done inv')


  
  

//    const newR = await axios({
//            method:'post',
//            url: 'http://localhost:3000/api/Reviewer',
//            headers:{},
//            data:{
//             "FName": "Rjjjj",
//             "MName": "Ramremo",
//             "LName": "Gamd",
//             "email": "frooo@gmail.com",
//             "password": "cnjdqqjn151215'",
//             "gender": "Male",
//             "Nationality": "Egyptian",
//             "birthdate": "1980-01-01T00:00:00.000Z",
//             "Address": "11 makram",
//             "fax": 125252,
//             "telephone_number": 151515,
//             "completed_number_of_cases": 561,
//             "number_of_cases": 2,
//             "total_time_on_cases": 25,
//             "ssid": 15552,
//             "notifications": [],
//             "ratings": []
//    }
//  })
//  const idR=newR.data.data._id
//  console.log(idR)


// const newC = await axios({
//         method:'post',
//         url: 'http://localhost:3000/api/Cases',
//         headers:{},
//         data:{
//           "form_type": "SPC",
//           "regulated_law": "44",
//           "arabic_name": "اححنت",
//           "english_name": "lkkkko6",
//           "government": "ENG",
//           "city": "Cairo",
//           "hq_address": "gftfy",
//           "hq_city": "yes",
//           "main_center_phone": 123515,
//           "main_center_fax": 518879563,
//           "currency": "541",
//           "equality_capital": 150000,
//           "managers": [],

//           "caseStatus": "published",
//           "investorID": newInvestor.data.data._id,
//           "log": []
//         }
//       })

//       const idC = newC.data.data._id
//       console.log(idC)

//   const msg = await adminFunctions.AdminAssignReviewer(idR,idC)
//     expect(msg).toEqual('Please select a valid reviewer')

//     const delReviewer = await axios({
//            method:'delete',
//             url: 'http://localhost:3000/api/Reviewer/'+ idR,
            
//            })
  
//           const delC = await axios({
//             method:'delete',
//             url: 'http://localhost:3000/api/Cases/'+ idC,

//            })

// });



//testing sending attachement
test(`send attachment with a valid mail`, async () => {
  const newInvestor = await axios({
    method:'post',
    url: 'http://localhost:3000/api/Investor',
    headers:{},
    data:{
      "FirstName": "shouuu",
      "MiddleName":"moumou",
      "LastName":"fayez",
      "email": "moumou@gmail.com",
      "ID_type":"regular",
      "SSID" :"930240219012394",
      "Nationality":"Egyptian",
      "gender":"female",
      "Type":"pass",
     "Address":"3489ihkbnknwe",
     "telephone_number":"89409820"
    }
  })
  console.log(newInvestor.data.data.email)
  const msg = await adminFunctions.SendAttachmentMail(newInvestor.data.data.email)
  expect(msg).toEqual('Please check your email')


  const delReviewer = await axios({
              method:'delete',
                url: 'http://localhost:3000/api/Investor/'+ newInvestor.data.data._id,
                
               })
 });





 //testing sending attachement
test(`send attachment with an invalid mail`, async () => {
  const email = 'wrong_mail@gmail.com'
  const msg = await adminFunctions.SendAttachmentMail(email)
 
  expect(msg).toEqual('Incorrect Mail')
});

//====================================================================================

//   //Investor tests
//   test(`paying fees for a company with valid card`, async () => {
//     const charge =  await investorFunctions.InvestorPayFees(4242424242424242,12,19,121)
//     expect(charge.data.message).toEqual
//     ('your payment has been made; you will receive an invoice via your mail.' )
//   });

//   test(`paying fees for a company with expired card`, async () => {
//     const charge =  await investorFunctions.InvestorPayFees(4242424242424242,1,19,121)
//     //console.log(charge)
//     expect(charge.data.message).toEqual
//     ('card declined' )
//   });

//   test('Investor view his fees', async () => {
//     const Case= await investorFunctions.InvestorViewFees('5c9512ba8aba002578c01ad6')
//     expect(Case.data.msg).toEqual('This is your fees')
//   })

//   test('Investor view his fees giving a wrong id', async () => {
//     const Case= await investorFunctions.InvestorViewFees('5c9512ba8aba002578c01a')
//     expect(Case.data.msg).toEqual('Cannot find company')
//   })

  

// test ('View notification of an investor with an invalid ID', async () => {
//   var validInvestorID = "x"
//   //expect.assertions(1)
//   try {
//     const response = await Investor.investorMyNotifications(validInvestorID)
//   } catch (e) {
//    // console.log(e.response.data)
//     expect(e.response.data.error).toMatch('Error processing query.');
//   }
  
// })

// test ('View pending companies of an investor', async () => {
//   var validInvestorID = "5c7a9b46470a360ac8b0d412"
//   //expect.assertions(1)
//     const response = await Investor.viewMyPendingCompanies(validInvestorID)
//     //console.log(response)
//     expect(response.data.msg).toEqual('Done')

  
// })

// test ('View pending companies of an investor with an invalid ID', async () => {
//   var validInvestorID = "x"
//   //expect.assertions(1)
//   try {
//     const response = await Investor.viewMyPendingCompanies(validInvestorID)
//   } catch (e) {
//     //console.log(e.response.data)
//     expect(e.response.data.error).toMatch('Error processing query.');
//   }
  
// })

// test(`Editing company that does not exist`, async () => {
//   const company = await adminFunctions.AdminEditCompany('5c9502b9d2e00c0bc7a')
//   expect(company.data.message).toEqual('This id is not valid a company.')
// });

// //Investor tests
// test(`paying fees for a company with valid card`, async () => {
//   const charge = await investorFunctions.InvestorPayFees(4242424242424242, 12, 19, 121)
//   expect(charge.data.message).toEqual
//     ('your payment has been made; you will receive an invoice via your mail.')
// });

// // test(`paying fees for a company with expired card`, async () => {
// //   const charge =  await investorFunctions.InvestorPayFees(4242424242424242,1,19,121)
// //   expect(charge.data.message).toEqual
// //   ('card declined' )
// // });

//====================Hemaya tests===========================================================
test(`View Board of directors`, async () => {
  const board = await userFunctions.UnregisterViewDirectorsID()
  expect(board.data.data.managers[0].name).toEqual("Fady")

});

test(`Unregister view questions`, async () => {
    // adding question to database --before all--
  const newQuestion = await axios({
    method: 'post',
    url: 'http://localhost:3000/api/Questions',
    headers: {},
    data:
    {
    "senderID":"5c93ac9555b21722fc46eb9b",   
    "AdminID": "5c9bb1e18308bb316ce15a70",
    "question" :"what is GAFI?",
    "answer" :"Yes",
    "time" :"2019" 
    }});


  const ques = await userFunctions.UnregisterViewQuestions()
  found = false

  for (let i = 0; i < ques.data.data.length; i += 1) {
    if (ques.data.data[i].question ==="what is GAFI?") {
       found = true
    }
}

  //Deleting the added question -- after all--
  await axios({
  method: 'delete',
  url: 'http://localhost:3000/api/Questions/'+newQuestion.data.data._id,
  headers: {},
  data:
  {
  }});
  expect(found).toEqual(true)
});


test(`Admin register reviewer with email already exists`, async () => {
  // Adding reviewer with specific email
  const newRev = await axios({
    method: 'post',
    url: 'http://localhost:3000/api/Reviewer',
    headers: {},
    data:
    {
      "FName": "Romba",
      "MName": "Ramremo",
      "LName": "Gamd",
      "email": "fr@gmail.com",
      "password": "cnjdqqcrjcsjn151215'",
      "gender": "Male",
      "Nationality": "Egyptian",
      "birthdate": "1980",
      "Address": "11 makram",
      "fax": "125252",
      "telephone_number": "151515",
      "total_number_of_cases": "588",
      "completed_number_of_cases": "561",
      "number_of_cases": "2",
      "total_time_on_cases": "25",
      "ssid": "15552"
    }

  });

  try {
    const ques = await adminFunctions.AdminRegisterReviewer()
    expect(ques.data.error).toEqual('Email already exists')
  }
  catch (e) {
    // deleting reviewer
    await axios({
      method: 'delete',
      url: 'http://localhost:3000/api/Reviewer/'+newRev.data.data._id,
      headers: {},
      data:
      {
      }});
    expect(e.response.data.error).toEqual("Email already exists")
  }
  
});

test(`Admin register lawyer with email already exists`, async () => {
  const newLawyer = await axios({
    method: 'post',
    url: 'http://localhost:3000/api/Lawyer',
    headers: {},
    data:
    {
      "FName": "Romba",
      "MName": "Ramremo",
      "LName": "Gamd",
      "email": "fr@gmail.com",
      "password": "cnjdqqcrjcsjn151215'",
      "gender": "Male",
      "Nationality": "Egyptian",
      "birthdate": "1980",
      "Address": "11 makram",
      "fax": "125252",
      "telephone_number": "151515",
      "total_number_of_cases": "588",
      "completed_number_of_cases": "561",
      "number_of_cases": "2",
      "total_time_on_cases": "25",
      "ssid": "15552"
    }

  });

  try {
    const ques = await adminFunctions.AdminRegisterLawyer()
    expect(ques.data.error).toEqual('Email already exists')
  } catch (e) {
    await axios({
      method: 'delete',
      url: 'http://localhost:3000/api/Reviewer/'+newLawyer.data.data._id,
      headers: {},
      data:
      {
      }});
    expect(e.response.data.error).toEqual("Email already exists")
  }
});

test(`Admin register reviewer successfully`, async () => {

  const ques = await adminFunctions.AdminRegisterReviewerSuccessfully();

  //deleting the reviewer
  await axios({
    method: 'delete',
    url: 'http://localhost:3000/api/Reviewer/'+ques.data.data._id,
    headers: {},
    data:
    {
    }});

  expect(ques.data.msg).toEqual('Reviewer was created successfully')
 
});

test(`Admin register lawyer successfully`, async () => {

  const ques = await adminFunctions.AdminRegisterLawyerSuccessfully();
  expect(ques.data.msg).toEqual('Lawyer was created successfully')
  await axios({
    method: 'delete',
    url: 'http://localhost:3000/api/Lawyer/'+ques.data.data._id,
    headers: {},
    data:
    {
    }});
});

test(`Admin register Admin with type not admin`, async () => {
  // await Lawyer.create(data)

  try {
    const ques = await adminFunctions.AdminRegisterAdminType()
    expect(ques.data.error).toEqual('Email already exists')
  } catch (e) {
    expect(e.response.data.error).toEqual("Type should be only Admin")
  }
})

test(`Admin register Admin with email already exists`, async () => {
  const rev = await axios({
    method: 'post',
    url: 'http://localhost:3000/api/Admin/',
    headers: {},
    data:
    {
      "FName": "Romba",
      "MName": "Ramremo",
      "LName": "Gamd",
      "email": "fady.wasfalla@gmail.com",
      "password": "cnjdqqcrjcsjn151215'",
      "gender": "Male",
      "Type": "Admin",
      "Nationality": "Egyptian",
      "birthdate": "1980",
      "Address": "11 makram",
      "fax": "125252",
      "telephone_number": "151515",
      "total_number_of_cases": "588",
      "completed_number_of_cases": "561",
      "number_of_cases": "2",
      "total_time_on_cases": "25",
      "ssid": "15552"
    }});
  try {
    const ques = await adminFunctions.AdminRegisterAdmin()
    expect(ques.data.error).toEqual('Email already exists')
  } catch (e) {
    await axios({
      method: 'delete',
      url: 'http://localhost:3000/api/Admin/'+rev.data.data._id,
      headers: {},
      data:
      {
      }});
    expect(e.response.data.error).toEqual("Email already exists")
  }
})



test(`Admin register Admin successfully`, async () => {
  // await Lawyer.create(data)

    const ques = await adminFunctions.AdminRegisterAdminSuccessfully()
    await axios({
      method: 'delete',
      url: 'http://localhost:3000/api/Admin/'+ques.data.data._id,
      headers: {},
      data:
      {
      }});
    expect(ques.data.msg).toEqual('Admin was created successfully')
})

// //====================Hemaya tests===========================================================
// test(`Unregister view questions`, async () => {
//   const ques = await userFunctions.UnregisterViewQuestions()
//   expect(ques.data.data[0].question).toEqual('do you?')
// });


// test(`Admin register reviewer with email already exists`, async () => {
//   // await Lawyer.create(data)
//   try {
//     const ques = await adminFunctions.AdminRegisterReviewer()
//     expect(ques.data.error).toEqual('Email already exists')
//   }
//   catch (e) {
//     expect(e.response.data.error).toEqual("Email already exists")
//   }
// });

// test(`Admin register lawyer with email already exists`, async () => {
//   // await Lawyer.create(data)
//   try {
//     const ques = await adminFunctions.AdminRegisterLawyer()
//     expect(ques.data.error).toEqual('Email already exists')
//   } catch (e) {
//     expect(e.response.data.error).toEqual("Email already exists")
//   }
// });

// test(`Admin register reviewer successfully`, async () => {

//   // await Lawyer.create(data)
//   const ques = await adminFunctions.AdminRegisterReviewerSuccessfully();
//   expect(ques.data.msg).toEqual('Reviewer was created successfully')
//   // var query = { email: "new_emaill@gmail.com" }
//   // await Reviewer.findOneAndRemove(query)
// });
// test(`Admin register lawyer successfully`, async () => {

// test ('generate a PDF with a valid ID', async () => {
//   var validCaseID = "5c9cfd1d05f1d42e68b75fb7"
//   //expect.assertions(1)
//     const response = await Investor.generatePdf(validCaseID)
//     //console.log(response)
//     expect(response.data.msg).toEqual('Done')

  
// })

// test ('generate a PDF with a invalid ID', async () => {
//   jest.setTimeout(30000)
//   var validCaseID = "x"
//   //expect.assertions(1)
//   try {
//     const response = await Investor.generatePdf(validCaseID)
//   } catch (e) {
//     //console.log(e.response.data)
//     expect(e.response.data.error).toMatch('Error processing query.');
//   }
  
// })
