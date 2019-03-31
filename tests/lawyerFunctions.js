const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const lawyerFunctions = {

LawViewing: async (id) => {
    const views= await axios.get('http://127.0.0.1:3000/LawViewing/'+id)
    return views
    },
}
module.exports = lawyerFunctions