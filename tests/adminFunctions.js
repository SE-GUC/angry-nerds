const axios = require('axios');
axios.defaults.adapter = require ('axios/lib/adapters/http')
jest.setTimeout( 30000);

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


    AdminAssignLawyer : async(caseid,lawyerid) => {
        const cases = await axios({
            method: 'put',
            url: 'http://localhost:3000/AdminAssignLawyer',
            headers: {}, 
            data: { 
              CaseId : caseid  ,
              LawyerId : lawyerid
            }
          });
        return cases.data.msg
    },
    AdminAssignReviewer : async(caseid,revid) => {
      const cases = await axios({
          method: 'put',
          url: 'http://localhost:3000/AdminAssignReviewer',
          headers: {}, 
          data: { 
            CaseId : caseid  ,
            ReviewerId : revid
          }
        });
      return cases.data.msg
  },
    CheckFroms : async() => {
      const form = await axios({
          method: 'put',
          url: 'http://localhost:3000/api/Cases',
          headers: {},
          data: {
              investorId: "5c77c2b0c5973856f492f33e",
              form_type: "SSC"
          }
      });
      return form
  },
  

  SendAttachmentMail: async(mail) => {
    const m = await axios({ 
      method: 'post',
      headers : {},
      url:'http://localhost:3000/SendAttachmentMail',
      data: {
        email: mail,
      }
    });
    console.log(m.data.message)
    return m.data.message
  }

}

module.exports = adminFunctions