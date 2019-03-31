const axios = require('axios');
const functions = {
        add: (x, y) => x + y,
        getUser: async () => {
                const user = await axios.get('https://jsonplaceholder.typicode.com/users/1')
                return user
        },
        getQuestions: async () => {
                const ques = await axios.get('http://localhost:3000/UnregisteredViewQuestions')
                return ques
        },

};
module.exports = functions;
