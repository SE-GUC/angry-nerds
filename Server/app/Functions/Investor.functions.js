const axios = require ('axios')
axios.defaults.adapter = require ('axios/lib/adapters/http')

const functions = {
    investorFillForm:  async () => {
        const form = await axios({
            method: 'post',
            url: 'http://localhost:3000/InvestorFillForm',
            headers: {}, 
            data: { //body
                "form_type": "SSCP",
                "regulated_law": "Law 72",
                "arabic_name": "المصرى",
                "english_name": "newType3",
                "government": "Thai",
                "city": "Cairo",
                "address": "gftfy",
                "main_center_phone": 123515,
                "main_center_fax": 518563,
                "currency": "541",
                "equality_capital": 5054641641562,
                "fees":7776,
                "managers": []
                       
            }
          });
        return form
    },

    investorUpdateForm:  async (id) => {
        const form = await axios({
            method: 'put',
            url: 'http://localhost:3000/InvestorUpdateForm/'+id,
            headers: {}, 
            data: { //body
                "form_type": "SSCP",
                "regulated_law": "Law 72",
                "arabic_name": "المصرى",
                "english_name": "newType3",
                "government": "Thai",
                "city": "Cairo",
                "address": "gftfy",
                "main_center_phone": 123515,
                "main_center_fax": 518563,
                "currency": "541",
                "equality_capital": 5054641641562,
                "fees":7776,
                "managers": []
        

               
            }
          });
        return form
    },

    investorViewComment:  async () => {
        const form = await axios({
            method: 'get',
            url: 'http://localhost:3000/InvestorViewComment',
            headers: {}, 
            data: { //body
               
            }
          });
        return form
    },



    

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
