const adminFunctions = require('./tests/adminFunctions')
const investorFunctions = require('./tests/investorFunctions')

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



