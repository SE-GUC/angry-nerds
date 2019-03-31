const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')


const adminFunctions = {

    adminEditCompany:  async (companyID) => {
      const company = await axios({
          method: 'put',
          url: 'http://localhost:3000/adminEditCompany/'+companyID,
          headers: {}, 
          data: { //body
            city: 'Alex' 
          }
        });
      return company
  },

    adminChangePricingStrategy: async (lawID) => {
      const Law = await axios ({
        method: 'put',
        url : 'http://127.0.0.1:3000/adminChangePricingStrategy/' + lawID,
        headers: {},
        data : {
          LawEntity: 'Malak'
        }
      })
      return Law 
    },

    adminCreateNewLaw: async () => {
      const law= await axios ({
        method: 'post',
        url : 'http://127.0.0.1:3000/adminCreateNewLaw',
        data : {
          LawNumber: "Law test",
          LawEntity: "Malak",
          LawValue: 0,
          LawCalc: 0,
          min: 0,
          max: 0
        }
      })
      return law
    },

    InvestorViewFees: async () => {
      const Case= await axios ({
        method: 'get',
        url : 'http://127.0.0.1:3000/InvestorViewFees/'+id
      })
      return Case
    }

}

module.exports = adminFunctions