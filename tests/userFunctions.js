const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const UserFunctions = {

UnregViewing: async (id) => {
    const views= await axios.get('http://127.0.0.1:3000/UnregViewing/'+id)
    return views
    }
}
module.exports = UserFunctions