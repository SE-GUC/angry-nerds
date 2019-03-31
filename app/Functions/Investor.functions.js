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
    }





}

module.exports = functions
    
