const adminFunctions = require('./tests/adminFunctions')
const investorFunctions = require('./tests/investorFunctions')
const userFunctions = require('./tests/userFunctions')
const Lawyer = require('./app/models/Lawyer')
const Reviewer = require('./app/models/Reviewer')
jest.setTimeout(30000)
//Admin tests

// test(`Editing company city to Alex`, async () => {
//     const company =  await adminFunctions.AdminEditCompany('5c9502b9ae1fad2e00c0bc7a')
//     expect(company.data.data.city).toEqual('Alex')
//   });

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




