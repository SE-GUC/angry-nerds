const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const lawyerFunctions = {

LawViewing: async (id) => {
    const views= await axios.get('http://127.0.0.1:3000/LawViewing/'+id)
    return views
    },


    caseDisAproveedAtLawyer:  async (caseID) => {
        
        const CASE = await axios({
            method: 'put',
            url: 'http://127.0.0.1:3000/caseDisAproveedAtLawyer/'+caseID,
            headers: {}, 
            data: { //body
            }
          });
        return CASE
        
    },

    caseAproveedAtLawyer:  async (caseID, stafID) => {
        const CASE = await axios({
            method: 'put',
            url: 'http://127.0.0.1:3000/caseAproveedAtLawyer/'+caseID,
            headers: {}, 
            data: { //body
            }
          });
        return CASE
    },

    viewCasesLawyer:async () => {
        const CASE = await axios({
            method: 'get',
            url: 'http://localhost:3000/viewCasesLawyer',
            headers: {}, 
            data: { //body
               
            }
          });
        return CASE
    },


    



}

module.exports = lawyerFunctions