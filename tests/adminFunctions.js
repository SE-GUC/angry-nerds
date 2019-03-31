const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http')

const adminFunctions = {

  AdminEditCompany: async (companyID) => {
    const company = await axios({
      method: 'put',
      url: 'http://localhost:3000/AdminEditCompany/' + companyID,
      headers: {},
      data: { //body
        city: 'Alex'
      }
    });
    return company
  },
  AdminRegisterLawyer: async () => {
    const lawyer = await axios({
      method: 'post',
      url: 'http://localhost:3000/AdminRegisterLawyer/',
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
    return lawyer
  },
  AdminRegisterReviewer: async () => {
    const rev = await axios({
      method: 'post',
      url: 'http://localhost:3000/AdminRegisterReviewer/',
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
    return rev
  },
  AdminRegisterLawyerSuccessfully: async () => {
    const lawyer = await axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/AdminRegisterLawyer/',
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
    return lawyer
  },
  AdminRegisterReviewerSuccessfully: async () => {
    const rev = await axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/AdminRegisterReviewer/',
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
    return rev
  },
  AdminRegisterAdmin: async () => {
    const rev = await axios({
      method: 'post',
      url: 'http://localhost:3000/AdminRegisterAdmin/',
      headers: {},
      data:
      {
        "FName": "Romba",
        "MName": "Ramremo",
        "LName": "Gamd",
        "email": "fady.wasfalla@gmail.com",
        "password": "cnjdqqcrjcsjn151215'",
        "gender": "Male",
        "Type":"Admin",

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
    return rev
  },
  AdminRegisterAdminSuccessfully: async () => {
    const rev = await axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/AdminRegisterAdmin/',
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
    return rev
  },
  AdminRegisterAdminType: async () => {
    const rev = await axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/AdminRegisterAdmin/',
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
    return rev
  },

  AdminDeleteInvestorNot: async () => {
    const rev = await axios({
      method: 'delete',
      url: 'http://127.0.0.1:3000/AdminDeleteInvestor/5c8623177eecbf06c03fd74e',
      headers: {},
      data:
      {
      }

    });
    return rev
  },
  AdminDeleteInvestor: async () => {
    const rev = await axios({
      method: 'delete',
      url: 'http://127.0.0.1:3000/AdminDeleteInvestor/5c77e8603fd76231ecbf04ec',
      headers: {},
      data:
      {
      }

    });
    return rev
  },
}

module.exports = adminFunctions