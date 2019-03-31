const lawyer = require('./tests/lawyerFunctions');
const adminFunctions = require('./tests/adminFunctions')
const investorFunctions = require('./tests/investorFunctions')
const userFunctions = require('./tests/userFunctions')
const Lawyer = require('./app/models/Lawyer')
const Reviewer = require('./app/models/Reviewer')
jest.setTimeout(30000)

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


///////////////////



//Admin tests

<<<<<<< HEAD
// test(`Editing company city to Alex`, async () => {
//     const company =  await adminFunctions.AdminEditCompany('5c9502b9ae1fad2e00c0bc7a')
//     expect(company.data.data.city).toEqual('Alex')
//   });
=======
test(`Editing company city to Alex`, async () => {
    const company =  await adminFunctions.AdminEditCompany('5c9502b9ae1fad2e00c0bc7a')
    expect(company.data.data.city).toEqual('Alex')
  });

  test(`Editing company that does not exist`, async () => {
    const company =  await adminFunctions.AdminEditCompany('5c9502b9d2e00c0bc7a')
    expect(company.data.message).toEqual('This id is not valid a company.' )
  });

 
  // test(`Case assigned to lawyer successfully`, async() =>{
   
  //   const cases = await adminFunctions.AdminAssignLawyer()
  //   console.log(cases)
  //   expect(cases.data.lawyerID).toBe('5c9e4dc353415c34a0f35cd1')
   
  // })





test('Admin assign lawyer' ,async() => {
  const msg = await adminFunctions.AdminAssignLawyer('5c93e4ae5b66b31668f0e28c','5c9e4dc353415c34a0f35cd1')
    expect(msg).toEqual('Case updated successfully')

});

test('Admin assign lawyer' ,async() => {
  const msg = await adminFunctions.AdminAssignLawyer('5c93e4ae5b66b31668f0e28c','5c9e4dc358415c34a0f35cd1')
    expect(msg).toEqual('Please select a valid lawyer')

});

test('Admin assign Reviewer' ,async() => {
  const msg = await adminFunctions.AdminAssignReviewer('5c93e4ae5b66b31668f0e28c','5ca1144729dfee2fd0a6033a')
    expect(msg).toEqual('Case updated successfully')

});

test('Admin assign Reviewer' ,async() => {
  const msg = await adminFunctions.AdminAssignReviewer('5c93e4ae5b66b31668f0e28c','5c9e4dc35841545c34a0f35cd1')
    expect(msg).toEqual('Please select a valid Reviewer')

});


test(`send attachment with a valid mail`, async () => {
  const msg = await adminFunctions.SendAttachmentMail('monica.achraff@gmail.com')
  expect(msg).toEqual('Please check your email')
});



test(`send attachment with an invalid mail`, async () => {
  const msg = await adminFunctions.SendAttachmentMail('wrong_mail@gmail.com')
  console.log(msg)
  expect(msg).toEqual('Incorrect Mail')
});



  //Investor tests
  test(`paying fees for a company with valid card`, async () => {
    const charge =  await investorFunctions.InvestorPayFees(4242424242424242,12,19,121)
    expect(charge.data.message).toEqual
    ('your payment has been made; you will receive an invoice via your mail.' )
  });

  test(`paying fees for a company with expired card`, async () => {
    const charge =  await investorFunctions.InvestorPayFees(4242424242424242,1,19,121)
    //console.log(charge)
    expect(charge.data.message).toEqual
    ('card declined' )
  });


  
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

>>>>>>> 3fb719ac29e1a1a91c1eea6cb104d48dd8ce02b6

test(`Editing company that does not exist`, async () => {
  const company = await adminFunctions.AdminEditCompany('5c9502b9d2e00c0bc7a')
  expect(company.data.message).toEqual('This id is not valid a company.')
});

//Investor tests
test(`paying fees for a company with valid card`, async () => {
  const charge = await investorFunctions.InvestorPayFees(4242424242424242, 12, 19, 121)
  expect(charge.data.message).toEqual
    ('your payment has been made; you will receive an invoice via your mail.')
});

// test(`paying fees for a company with expired card`, async () => {
//   const charge =  await investorFunctions.InvestorPayFees(4242424242424242,1,19,121)
//   expect(charge.data.message).toEqual
//   ('card declined' )
// });

//====================Hemaya tests===========================================================
test(`Unregister view questions`, async () => {
  const ques = await userFunctions.UnregisterViewQuestions()
  expect(ques.data.data[0].question).toEqual('do you?')
});


test(`Admin register reviewer with email already exists`, async () => {
  // await Lawyer.create(data)
  try {
    const ques = await adminFunctions.AdminRegisterReviewer()
    expect(ques.data.error).toEqual('Email already exists')
  }
  catch (e) {
    expect(e.response.data.error).toEqual("Email already exists")
  }
});

test(`Admin register lawyer with email already exists`, async () => {
  // await Lawyer.create(data)
  try {
    const ques = await adminFunctions.AdminRegisterLawyer()
    expect(ques.data.error).toEqual('Email already exists')
  } catch (e) {
    expect(e.response.data.error).toEqual("Email already exists")
  }
});

test(`Admin register reviewer successfully`, async () => {

  // await Lawyer.create(data)
  const ques = await adminFunctions.AdminRegisterReviewerSuccessfully();
  expect(ques.data.msg).toEqual('Reviewer was created successfully')
  // var query = { email: "new_emaill@gmail.com" }
  // await Reviewer.findOneAndRemove(query)
});
test(`Admin register lawyer successfully`, async () => {

  // await Lawyer.create(data)
  const ques = await adminFunctions.AdminRegisterLawyerSuccessfully();
  expect(ques.data.msg).toEqual('Lawyer was created successfully')
  // var query = { email: "new_emaill@gmail.com" }
  // await Lawyer.findOneAndRemove(query)
});
test(`Admin register Admin with email already exists`, async () => {
  // await Lawyer.create(data)
  try {
    const ques = await adminFunctions.AdminRegisterAdmin()
    expect(ques.data.error).toEqual('Email already exists')
  } catch (e) {
    expect(e.response.data.error).toEqual("Email already exists")
  }
})

test(`Admin register Admin with type not admin`, async () => {
  // await Lawyer.create(data)

  try {
    const ques = await adminFunctions.AdminRegisterAdminType()
    expect(ques.data.error).toEqual('Email already exists')
  } catch (e) {
    expect(e.response.data.error).toEqual("Type should be only Admin")
  }
})

test(`Admin register Admin successfully`, async () => {
  // await Lawyer.create(data)

    const ques = await adminFunctions.AdminRegisterAdminSuccessfully()
    expect(ques.data.msg).toEqual('Admin was created successfully')
})


test(`Admin delete Investor not exist`, async () => {
  // await Lawyer.create(data)
  try {
    const ques = await adminFunctions.AdminDeleteInvestorNot()
    expect(ques.data.error).toEqual('Email already exists')
  } catch (e) {
    expect(e.response.data.error).toEqual("Can not find Investor")
  }
})


test(`Admin delete Investor successfully`, async () => {
  // await Lawyer.create(data)

    const ques = await adminFunctions.AdminDeleteInvestor()
    expect(ques.data.msg).toEqual('Investor deleted successfully')
})




