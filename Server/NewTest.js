// const lawyer = require('./tests/lawyerFunctions');
// const reviewer = require('./tests/reviewerFunctions');
// jest.setTimeout(30000)


// test(`case disaproves at lawyer and casestatus should be investor`, async () => {
//     const CASE =  await lawyer.caseDisAproveedAtLawyer('5c95121386ba314a882d8d7f')    
//     expect(CASE.data.data.caseStatus).toEqual('investor')
//   });
  
//   test(`case aproved at lawyer and casestatus should be reviewer`, async () => {
//     const CASE =  await lawyer.caseAproveedAtLawyer('5c9512ba8aba002578c01ad6')    
//     expect(CASE.data.data.caseStatus).toEqual('reviewer')
//   });
  
  
//   test(`case disaproves at reviewer and casestatus should be lawyer`, async () => {
//     const CASE =  await lawyer.caseDisAproveedAtLawyer('5c7a9b46470a360ac8b0d412')    
//     expect(CASE.data.data.caseStatus).toEqual('lawyer')
//   });
  
//   test(`case aproved at reviewer and casestatus should be pending`, async () => {
//     const CASE =  await lawyer.caseAproveedAtReviewer('5c7a9b46470a360ac8b0d412')   
//     expect(CASE.data.data.caseStatus).toEqual('pending')
//   });
  
  
//     test('lawyer views all cases', async () => {
//       const CASE =  await lawyer.viewCasesLawyer( )
//       expect(CASE.data.msg).toEqual('Done');
  
//     });
  
//     test('Reviewer views all cases', async () => {
//       const CASE =  await reviewer.viewCasesReviewer( )
//       expect(CASE.data.msg).toEqual('Done');
  
//     });