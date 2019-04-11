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
    


    



}

module.exports = lawyerFunctions