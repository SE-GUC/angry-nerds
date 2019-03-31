const axios = require ('axios');
const adapter = require('axios/lib/adapters/http')
// const LawyerTest = require('./app/Controllers/LawyerController');


const lawyerFunctions = {

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
            url: 'http://localhost:3000/caseDisAproveedAtLawyer/'+stafID+'/'+caseID,
            headers: {}, 
            data: { //body
            }
          });
        return CASE.data.message
        
    },


    



}

module.exports = lawyerFunctions