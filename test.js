const funcs = require('./fn');

const Admin = require('./app/Functions/Admin.functions');

test('Forgot password with valid mail', async () => {
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
});


test('Reset password with expired token', async () => {
  const msg =  await Admin.MailResetPassword('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGTmFtZSI6IkZhZHkiLCJpYXQiOjE1NTQwNTg5MzYsImV4cCI6MTU1NDA2MjUzNn0.bl8zUKTgZAOfUe9nHZvchDkhQniKUK0cMWz4mwHWPgw','Fady2512')
  expect(msg).toEqual('Token is expired please try again');
});

