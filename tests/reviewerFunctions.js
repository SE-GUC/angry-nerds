const axios = require ('axios');
const adapter = require('axios/lib/adapters/http')
// const LawyerTest = require('./app/Controllers/LawyerController');


const reviewerFunctions = {

    caseAproveedAtReviewer:  async (caseID, stafID) => {
        
        const CASE = await axios({
            method: 'put',
            url: 'http://127.0.0.1:3000/caseAproveedAtReviewer/'+stafID+'/'+caseID,
            headers: {}, 
            data: { //body
            }
          });
        return CASE.data.message
        
    },

    caseDisAproveedAtReviewer:  async (caseID, stafID) => {
        
        const CASE = await axios({
            method: 'put',
            url: 'http://localhost:3000/caseDisAproveedAtReviewer/'+stafID+'/'+caseID,
            headers: {}, 
            data: { //body
            }
          });
        return CASE.data.message
        
    },


    



}

module.exports = reviewerFunctions