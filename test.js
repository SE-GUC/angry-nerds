const funcs = require('./fn');

const Admin = require('./app/Functions/Admin.functions');
const Investor = require('./app/Functions/Investor.functions')
const Lawyer = require('./app/Functions/Lawyer.functions')


test('Forgot password with valid mail', async () => {
  const msg =  await Admin.MailForgotPassword('fady.wasfalla@gmail.com')
  expect(msg).toEqual('An email has been sent check your email');
});

test('Forgot password with invalid mail', async () => {
  const msg =  await Admin.MailForgotPassword('Wrong_mail@gmail.com')
  expect(msg).toEqual('incorrect email');
});





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

  








