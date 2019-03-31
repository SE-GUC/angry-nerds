const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const reviewerFunctions = {


    RevViewing: async (id) => {
    const views= await axios.get('http://127.0.0.1:3000/RevViewing/'+id)
    return views
    },
}
module.exports = reviewerFunctions