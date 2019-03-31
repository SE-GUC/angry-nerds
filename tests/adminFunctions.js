const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const adminFunctions = {

    AdminEditCompany:  async (companyID) => {
        const company = await axios({
            method: 'put',
            url: 'http://127.0.0.1:3000/AdminEditCompany/'+companyID,
            headers: {}, 
            data: { //body
              city: 'Alex' 
            }
          });
        return company
    },

    AdmDelCase: async(id)=> {
      console.log('im here' + id)
      const DelCase = await axios({

        method: 'delete',
        url: 'http://127.0.0.1:3000/AdmDelCase/'+ id,
        headers:{},
        
        
        
      })
      console.log('daammnnnzzyyy')
      return DelCase
    },


AdmDelQuestion: async(id)=> {
  console.log('im here' + id)
  const DelCase = await axios({

    method: 'delete',
    url: 'http://127.0.0.1:3000/AdmDelQuestion/'+ id,
    headers:{},
    
    
    
  })
  console.log('daammnnnzzyyy')
  return DelCase
},    

AdmViewing: async (id) => {
  const views= await axios.get('http://127.0.0.1:3000/AdmViewing/'+id)
  return views
  },




}

module.exports = adminFunctions