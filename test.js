const lawyer = require('./tests/lawyerFunctions');
const adminFunctions = require('./tests/adminFunctions')
const investorFunctions = require('./tests/investorFunctions')
const userFunctions = require('./tests/userFunctions')
const Lawyer = require('./app/models/Lawyer')
jest.setTimeout(30000)
<<<<<<< HEAD

                 //// dany boy

test(`case disaproves at lawyer and casestatus should be investor`, async () => {
  const CASE =  await lawyer.caseDisAproveedAtLawyer('5c7a9b46470a360ac8b0d412','5c94df923c95ff18c8866d54')    // stafID+'/:'+caseID,
  expect(CASE.data.msg).toEqual('Case disaproved')
});

test(`case aproved at lawyer and casestatus should be reviewer`, async () => {
  const CASE =  await lawyer.caseAproveedAtLawyer('5c9e4dc353415c34a0f35cd1','5c93e0be81a45d15089ab710')    // stafID+'/:'+caseID,
  expect(CASE.data.msg).toEqual('Case aproved')
});


test(`case disaproves at reviewer and casestatus should be lawyer`, async () => {
  const CASE =  await lawyer.caseDisAproveedAtLawyer('5c7a9b46470a360ac8b0d412','5c94df923c95ff18c8866d54')    // stafID+'/:'+caseID,
  expect(CASE.data.msg).toEqual('Case disaproved')
});

test(`case aproved at reviewer and casestatus should be pending`, async () => {
  const CASE =  await lawyer.caseAproveedAtReviewer('5c7a9b46470a360ac8b0d412','5c94df923c95ff18c8866d54')    // stafID+'/:'+caseID,
  expect(CASE.data.msg).toEqual('Case aproved')
});


/////////////////////



// //Admin tests

// test(`Editing company city to Alex`, async () => {
//     const company =  await adminFunctions.AdminEditCompany('5c9502b9ae1fad2e00c0bc7a')
//     expect(company.data.data.city).toEqual('Alex')
//   });

//   test(`Editing company that does not exist`, async () => {
//     const company =  await adminFunctions.AdminEditCompany('5c9502b9d2e00c0bc7a')
//     expect(company.data.message).toEqual('This id is not valid a company.' )
//   });

//   //Investor tests
//   test(`paying fees for a company with valid card`, async () => {
//     const charge =  await investorFunctions.InvestorPayFees(4242424242424242,12,19,121)
//     expect(charge.data.message).toEqual
//     ('your payment has been made; you will receive an invoice via your mail.' )
//   });

//   test(`paying fees for a company with expired card`, async () => {
//     const charge =  await investorFunctions.InvestorPayFees(4242424242424242,1,19,121)
//     console.log(charge)
//     expect(charge.data.message).toEqual
//     ('card declined' )
//   });

//   //====================Hemaya tests===========================================================
//   test(`Unregister view questions`, async () => {
//     const ques =  await userFunctions.UnregisterViewQuestions()
//     expect(ques.data.data[0].question).toEqual('how are you?')
//   });


//   test(`Admin register lawyer with email already exists`, async () => {
//    var data = {
//     "FName":"Romba",
//       "MName": "Ramremo",
//       "LName":"Gamd",
//       "email": "fr@gmail.com",
//       "password":"cnjdqqcrjcsjn151215'",
//       "gender": "Male",
=======
//Admin tests

test(`Editing company city to Alex`, async () => {
    const company =  await adminFunctions.AdminEditCompany('5c9507e0384b413494812ddb')
    expect(company.data.data.city).toEqual('Alex')
  });

  test(`Editing company that does not exist`, async () => {
    const company =  await adminFunctions.AdminEditCompany('5c9502b9d2e00c0bc7a')
    expect(company.data.message).toEqual('This id is not a valid company.' )
  });

  //Investor tests
  test(`paying fees for a company with valid card`, async () => {
    const charge =  await investorFunctions.InvestorPayFees(4242424242424242,12,19,121)
    expect(charge.data.message).toEqual
    ('your payment has been made; you will receive an invoice via your mail.' )
  });

  test(`paying fees for a company with expired card`, async () => {
    const charge =  await investorFunctions.InvestorPayFees(4242424242424242,1,19,121)
    console.log(charge)
    console.log(charge.data.message)
    expect(charge.data.message).toEqual
    ('card declined' )
  });

  //====================Hemaya tests===========================================================
  test(`Unregister view questions`, async () => {
    const ques =  await userFunctions.UnregisterViewQuestions()
    expect(ques.data.data[0].question).toEqual('how are you?')
  });


  test(`Admin register lawyer with email already exists`, async () => {
   var data = {
    "FName":"Romba",
      "MName": "Ramremo",
      "LName":"Gamd",
      "email": "fr@gmail.com",
      "password":"cnjdqqcrjcsjn151215'",
      "gender": "Male",
>>>>>>> 24bc814efd8763f39ff0f7ada95e4384d1fdf6ae
  
//       "Nationality":"Egyptian",
  
//       "birthdate":"1980",
  
//       "Address":"11 makram",
  
  
//       "fax":"125252",
  
//       "telephone_number":"151515",
      
//       "total_number_of_cases": "588",
//       "completed_number_of_cases":"561",
//       "number_of_cases":"2",
//       "total_time_on_cases":"25",
  
//       "ssid": "15552"
//       }
  
//    // await Lawyer.create(data)
//     const ques =  await adminFunctions.AdminRegisterLawyer();
//     expect(ques).to.have.status(400)
//   });

// test(`case aproves at reviewer and casestatus should be pending`, async () => {
//   const CASE =  await lawyer.caseDisAproveedAtLawyer('5c7a9b46470a360ac8b0d412','5c94df923c95ff18c8866d54')    // stafID+'/:'+caseID,
//   expect(CASE.data.caseStatus).toEqual('pending')
// });






