const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')

const UserFunctions = {

UnregViewing: async (id) => {
    const views= await axios.get('http://127.0.0.1:3000/UnregViewing/'+id)
    return views
    },

    //===============Hemaya Tests===================================================

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

    UnregisterViewDirectorsID: async() =>{
            const board = await axios({
                method: 'get',
                url: 'http://localhost:3000/api/Cases/ViewBoardOfDirectorsID/5c966104f876b95140121bd6',
                headers: {}, 
                data: { //body
                }
            });
            return board
    },



    
}
module.exports = UserFunctions

