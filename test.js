const lawyer = require('./tests/lawyerFunctions');






test(`case disaproves at lawyer and casestatus should be investor`, async () => {
  const CASE =  await lawyer.caseDisAproveedAtLawyer('5c7a9b46470a360ac8b0d412','5c94df923c95ff18c8866d54')    // stafID+'/:'+caseID,
  expect(CASE.data.message).toEqual('Case aproved')
});

test(`case aproves at lawyer and casestatus should be reviewer`, async () => {
  const CASE =  await lawyer.caseAproveedAtLawyer('5c94df923c95ff18c8866d54','5c7a9b46470a360ac8b0d412')    // stafID+'/:'+caseID,
  expect(CASE.data.message).toEqual('Case approved')
});


// test(`case disaproves at reviewer and casestatus should be lawyer`, async () => {
//   const CASE =  await lawyer.caseDisAproveedAtLawyer('5c7a9b46470a360ac8b0d412','5c94df923c95ff18c8866d54')    // stafID+'/:'+caseID,
//   expect(CASE.data.caseStatus).toEqual('lawyer')
// });

// test(`case aproves at reviewer and casestatus should be pending`, async () => {
//   const CASE =  await lawyer.caseDisAproveedAtLawyer('5c7a9b46470a360ac8b0d412','5c94df923c95ff18c8866d54')    // stafID+'/:'+caseID,
//   expect(CASE.data.caseStatus).toEqual('pending')
// });




