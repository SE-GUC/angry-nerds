const axios = require ('axios')
axios.defaults.adapter = require ('axios/lib/adapters/http')


const functions = {

    MailForgotPassword : async (mail) => {
        const t = await axios({
            method: 'post',
            url:'http://127.0.0.1:3000/forgotpassword',
            headers: {}, 
            data: {
              email: mail, // This is the body part
            }
          });
          return t.data.message
    },

    adminChangePassword: async (id,old,newPass) =>{
      const body = {
          oldPassword: old,
          newPassword: newPass
      }
    //  console.log('Im hererer')
      const response = await axios.put('http://127.0.0.1:3000/AdminChangePassword/' + id , body)
    //  console.log(response)

      return response;
  },

}
module.exports = functions;