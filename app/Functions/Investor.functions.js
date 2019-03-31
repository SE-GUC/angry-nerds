const axios = require ('axios')
axios.defaults.adapter = require ('axios/lib/adapters/http')

const functions = {

    investorChangePassword: async (id,old,newPass) =>{
        const body = {
            oldPassword: old,
            newPassword: newPass
        }
        console.log('Im hererer')
        const response = await axios.put('http://127.0.0.1:3000/InvestorChangePassword/' + id , body)
      //  console.log(response)

        return response;
    },

    investorMyNotifications: async (id) => {
        const response = await axios.get('http://127.0.0.1:3000/InvestorMyNotifications/' + id)
        return response;
    },

    viewMyPublishedCompanies: async (id) => {
        const response = await axios.get('http://127.0.0.1:3000/ViewPublishedCompanies/' + id)
        return response;
    },

    viewMyPendingCompanies: async (id) => {
        const response = await axios.get('http://127.0.0.1:3000/ViewPendingCompanies/' + id)
        return response;
    },

    generatePdf: async (id) => {
        const response = await axios.get('http://127.0.0.1:3000/generatePdf/' + id)
        return response;
    }

}

module.exports = functions;