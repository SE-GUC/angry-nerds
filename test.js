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

  test('Delete a company that does not exist ', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.AdmDelCase('5c94e18af1eg6f3e48b0a2b8')
    console.log('shiitt')
    expect(id.data.message).toEqual('not a case')
  });



  test('Delete a company ', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.AdmDelCase('5c94e18af1ef0f3e48b0a2b8')
    console.log('yeeh')
    expect(id.data.message).toEqual('Case was deleted successfully')
  });

  test('Delete a Question that does not exist ', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.AdmDelQuestion('5c94e18af1eg6f3e48b0a2b8')
    console.log('notQUessss')
    expect(id.data.message).toEqual('not a ques')
  });

  test('Delete a Question ', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.AdmDelQuestion('5c77f15454746a2ec800e532')
    console.log('Quessss')
    expect(id.data.message).toEqual('This question was deleted successfully')
  });

  test('view as admin Inv', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.AdmViewing('5c93ac9555b21722fc46eb9b')
    console.log('view')
    expect(id.data.message).toEqual('investor')
  });

  test('view as admin Lawyer', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.AdmViewing('5c9e4dc353415c34a0f35cd1')
    console.log('view')
    expect(id.data.message).toEqual('lawyer')
  });
  test('view as admin Reviewer', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.AdmViewing('5c9f81974829dc64cc2c1d0e')
    console.log('view')
    expect(id.data.message).toEqual('Rev')
  });

  test('view as admin Admin', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.AdmViewing('5c9bb0dc5185793518ea84fb')
    console.log('view')
    expect(id.data.message).toEqual('Admin')
  });

  test('view as admin neither', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.AdmViewing('5c77f15454789a2ec800e532')
    console.log('view')
    expect(id.data.message).toEqual('User does not exist')
  });
  //----------------------------------------------
  test('view as Inv Inv', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.InvViewing('5c93ac9555b21722fc46eb9b')
    console.log('view')
    expect(id.data.message).toEqual('investor')
  });

  test('view as Inv Lawyer', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.InvViewing('5c9e4dc353415c34a0f35cd1')
    console.log('view')
    expect(id.data.message).toEqual('lawyer')
  });
  test('view as Inv Reviewer', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.InvViewing('5c9f81974829dc64cc2c1d0e')
    console.log('view')
    expect(id.data.message).toEqual('Rev')
  });

  test('view as Inv Admin', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.InvViewing('5c9bb0dc5185793518ea84fb')
    console.log('view')
    expect(id.data.message).toEqual('Admin')
  });

  test('view as Inv neither', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.InvViewing('5c77f15454789a2ec800e532')
    console.log('view')
    expect(id.data.message).toEqual('User does not exist')
  });
  //----------------------------------------------
  test('view as Rev Inv', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.RevViewing('5c93ac9555b21722fc46eb9b')
    console.log('view')
    expect(id.data.message).toEqual('investor')
  });

  test('view as Rev Lawyer', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.RevViewing('5c9e4dc353415c34a0f35cd1')
    console.log('view')
    expect(id.data.message).toEqual('lawyer')
  });
  test('view as Rev Reviewer', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.RevViewing('5c9f81974829dc64cc2c1d0e')
    console.log('view')
    expect(id.data.message).toEqual('Rev')
  });

  test('view as Rev Admin', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.RevViewing('5c9bb0dc5185793518ea84fb')
    console.log('view')
    expect(id.data.message).toEqual('Admin')
  });

  test('view as Rev neither', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.RevViewing('5c77f15454789a2ec800e532')
    console.log('view')
    expect(id.data.message).toEqual('User does not exist')
  });
  //----------------------------------------------
  test('view as unreg Inv', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.UnregViewing('5c93ac9555b21722fc46eb9b')
    console.log('view')
    expect(id.data.message).toEqual('investor')
  });

  test('view as unreg Lawyer', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.UnregViewing('5c9e4dc353415c34a0f35cd1')
    console.log('view')
    expect(id.data.message).toEqual('lawyer')
  });
  test('view as unreg Reviewer', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.UnregViewing('5c9f81974829dc64cc2c1d0e')
    console.log('view')
    expect(id.data.message).toEqual('Rev')
  });

  test('view as unreg Admin', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.UnregViewing('5c9bb0dc5185793518ea84fb')
    console.log('view')
    expect(id.data.message).toEqual('Admin')
  });

  test('view as unreg neither', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.UnregViewing('5c77f15454789a2ec800e532')
    console.log('view')
    expect(id.data.message).toEqual('User does not exist')
  });
  //----------------------------------------------
  test('view as Lawyer Inv', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.LawViewing('5c93ac9555b21722fc46eb9b')
    console.log('view')
    expect(id.data.message).toEqual('investor')
  });

  test('view as Lawyer Lawyer', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.LawViewing('5c9e4dc353415c34a0f35cd1')
    console.log('view')
    expect(id.data.message).toEqual('lawyer')
  });
  test('view as Lawyer Reviewer', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.LawViewing('5c9f81974829dc64cc2c1d0e')
    console.log('view')
    expect(id.data.message).toEqual('Rev')
  });

  test('view as Lawyer Admin', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.LawViewing('5c9bb0dc5185793518ea84fb')
    console.log('view')
    expect(id.data.message).toEqual('Admin')
  });

  test('view as Lawyer neither', async()=>{
    jest.setTimeout(50000)
    const id = await adminFunctions.LawViewing('5c77f15454789a2ec800e532')
    console.log('view')
    expect(id.data.message).toEqual('User does not exist')
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



