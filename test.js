const funcs = require('./fn');

const Admin = require('./app/Functions/Admin.functions');
const Investor = require('./app/Functions/Investor.functions');

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
