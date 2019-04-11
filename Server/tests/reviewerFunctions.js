const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const reviewerFunctions = {


    ReviewerViewing: async (id) => {
    const views= await axios.get('http://127.0.0.1:3000/ReviewerViewing/'+id)
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

    ReviewerViewingPublishedCompanies: async () => {
      const viewPC= await axios.get('http://127.0.0.1:3000/ReviewerViewingPublishedCompanies/')
      return viewPC
      },
  
      ReviewerViewingCompany: async (id) => {
        const viewC= await axios.get('http://localhost:3000/ReviewerViewingCompany/'+id)
        return viewC
        },
  

    



}

module.exports = reviewerFunctions