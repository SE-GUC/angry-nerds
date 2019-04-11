const lawyer = require('./tests/lawyerFunctions');
const adminFunctions = require('./tests/adminFunctions')
const investorFunctions = require('./tests/investorFunctions')
const userFunctions = require('./tests/userFunctions')
//const Lawyer = require('./app/models/Lawyer')
const Reviewer = require('./app/models/Reviewer')
jest.setTimeout(5000)

const Admin = require('./app/Functions/Admin.functions');
const Investor = require('./app/Functions/InvestorFunctions')
const Lawyer = require('./app/Functions/Lawyer.functions')

const InvestorModel = require('./app/models/Investor')

test ('generate a PDF with a valid ID', async () => {

    const response = await Investor.generatePdf()
  
    expect(response.data.msg).toEqual('Done')
      
  })