const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http')

const investorFunctions = {

  InvestorPayFees: async (cardnumber, month1, year1, cvc1, caseID1) => {
    const charge = await axios({
      method: 'post',
      url: 'http://localhost:3000/InvestorPayFees',
      headers: {},
      data: { //body
        creditNumber: cardnumber,
        month: month1,
        year: year1,
        cvc: cvc1,
        caseID: caseID1
      }
    });
    return charge
  },

    InvestorViewing: async (id) => {
      const views= await axios.get('http://127.0.0.1:3000/InvestorViewing/'+id)
      return views
      },
  InvestorViewFees: async (id)=>{
    const Case= await axios({
      method:'get',
      url: 'http://localhost:3000/InvestorViewFees/' + id

    })
    return Case
  },

  InvestorViewingPublishedCompanies: async () => {
    const viewPC= await axios.get('http://localhost:3000/InvestorViewingPublishedCompanies/')
    return viewPC
    },

    InvestorViewingCompany: async (id) => {
      const viewC= await axios.get('http://localhost:3000/InvestorViewingCompany/'+id)
      return viewC
      },
  generatePdf: async (caseID) => {

    const newInvestor = await axios.post('http://127.0.0.1:3000/api/Investor',
    {
        "FirstName":"PAUL",
        "MiddleName": "achraf",
        "LastName": "fayez",
        "email": "newEmail.newEmail@gmail.com",
        "ID_type": "regular",
        "SSID": 930240219012394,
        "Nationality": "egy",
        "gender": "female",
        "Type": "pass",
        "Address": "3489hwihkbnknwe",
        "telephone_number": 894094820,
        "notifications": []
    })

    const newCase  = await axios.post('http://127.0.0.1:3000/api/Cases',
            {
          "form_type": "SSC",
            "regulated_law": "masr",
            "arabic_name": "تتتت",
            "investorID":newInvestor.data.data._id,
            "english_name": "FORTESTS",
            "government": "ENG",
            "Nationality":"Egyptian",
            "city": "Cairo",
            "hq_address": "gftfy",
            "hq_city": "yes",
            "main_center_phone": 123515,
            "main_center_fax": 518563,
            "currency": "541",
            "equality_capital": 1000000000,
            "managers": [{"name":"Paul",
                          "Nationality":"Egyptian"}]
                   
        }
    )


    var updatedCase = {}
    if(caseID.length === 0){
      var response = await axios.get('http://127.0.0.1:3000/generatePdf/' + newCase.data.data._id)
      updatedCase = await axios.get('http://127.0.0.1:3000/api/Cases/' + newCase.data.data._id)
    }
    else
      var response = await axios.get('http://127.0.0.1:3000/generatePdf/' + caseID)


    await axios.delete('http://127.0.0.1:3000/api/Cases/' + newCase.data.data._id)
    await axios.delete('http://127.0.0.1:3000/api/Investor/' + newInvestor.data.data._id)


    return {res: response, newCase: updatedCase.data.data};
},

investorChangePassword: async (old1,old2,newPass) =>{
  
  const newInvestor = await axios.post('http://127.0.0.1:3000/api/Investor',
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
  
  

  const response = await axios.put('http://127.0.0.1:3000/InvestorChangePassword/' +  newInvestor.data.data._id, {
    oldPassword: old2,
    newPassword: newPass
  })
  const updatedInvestor = await axios.get('http://127.0.0.1:3000/api/Investor/' + newInvestor.data.data._id)
  await axios.delete('http://127.0.0.1:3000/api/Investor/' + newInvestor.data.data._id)



  return {res: response, updatedInvestor: updatedInvestor.data.data};
},

investorMyNotifications: async (len) => {


var arr = []
for(let i = 0;i < len;i++){
  arr.push({"text":"example"})
}

  const newInvestor = await axios.post('http://127.0.0.1:3000/api/Investor',
  {
      "FirstName":"PAUL",
      "MiddleName": "achraf",
      "LastName": "fayez",
      "email": "ccccc.ccccc@gmail.com",
      "ID_type": "regular",
      "SSID": 930240219012394,
      "Nationality": "egy",
      "gender": "female",
      "Type": "pass",
      "Address": "3489hwihkbnknwe",
      "telephone_number": 894094820,
      "notifications": arr
  })


const response = await axios.get('http://127.0.0.1:3000/investorMyNotifications/' +  newInvestor.data.data._id)

await axios.delete('http://127.0.0.1:3000/api/Investor/' + newInvestor.data.data._id)

return response;
},


viewMyPublishedCompanies: async () => {

  const newInvestor = await axios.post('http://127.0.0.1:3000/api/Investor',
  {
      "FirstName":"PAUL",
      "MiddleName": "achraf",
      "LastName": "fayez",
      "email": "newEmail.newEmail@gmail.com",
      "ID_type": "regular",
      "SSID": 930240219012394,
      "Nationality": "egy",
      "gender": "female",
      "Type": "pass",
      "Address": "3489hwihkbnknwe",
      "telephone_number": 894094820,
      "notifications": []
  })

  const newCase  = await axios.post('http://127.0.0.1:3000/api/Cases',
          {
          "caseStatus":"published",
          "form_type": "SSC",
          "regulated_law": "masr",
          "arabic_name": "تتتت",
          "investorID":newInvestor.data.data._id,
          "english_name": "FORTESTS",
          "government": "ENG",
          "Nationality":"Egyptian",
          "city": "Cairo",
          "hq_address": "gftfy",
          "hq_city": "yes",
          "main_center_phone": 123515,
          "main_center_fax": 518563,
          "currency": "541",
          "equality_capital": 1000000000,
          "managers": [{"name":"Paul",
                        "Nationality":"Egyptian"}]
                 
      }
  )

  const response = await axios.get('http://127.0.0.1:3000/ViewPublishedCompanies/' + newInvestor.data.data._id)
  
  await axios.delete('http://127.0.0.1:3000/api/Cases/' + newCase.data.data._id)
  await axios.delete('http://127.0.0.1:3000/api/Investor/' + newInvestor.data.data._id)

  return response;
},

viewMyPendingCompanies: async () => {

  const newInvestor = await axios.post('http://127.0.0.1:3000/api/Investor',
  {
      "FirstName":"PAUL",
      "MiddleName": "achraf",
      "LastName": "fayez",
      "email": "newEmail.newEmail@gmail.com",
      "ID_type": "regular",
      "SSID": 930240219012394,
      "Nationality": "egy",
      "gender": "female",
      "Type": "pass",
      "Address": "3489hwihkbnknwe",
      "telephone_number": 894094820,
      "notifications": []
  })

  const newCase  = await axios.post('http://127.0.0.1:3000/api/Cases',
          {
          "caseStatus":"pending",
          "form_type": "SSC",
          "regulated_law": "masr",
          "arabic_name": "تتتت",
          "investorID":newInvestor.data.data._id,
          "english_name": "FORTESTS",
          "government": "ENG",
          "Nationality":"Egyptian",
          "city": "Cairo",
          "hq_address": "gftfy",
          "hq_city": "yes",
          "main_center_phone": 123515,
          "main_center_fax": 518563,
          "currency": "541",
          "equality_capital": 1000000000,
          "managers": [{"name":"Paul",
                        "Nationality":"Egyptian"}]
                 
      }
  )

  const response = await axios.get('http://127.0.0.1:3000/ViewPendingCompanies/' + newInvestor.data.data._id)
  
  await axios.delete('http://127.0.0.1:3000/api/Cases/' + newCase.data.data._id)
  await axios.delete('http://127.0.0.1:3000/api/Investor/' + newInvestor.data.data._id)

  return response;
}



}

module.exports = investorFunctions