const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const reviewerFunctions = {


    RevViewing: async (id) => {
    const views= await axios.get('http://127.0.0.1:3000/RevViewing/'+id)
    return views
    },

    caseAproveedAtReviewer:  async (caseID, stafID) => {
        
        const CASE = await axios({
            method: 'put',
            url: 'http://127.0.0.1:3000/caseAproveedAtReviewer/'+stafID+'/'+caseID,
            headers: {}, 
            data: { //body
            }
          });
        return CASE
        
    },

    caseDisAproveedAtReviewer:  async (caseID, stafID) => {
        
        const CASE = await axios({
            method: 'put',
            url: 'http://localhost:3000/caseDisAproveedAtReviewer/'+stafID+'/'+caseID,
            headers: {}, 
            data: { //body
            }
          });
        return CASE
        
    },

    viewCasesReviewer:async () => {
        const CASE = await axios({
            method: 'get',
            url: 'http://localhost:3000/viewCasesReviewer',
            headers: {}, 
            data: { //body
               
            }
          });
        return CASE
    },



    



}

module.exports = reviewerFunctions