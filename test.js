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




/*
test('adds 1 + 2 to be 3', () => {
  expect(funcs.add(1, 2)).toBe(3);
});


//To be exact comparison, with objects use toEqual
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
  });

  test('adding positive numbers is not zero', () => {
        const a = 1
        const b = 2
        expect(a + b).not.toBe(0);
  });

  test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3);           This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
  });

  test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });
  
  test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });

  const people = [
    'Ammar',
    'Leo',
    'Barney',
    'Jaime',
    'Tywin',
  ];
  
  test('The list of people has Ammar on it', () => {
    expect(people).toContain('Ammar');
  });


// //Working with async
//   test('First book should be Crime and Punishment', async () => {
//     expect.assertions(1)
//     const response =  await funcs.getBooks()
//     expect(response.data.data[0].title).toEqual('Crime and Puishment')
//   });

//   test('Number of books should be 11', async () => {
//     expect.assertions(1)
//     const response =  await funcs.getBooks()
//     expect(response.data.data.length).toBe(11)
//   });

//   test(`User's name should be  Leanne Graham`, async () => {
//     expect.assertions(1)
//     const user =  await funcs.getUser()
//     expect(user.data.name).toEqual('Leanne Graham')
//   });
*/
