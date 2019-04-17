const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");
jest.setTimeout(30000);

const adminFunctions = {

  AdminDeleteLawyer: async (id) => {
    const lawyer = await axios({
      method: "delete",
      url: "http://127.0.0.1:3000/AdminDeleteLawyer/" + id,
      headers: {},
      data: {}
    });
    return lawyer;
  },

  AdminDeleteReviewer: async (id) => {
    const reviewer = await axios({
      method: "delete",
      url: "http://127.0.0.1:3000/AdminDeleteReviewer/" + id,
      headers: {},
      data: {}
    });
    return reviewer;
  },
  MailForgotPassword : async (mail) => {
    const t = await axios({
        method: 'get',
        url:'http://127.0.0.1:3000/forgotpassword',
        headers: {}, 
        data: {
          email: mail, // This is the body part
        }
      });      
      return t
},
MailResetPassword : async (token,password) => {
  const t = await axios({
      method: 'post',
      url:'http://127.0.0.1:3000/resetpassword/'+token,
      headers: {}, 
      data: {
        pass: password, // This is the body part
      }
    });
    return t.data.message
},

  adminChangePricingStrategy: async lawID => {
    const Law = await axios({
      method: "put",
      url: "http://127.0.0.1:3000/adminChangePricingStrategy/" + lawID,
      headers: {},
      data: {
        LawEntity: "Malak"
      }
    });
    return Law;
  },
  AdminEditCompany: async companyID => {
    const company = await axios({
      method: "put",
      url: "http://localhost:3000/AdminEditCompany/" + companyID,
      headers: {},
      data: {
        //body
        city: "Alex"
      }
    });
    return company;
  },
  AdminRegisterLawyer: async () => {
    const lawyer = await axios({
      method: "post",
      url: "http://localhost:3000/AdminRegisterLawyer/",
      headers: {},
      data:
      {
        "FName": "Romba",
        "MName": "Ramremo",
        "LName": "Gamd",
        "email": "fr@gmail.com",
        "password": "cnjdqqcrjcsjn151215'",
        "gender": "Male",
        "Nationality": "Egyptian",
        "birthdate": "1980",
        "Address": "11 makram",
        "fax": "125252",
        "telephone_number": "151515",
        "total_number_of_cases": "588",
        "completed_number_of_cases": "561",
        "number_of_cases": "2",
        "total_time_on_cases": "25",
        "ssid": "15552"
      }
    });
    return lawyer;
  },
  AdminRegisterReviewer: async () => {
    const rev = await axios({
      method: "post",
      url: "http://localhost:3000/AdminRegisterReviewer/",
      headers: {},
      data: {
        FName: "Romba",
        MName: "Ramremo",
        LName: "Gamd",
        email: "fr@gmail.com",
        password: "cnjdqqcrjcsjn151215'",
        gender: "Male",

        Nationality: "Egyptian",

        birthdate: "1980",

        Address: "11 makram",

        fax: "125252",

        telephone_number: "151515",

        total_number_of_cases: "588",
        completed_number_of_cases: "561",
        number_of_cases: "2",
        total_time_on_cases: "25",
        ssid: "15552"
      }
    });
    return rev;
  },
  AdminRegisterLawyerSuccessfully: async () => {
    const lawyer = await axios({
      method: "post",
      url: "http://127.0.0.1:3000/AdminRegisterLawyer/",
      headers: {},
      data:
      {
        "FName": "Romba",
        "MName": "Ramremo",
        "LName": "Gamd",
        "email": "new_emaill@gmail.com",
        "password": "cnjdqqcrjcsjn151215'",
        "gender": "Male",
        "Nationality": "Egyptian",
        "birthdate": "1980",
        "Address": "11 makram",
        "fax": "125252",
        "telephone_number": "151515",
        "total_number_of_cases": "588",
        "completed_number_of_cases": "561",
        "number_of_cases": "2",
        "total_time_on_cases": "25",
        "ssid": "15552"
      }
    });
    return lawyer;
  },
  AdminRegisterReviewerSuccessfully: async () => {
    const rev = await axios({
      method: "post",
      url: "http://127.0.0.1:3000/AdminRegisterReviewer/",
      headers: {},
      data: {
        FName: "Romba",
        MName: "Ramremo",
        LName: "Gamd",
        email: "new_emaill@gmail.com",
        password: "cnjdqqcrjcsjn151215'",
        gender: "Male",

        Nationality: "Egyptian",

        birthdate: "1980",

        Address: "11 makram",

        fax: "125252",

        telephone_number: "151515",

        total_number_of_cases: "588",
        completed_number_of_cases: "561",
        number_of_cases: "2",
        total_time_on_cases: "25",
        ssid: "15552"
      }
    });
    return rev;
  },
  AdminRegisterAdmin: async () => {
    const rev = await axios({
      method: "post",
      url: "http://localhost:3000/AdminRegisterAdmin/",
      headers: {},
      data: {
        FName: "Romba",
        MName: "Ramremo",
        LName: "Gamd",
        email: "fady.wasfalla@gmail.com",
        password: "cnjdqqcrjcsjn151215'",
        gender: "Male",
        Type: "Admin",

        Nationality: "Egyptian",

        birthdate: "1980",

        Address: "11 makram",

        fax: "125252",

        telephone_number: "151515",

        total_number_of_cases: "588",
        completed_number_of_cases: "561",
        number_of_cases: "2",
        total_time_on_cases: "25",
        ssid: "15552"
      }
    });
    return rev;
  },
  AdminRegisterAdminSuccessfully: async () => {
    const rev = await axios({
      method: "post",
      url: "http://127.0.0.1:3000/AdminRegisterAdmin/",
      headers: {},
      data:
      {
        "FName": "Romba",
        "MName": "Ramremo",
        "LName": "Gamd",
        "email": "new_emaill@gmail.com",
        "password": "cnjdqqcrjcsjn151215'",
        "gender": "Male",
        "Type": "Admin",
        "Nationality": "Egyptian",
        "birthdate": "1980",
        "Address": "11 makram",
        "fax": "125252",
        "telephone_number": "151515",
        "total_number_of_cases": "588",
        "completed_number_of_cases": "561",
        "number_of_cases": "2",
        "total_time_on_cases": "25",
        "ssid": "15552"
      }
    });
    return rev;
  },
  AdminRegisterAdminType: async () => {
    const rev = await axios({
      method: "post",
      url: "http://127.0.0.1:3000/AdminRegisterAdmin/",
      headers: {},
      data:
      {
        "FName": "Romba",
        "MName": "Ramremo",
        "LName": "Gamd",
        "email": "cjdncjnd@gmail.com",
        "password": "cnjdqqcrjcsjn151215",
        "gender": "Male",
        "Type": "Super",
        "Nationality": "Egyptian",
        "birthdate": "1980",
        "Address": "11 makram",
        "fax": "125252",
        "telephone_number": "151515",
        "total_number_of_cases": "588",
        "completed_number_of_cases": "561",
        "number_of_cases": "2",
        "total_time_on_cases": "25",
        "ssid": "15552"
      }
    });
    return rev;
  },

  AdminDeleteInvestorNot: async () => {
    const rev = await axios({
      method: "delete",
      url: "http://127.0.0.1:3000/AdminDeleteInvestor/5c8623177eecbf06c03fd74e",
      headers: {},
      data: {}
    });
    return rev;
  },
  AdminDeleteInvestor: async () => {
    const rev = await axios({
      method: 'post',
      url: 'http://localhost:3000/api/Investor/',
      headers: {},
      data:
      {
        "FirstName": "Romba",
        "MiddleName": "Ramremo",
        "LastName": "Gamd",
        "email": "fady.wasfalla@gmail.com",
        "password": "Aa123456",
        "gender": "Male",
        "ID_type": "Sup",
        "Type": "Sup",
        "Nationality": "Egyptian",
        "birthdate": "1980",
        "Address": "11 makram",
        "fax": "125252",
        "telephone_number": "151515",
        "SSID": "588"
      }});
    const rev1 = await axios({
      method: 'delete',
      url: 'http://127.0.0.1:3000/AdminDeleteInvestor/'+rev.data.data._id,
      headers: {},
      data: {}
    });
    return rev1
  },

  AdminAssignLawyer: async (caseid, lawyerid) => {
    const cases = await axios({
      method: "put",
      url: "http://localhost:3000/AdminAssignLawyer",
      headers: {},
      data: {
        CaseId: caseid,
        LawyerId: lawyerid
      }
    });
    return cases.data.msg;
  },
  AdminAssignReviewer: async (caseid, revid) => {
    const cases = await axios({
      method: "put",
      url: "http://localhost:3000/AdminAssignReviewer",
      headers: {},
      data: {
        CaseId: caseid,
        ReviewerId: revid
      }
    });
    return cases.data.msg;
  },
  CheckForms: async (data) => {
    const form = await axios({      
      method: 'post',
      url: 'http://localhost:3000/api/Cases',
      headers: {},
      data: {
        // investorId: "5c77c2b0c5973856f492f33e",
        // form_type: "SSC"
      }
    });
    return form;
  },

  SendAttachmentMail: async mail => {
    const m = await axios({
      method: "post",
      headers: {},
      url: "http://localhost:3000/SendAttachmentMail",
      data: {
        email: mail
      }
    });
    console.log(m.data.message);
    return m.data.message;
  },

  // adminCreateNewLaw: async () => {
  //   const law = await axios({
  //     method: "post",
  //     url: "http://127.0.0.1:3000/adminCreateNewLaw",
  //     data: {
  //       LawNumber: "Law test",
  //       LawEntity: "Malak",
  //       LawValue: 0,
  //       LawCalc: 0,
  //       min: 0,
  //       max: 0
  //     }
  //   });
  //   return law;
  // },

  InvestorViewFees: async () => {
    const Case = await axios({
      method: "get",
      url: "http://127.0.0.1:3000/InvestorViewFees/" + id
    });
    return Case;
  },

  AdmDelCase: async id => {
    console.log("im here" + id);
    const DelCase = await axios({
      method: "delete",
      url: "http://127.0.0.1:3000/AdmDelCase/" + id,
      headers: {}
    });
    console.log("daammnnnzzyyy");
    return DelCase;
  },

    AdminDeleteCase: async(id)=> {
      console.log('im here' + id)
      const DelCase = await axios({

        method: 'delete',
        url: 'http://127.0.0.1:3000/AdminDeleteCase/'+ id,
        headers:{},
        
      })
      return DelCase
      },
        
        
  adminChangePassword: async (old1,old2,newPass) =>{
        
    const newAdmin = await axios.post('http://127.0.0.1:3000/api/Admin',
      {
          "FirstName":"PAUL",
          "MiddleName": "achraf",
          "LastName": "fayez",
          "email": "ccccc.ccccc@gmail.com",
          "password":old1,
          "ID_type": "regular",
          "SSID": 930240219012394,
          "Nationality": "egy",
          "gender": "female",
          "Type": "pass",
          "Address": "3489hwihkbnknwe",
          "telephone_number": 894094820,
          "notifications": []
      })
      const response = await axios.put('http://127.0.0.1:3000/AdminChangePassword/' +  newAdmin.data.data._id, {
        oldPassword: old2,
        newPassword: newPass
      })
      const updatedAdmin = await axios.get('http://127.0.0.1:3000/api/Admin/' + newAdmin.data.data._id)
      await axios.delete('http://127.0.0.1:3000/api/Admin/' + newAdmin.data.data._id)
    
    
    
      return {res: response, updatedAdmin: updatedAdmin.data.data};
    },

      


AdminDeleteQuestion: async(id)=> {
  console.log('im here' + id)
  const DelCase = await axios({

    method: 'delete',
    url: 'http://127.0.0.1:3000/AdminDeleteQuestion/'+ id,
    headers:{},
    
    
    
  })
  return DelCase
},    

AdminViewing: async (id) => {
  const views= await axios.get('http://localhost:3000/AdminViewing/'+id)
  return views
  },
  
  adminViewComment:  async () => {
    const comment = await axios({
        method: 'get',
        url: 'http://localhost:3000/AdminViewComment',
        headers: {}, 
        data: { //body
           
        }
      });
    return comment
},

adminViewLawyersLeaderBoard:async () => {
  const lead = await axios({
      method: 'get',
      url: 'http://localhost:3000/AdminViewLawyersLeaderBoard',
      headers: {}, 
      data: { //body
         
      }
    });
  return lead
},

adminViewReviewersLeaderBoard:async () => {
  const lead = await axios({
      method: 'get',
      url: 'http://localhost:3000/AdminViewReviewersLeaderBoard',
      headers: {}, 
      data: { //body
         
      }
    });
  return lead
},



  AdminViewingPublishedCompanies: async () => {
    const viewPC= await axios.get('http://localhost:3000/AdminViewingPublishedCompanies/')
    return viewPC
    },

    AdminViewingCompany: async (id) => {
      const viewC= await axios.get('http://localhost:3000/AdminViewingCompany/'+id)
      return viewC
      },
      

  adminCalculateAverage: async (old1,old2,newPass) =>{
        
    const newAdmin = await axios.post('http://127.0.0.1:3000/api/Admin',
      {
          "FirstName":"PAUL",
          "MiddleName": "achraf",
          "LastName": "fayez",
          "email": "ccccc.ccccc@gmail.com",
          "password":old1,
          "ID_type": "regular",
          "SSID": 930240219012394,
          "Nationality": "egy",
          "gender": "female",
          "Type": "pass",
          "Address": "3489hwihkbnknwe",
          "telephone_number": 894094820,
          "notifications": []
      })
    
    

    const response = await axios.put('http://127.0.0.1:3000/AdminChangePassword/' +  newAdmin.data.data._id, {
      oldPassword: old2,
      newPassword: newPass
    })
    const updatedAdmin = await axios.get('http://127.0.0.1:3000/api/Admin/' + newAdmin.data.data._id)
    await axios.delete('http://127.0.0.1:3000/api/Admin/' + newAdmin.data.data._id)
  
  
  
    return {res: response, updatedAdmin: updatedAdmin.data.data};
  },
  AdmDelQuestion: async id => {
    console.log("im here" + id);
    const DelCase = await axios({
      method: "delete",
      url: "http://127.0.0.1:3000/AdmDelQuestion/" + id,
      headers: {}
    });
    console.log("daammnnnzzyyy");
    return DelCase;
  },

  AdmViewing: async id => {
    const views = await axios.get("http://127.0.0.1:3000/AdmViewing/" + id);
    return views;
  },

  ////MALAK

  adminCreateNewLaw: async () => {
    const law = await axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/adminCreateNewLaw',
      data: {
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
adminChangePricingStrategy: async (lawID) => {
    const Law = await axios({
      method: 'put',
      url: 'http://127.0.0.1:3000/adminChangePricingStrategy/' + lawID,
      headers: {},
      data: {
        LawEntity: 'Malak'
      }
    })
    return Law
  }



};

module.exports = adminFunctions;
