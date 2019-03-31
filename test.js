const lawyer = require('./tests/lawyerFunctions');
const adminFunctions = require('./tests/adminFunctions')
const investorFunctions = require('./tests/investorFunctions')
const userFunctions = require('./tests/userFunctions')
const Lawyer = require('./app/models/Lawyer')
const Reviewer = require('./app/models/Reviewer')
jest.setTimeout(30000)

const Admin = require('./app/Functions/Admin.functions');
const Investor = require('./app/Functions/Investor.functions')
const Lawyer = require('./app/Functions/Lawyer.functions')


test('Forgot password with valid mail', async () => {
  jest.setTimeout(30000)
  const msg =  await Admin.MailForgotPassword('fady.wasfalla@gmail.com')
  expect(msg).toEqual('An email has been sent check your email');
});

test('Forgot password with invalid mail', async () => {
  const msg =  await Admin.MailForgotPassword('Wrong_mail@gmail.com')
  expect(msg).toEqual('incorrect email');
});

test('Reset password with valid token', async () => {
  const msg =  await Admin.MailResetPassword('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGTmFtZSI6Im1vbmljYSIsImlhdCI6MTU1NDA1Njk4NiwiZXhwIjoxNTU0MDYwNTg2fQ.JbMkTDaIJd4lkkjtxL3tVF9LyuiZw-Xh9KKFDNl5MuM','Fad5y2512')
  expect(msg).toEqual('Password reseted succesfully');
})




test('investor fill form', async () => {
  const msg =  await Investor.investorFillForm()
  expect(msg.data.msg).toEqual('The form was created successfully');
});
test('investor update form', async () => {
  const msg =  await Investor.investorFillForm()
  expect(msg.data.msg).toEqual('The form was created successfully');
});
test('investor view comment', async () => {
  const msg =  await Investor.investorFillForm()
  expect(msg.data.msg).toEqual('The form was created successfully');
});


test('lawyer fill form', async () => {
  const msg =  await Lawyer.lawyerFillForm()
  expect(msg.data.msg).toEqual('The form was created successfully');
});

test('lawyer update form', async () => {
  const msg =  await Lawyer.lawyerFillForm()
  expect(msg.data.msg).toEqual('The form was created successfully');
});

/*test('lawyer view comment', async () => {
  const msg =  await Lawyer.lawyerViewComment()
  expect(msg.data.msg).toEqual('Done');
});*/

test('lawyer view lawyerLeaderBoard', async () => {
  const msg =  await Lawyer.lawyerViewLawyersLeaderBoard()
  expect(msg.data.msg).toEqual('Done');
});

  test('lawyer view reviewerLeaderBoard', async () => {
    const msg =  await Lawyer.lawyerViewReviewersLeaderBoard()
    expect(msg.data.msg).toEqual('Done');
  });

  
  test('Reset password with expired token', async () => {
    const msg =  await Admin.MailResetPassword('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGTmFtZSI6IkZhZHkiLCJpYXQiOjE1NTQwNTg5MzYsImV4cCI6MTU1NDA2MjUzNn0.bl8zUKTgZAOfUe9nHZvchDkhQniKUK0cMWz4mwHWPgw','Fady2512')
    expect(msg).toEqual('Token is expired please try again');
  });

test ('Updates Password Investor with valid ID and valid old password', async () => {
  var validInvestorID = "5c7a9b46470a360ac8b0d412"
  var validOldPassword = "newPass"
  var newPassword = "newPass"
  //expect.assertions(1)
  const response = await Investor.investorChangePassword(validInvestorID,validOldPassword,newPassword)
  expect(response.data.msg).toEqual('The password was updated')
})


test ('Updates Password Investor with valid ID and invalid old password', async () => {
  var validInvestorID = "5c7a9b46470a360ac8b0d412"
  var validOldPassword = "x"
  var newPassword = "newPass"
  //expect.assertions(1)

  try {
    const response = await Investor.investorChangePassword(validInvestorID,validOldPassword,newPassword)
  } catch (e) {
    //console.log(e.response.data)
    expect(e.response.data.error).toMatch('The passwords do not match');
  }
  
})

test ('Updates Password Investor with invalid ID and valid old password', async () => {
  var validInvestorID = "x"
  var validOldPassword = "newPass"
  var newPassword = "newPass"
  //expect.assertions(1)

  try {
    const response = await Investor.investorChangePassword(validInvestorID,validOldPassword,newPassword)
  } catch (e) {
   // console.log(e.response.data)
    expect(e.response.data.error).toMatch('Error processing query.');
  }
  
})

test ('View notification of an investor', async () => {
  var validInvestorID = "5c7a9b46470a360ac8b0d412"
  //expect.assertions(1)
    const response = await Investor.investorMyNotifications(validInvestorID)
    //console.log(response)
    expect(response.data.msg).toEqual('Done')
})

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

  

test ('View notification of an investor with an invalid ID', async () => {
  var validInvestorID = "x"
  //expect.assertions(1)
  try {
    const response = await Investor.investorMyNotifications(validInvestorID)
  } catch (e) {
   // console.log(e.response.data)
    expect(e.response.data.error).toMatch('Error processing query.');
  }
  
})

test ('View pending companies of an investor', async () => {
  var validInvestorID = "5c7a9b46470a360ac8b0d412"
  //expect.assertions(1)
    const response = await Investor.viewMyPendingCompanies(validInvestorID)
    //console.log(response)
    expect(response.data.msg).toEqual('Done')

  
})

test ('View pending companies of an investor with an invalid ID', async () => {
  var validInvestorID = "x"
  //expect.assertions(1)
  try {
    const response = await Investor.viewMyPendingCompanies(validInvestorID)
  } catch (e) {
    //console.log(e.response.data)
    expect(e.response.data.error).toMatch('Error processing query.');
  }
  
})

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


test ('generate a PDF with a valid ID', async () => {
  var validCaseID = "5c9cfd1d05f1d42e68b75fb7"
  //expect.assertions(1)
    const response = await Investor.generatePdf(validCaseID)
    //console.log(response)
    expect(response.data.msg).toEqual('Done')

  
})

test ('generate a PDF with a invalid ID', async () => {
  jest.setTimeout(30000)
  var validCaseID = "x"
  //expect.assertions(1)
  try {
    const response = await Investor.generatePdf(validCaseID)
  } catch (e) {
    //console.log(e.response.data)
    expect(e.response.data.error).toMatch('Error processing query.');
  }
  
})
