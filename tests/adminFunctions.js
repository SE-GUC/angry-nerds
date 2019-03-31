const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const adminFunctions = {

    AdminEditCompany:  async (companyID) => {
        const company = await axios({
            method: 'put',
            url: 'http://localhost:3000/AdminEditCompany/'+companyID,
            headers: {}, 
            data: { //body
              city: 'Alex' 
            }
          });
        return company
    },
    AdminRegisterLawyer:  async () => {
      const lawyer = await axios({
          method: 'post',
          url: 'http://localhost:3000/AdminRegisterLawyer/',
          headers: {}, 
          data: 
          {
            "FName":"Romba",
              "MName": "Ramremo",
              "LName":"Gamd",
              "email": "fr@gmail.com",
              "password":"cnjdqqcrjcsjn151215'",
              "gender": "Male",
          
              "Nationality":"Egyptian",
          
              "birthdate":"1980",
          
              "Address":"11 makram",
          
          
              "fax":"125252",
          
              "telephone_number":"151515",
              
              "total_number_of_cases": "588",
              "completed_number_of_cases":"561",
              "number_of_cases":"2",
              "total_time_on_cases":"25", 
              "ssid": "15552"
              }
          
        });
      return lawyer
  },

}

module.exports = adminFunctions