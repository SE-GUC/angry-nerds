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

  //Investor tests
  test(`paying fees for a company with valid card`, async () => {
    const charge =  await investorFunctions.InvestorPayFees(4242424242424242,12,19,121)
    expect(charge.data.message).toEqual
    ('your payment has been made; you will receive an invoice via your mail.' )
  });

  test(`paying fees for a company with expired card`, async () => {
    const charge =  await investorFunctions.InvestorPayFees(4242424242424242,1,19,121)
    console.log(charge)
    expect(charge.data.message).toEqual
    ('card declined' )
  });



