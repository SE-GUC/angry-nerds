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

    reviewerViewLawyersLeaderBoard:async () => {
      const lead = await axios({
          method: 'get',
          url: 'http://localhost:3000/ReviewerViewLawyersLeaderBoard',
          headers: {}, 
          data: { //body
             
          }
        });
      return lead
    },
    reviewerViewReviewersLeaderBoard:async () => {
      const lead = await axios({
          method: 'get',
          url: 'http://localhost:3000/ReviewerViewReviewersLeaderBoard',
          headers: {}, 
          data: { //body
             
          }
        });
      return lead
    }


    



}

module.exports = reviewerFunctions