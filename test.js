const adminFunctions = require('./tests/adminFunctions')
const investorFunctions = require('./tests/investorFunctions')
const userFunctions = require('./tests/userFunctions')
const Lawyer = require('./app/models/Lawyer')
jest.setTimeout(30000)
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
  
      "Nationality":"Egyptian",
  
      "birthdate":"1980",
  
      "Address":"11 makram",
  
  
      "fax":"125252",
  
      "telephone_number":"151515",
      
      "total_number_of_cases": "588",
      "completed_number_of_cases":"561",
      "number_of_cases":"2",
      "total_time_on_cases":"25",
  
      "ssid": "15552"
      }
  
   // await Lawyer.create(data)
    const ques =  await adminFunctions.AdminRegisterLawyer();
    expect(ques).to.have.status(400)
  });





