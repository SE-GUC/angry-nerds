const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const lawyerFunctions = {

LawyerViewing: async (id) => {
    const views= await axios.get('http://127.0.0.1:3000/LawyerViewing/'+id)
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
    
    LawyerViewingPublishedCompanies: async () => {
      const viewPC= await axios.get('http://127.0.0.1:3000/LawyerViewingPublishedCompanies/')
      return viewPC
      },
  
      LawyerViewingCompany: async (id) => {
        const viewC= await axios.get('http://127.0.0.1:3000/LawyerViewingCompany/'+id)
        return viewC
        },
  

    lawyerMyNotifications: async (len) => {

      var arr = []
      for(let i = 0;i < len;i++){
        arr.push({"text":"example"})
      }
      
        const newLawyer = await axios.post('http://127.0.0.1:3000/api/Lawyer',
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
      
      const response = await axios.get('http://127.0.0.1:3000/lawyerMyNotifications/' +  newLawyer.data.data._id)
      
      await axios.delete('http://127.0.0.1:3000/api/Lawyer/' + newLawyer.data.data._id)
      
      return response;
      },

      lawyerChangePassword: async (old1,old2,newPass) =>{
        
        const newLawyer = await axios.post('http://127.0.0.1:3000/api/Lawyer',
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
        
        
   
        const response = await axios.put('http://127.0.0.1:3000/LawyerChangePassword/' +  newLawyer.data.data._id, {
          oldPassword: old2,
          newPassword: newPass
        })
        const updatedLawyer = await axios.get('http://127.0.0.1:3000/api/Lawyer/' + newLawyer.data.data._id)
        await axios.delete('http://127.0.0.1:3000/api/Lawyer/' + newLawyer.data.data._id)
      
      
      
        return {res: response, updatedLawyer: updatedLawyer.data.data};
      }
    

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