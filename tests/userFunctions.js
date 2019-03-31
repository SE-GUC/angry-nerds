const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const adminFunctions = {

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

}

module.exports = adminFunctions