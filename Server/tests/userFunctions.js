const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const UserFunctions = {

UnregisterViewing: async (id) => {
    const views= await axios.get('http://127.0.0.1:3000/UnregisterViewing/'+id)
    return views
    },

    
    UnregisterViewQuestions:  async () => {
        const ques = await axios({
            method: 'get',
            url: 'http://localhost:3000/UnregisteredViewQuestions/',
            headers: {}, 
            data: { //body
            }
        });
        return ques
    },

    UnregisterViewingPublishedCompanies: async () => {
        const viewPC= await axios.get('http://127.0.0.1:3000/UnregisterViewingPublishedCompanies/')
        return viewPC
        },
    
        UnregisterViewingCompany: async (id) => {
          const viewC= await axios.get('http://localhost:3000/UnregisterViewingCompany/'+id)
          return viewC
          },
    
}
module.exports = UserFunctions

