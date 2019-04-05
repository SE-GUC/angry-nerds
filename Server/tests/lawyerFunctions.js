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


    



}

module.exports = lawyerFunctions