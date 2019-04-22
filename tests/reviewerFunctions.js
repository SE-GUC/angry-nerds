const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const reviewerFunctions = {


    ReviewerViewing: async (id) => {
    const views= await axios.get('http://127.0.0.1:3000/ReviewerViewing/'+id)
    return views
    },

    caseAproveedAtReviewer:  async (caseID) => {
        
        const CASE = await axios({
            method: 'put',
            url: 'http://127.0.0.1:3000/caseAproveedAtReviewer/'+caseID,
            headers: {}, 
            data: { //body
            }
          });
        return CASE
        
    },

    caseDisAproveedAtReviewer:  async (caseID) => {
        
        const CASE = await axios({
            method: 'put',
            url: 'http://localhost:3000/caseDisAproveedAtReviewer/'+caseID,
            headers: {}, 
            data: { //body
            }
          });
        return CASE
        
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
    },
    ReviewerViewingPublishedCompanies: async () => {
      const viewPC= await axios.get('http://127.0.0.1:3000/ReviewerViewingPublishedCompanies/')
      return viewPC
      },
  
      ReviewerViewingCompany: async (id) => {
        const viewC= await axios.get('http://localhost:3000/ReviewerViewingCompany/'+id)
        return viewC
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

    reviewerMyNotifications: async (len) => {

      var arr = []
      for(let i = 0;i < len;i++){
        arr.push({"text":"example"})
      }
      
        const newReviewer = await axios.post('http://127.0.0.1:3000/api/Reviewer',
        {
            "FirstName":"PAUL",
            "MiddleName": "achraf",
            "LastName": "fayez",
            "email": "ccccc.ccccc@gmail.com",
            "ID_type": "regular",
            "SSID": 930240219012394,
            "Nationality": "egy",
            "gender": "female",
            "Type": "pass",
            "Address": "3489hwihkbnknwe",
            "telephone_number": 894094820,
            "notifications": arr
        })
      
      console.log('herreee')
      const response = await axios.get('http://127.0.0.1:3000/ReviewerMyNotifications/' +  newReviewer.data.data._id)
      
      await axios.delete('http://127.0.0.1:3000/api/Reviewer/' + newReviewer.data.data._id)
      
      return response;
      },

      reviewerChangePassword: async (old1,old2,newPass) =>{
  
        const newReviewer = await axios.post('http://127.0.0.1:3000/api/Reviewer',
          {
              "FirstName":"PAUL",
              "MiddleName": "achraf",
              "LastName": "fayez",
              "email": "ccccc.ccccc@gmail.com",
              "password":old1,
              "ID_type": "regular",
              "SSID": 930240219012394,
              "Nationality": "egy",
              "gender": "female",
              "Type": "pass",
              "Address": "3489hwihkbnknwe",
              "telephone_number": 894094820,
              "notifications": []
          })
        
        
      
        const response = await axios.put('http://127.0.0.1:3000/ReviewerChangePassword/' +  newReviewer.data.data._id, {
          oldPassword: old2,
          newPassword: newPass
        })
        const updatedReviewer = await axios.get('http://127.0.0.1:3000/api/Reviewer/' + newReviewer.data.data._id)
        await axios.delete('http://127.0.0.1:3000/api/Reviewer/' + newReviewer.data.data._id)
      
      
      
        return {res: response, updatedReviewer: updatedReviewer.data.data};
      }
    


    



}

module.exports = reviewerFunctions