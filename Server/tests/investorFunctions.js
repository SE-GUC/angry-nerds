const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http')

const investorFunctions = {

  InvestorPayFees: async (cardnumber, month1, year1, cvc1) => {
    const charge = await axios({
      method: 'post',
      url: 'http://localhost:3000/InvestorPayFees',
      headers: {},
      data: { //body
        name: cardnumber,
        month: month1,
        year: year1,
        cvc: cvc1
      }
    });
    return charge
  },

    InvViewing: async (id) => {
      const views= await axios.get('http://127.0.0.1:3000/InvViewing/'+id)
      return views
      },
  InvestorViewFees: async (id)=>{
    const Case= await axios({
      method:'get',
      url: 'http://localhost:3000/InvestorViewFees/' + id

    })
    return Case
  },

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
  const comment = await axios({
      method: 'get',
      url: 'http://localhost:3000/InvestorViewComment'
      
    });
  return comment
},

investorViewProfile:  async () => {
  const investorProfile = await axios({
      method: 'get',
      url: 'http://localhost:3000/InvestorViewProfile'
      
    });
  return investorProfile
},






}

module.exports = investorFunctions