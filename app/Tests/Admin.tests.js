const functions = require ('../app/Functions/Admin.functions')

test ('View Laws', async() => {
    expect.assertions(1)
    const response = await functions.UserViewLaws()
    expect ({respone}.toEqual("Comment is recieved"))
})
