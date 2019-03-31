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

}

module.exports = adminFunctions