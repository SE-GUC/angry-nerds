
    
const lawyer = require('./tests/lawyerFunctions');
const reviewer = require('./tests/reviewerFunctions');
const adminFunctions = require('./tests/adminFunctions')
const investorFunctions = require('./tests/investorFunctions')
const userFunctions = require('./tests/userFunctions')
//const Lawyer = require('./app/models/Lawyer')
const Reviewer = require('./app/models/Reviewer')
//jest.setTimeout(30000)

const Admin = require('./app/Functions/Admin.functions');
const Investor = require('./app/Functions/Investor.functions')
const Lawyer = require('./app/Functions/Lawyer.functions')




test('investor fill form', async () => {
    const msg =  await investorFunctions.investorFillForm()
    expect(msg.data.msg).toEqual('The form was created successfully');
  });   
  
  test('investor update form', async () => {
    const msg =  await investorFunctions.investorUpdateForm('5c9501b04f707b3968c9275e')
    expect(msg.data.msg).toEqual('Form updated successfully');
  });
  
  test('investor view comment', async () => {
    const com =  await investorFunctions.investorViewComment()
    expect(com.data).toEqual({});
  }); 
  
  test('investor view profile', async () => {
    const prof=  await investorFunctions.investorViewProfile()
    expect(prof.data.msg).toEqual('Done');
  });
  
  test('lawyer update form', async () => {
    const msg =  await lawyer.lawyerUpdateForm('5c950069f2380140941b74f0')
    expect(msg.data.msg).toEqual('Form updated successfully');
  });
  
  test('lawyer fill form', async () => {
    const msg =  await lawyer.lawyerFillForm()
    expect(msg.data.msg).toEqual('The form was created successfully');
  });
  
  test('lawyer view comment', async () => {
    const comment =  await lawyer.lawyerViewComment()
    expect(comment.data).toEqual({});
  });
  
    test('lawyer view reviewerLeaderBoard', async () => {
      const msg =  await lawyer.lawyerViewReviewersLeaderBoard()
      expect(msg.data.msg).toEqual('Done');
    });
  
    test('lawyer view lawyerLeaderBoard', async () => {
    const msg =  await lawyer.lawyerViewLawyersLeaderBoard()
    expect(msg.data.msg).toEqual('Done');
  });
  
  test('admin view comment', async () => {
    const com =  await adminFunctions.adminViewComment()
    expect(com.data).toEqual({});
  }); 
  
  test('Admin view lawyerLeaderBoard', async () => {
    const msg =  await adminFunctions.adminViewLawyersLeaderBoard()
    expect(msg.data.msg).toEqual('Done');
  }); 
  
  test('Admin view ReviewersLeaderBoard', async () => {
    const msg =  await adminFunctions.adminViewReviewersLeaderBoard()
    expect(msg.data.msg).toEqual('Done');
  });
  
  test('Reviewer view lawyersLeaderBoard', async () => {
    const msg =  await reviewer.reviewerViewLawyersLeaderBoard()
    expect(msg.data.msg).toEqual('Done');
  });
  
  
  test('Reviewer view reviewersLeaderBoard', async () => {
  const msg =  await reviewer.reviewerViewReviewersLeaderBoard()
  expect(msg.data.msg).toEqual('Done');
  });