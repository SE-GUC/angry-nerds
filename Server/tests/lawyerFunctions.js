const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const lawyerFunctions = {

LawViewing: async (id) => {
    const views= await axios.get('http://127.0.0.1:3000/LawViewing/'+id)
    return views
    },


    caseDisAproveedAtLawyer:  async (caseID, stafID) => {
        
        const CASE = await axios({
            method: 'put',
            url: 'http://127.0.0.1:3000/caseDisAproveedAtLawyer/'+stafID+'/'+caseID,
            headers: {}, 
            data: { //body
            }
          });
        return CASE.data.message
        
    },

    caseAproveedAtLawyer:  async (caseID, stafID) => {
        
        const CASE = await axios({
            method: 'put',
            url: 'http://localhost:3000/caseAproveedAtLawyer/'+stafID+'/'+caseID,
            headers: {}, 
            data: { //body
            }
          });
        return CASE.data.message
        
    },

    lawyerUpdateForm:  async (id) => {
      const form = await axios({
          method: 'put',
          url: 'http://localhost:3000/LawyerUpdateForm/'+ id,
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

    lawyerFillForm:  async () => {
      const form = await axios({
          method: 'post',
          url: 'http://localhost:3000/LawyerFillForm',
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
  lawyerViewComment:  async () => {
    const form = await axios({
        method: 'get',
        url: 'http://localhost:3000/LawyerViewComment',
        headers: {}, 
        data: { //body
           
        }
      });
    return form
},

lawyerViewLawyersLeaderBoard:async () => {
  const lead = await axios({
      method: 'get',
      url: 'http://localhost:3000/LawyerViewLawyersLeaderBoard',
      headers: {}, 
      data: { //body
         
      }
    });
  return lead
},
lawyerViewReviewersLeaderBoard:async () => {
  const lead = await axios({
      method: 'get',
      url: 'http://localhost:3000/LawyerViewReviewersLeaderBoard',
      headers: {}, 
      data: { //body
         
      }
    });
  return lead
}


    



}

module.exports = lawyerFunctions