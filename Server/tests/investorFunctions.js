const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http')

const investorFunctions = {

  InvestorPayFees: async (cardnumber, month1, year1, cvc1) => {
    const charge = await axios({
      method: 'post',
      url: 'http://localhost:3000/InvestorPayFees',
      headers: {},
      data: { //body
        name: cardnumber,
        month: month1,
        year: year1,
        cvc: cvc1
      }
    });
    return charge
  },

    InvViewing: async (id) => {
      const views= await axios.get('http://127.0.0.1:3000/InvViewing/'+id)
      return views
      },
  InvestorViewFees: async (id)=>{
    const Case= await axios({
      method:'get',
      url: 'http://localhost:3000/InvestorViewFees/' + id

    })
    return Case
  },

  generatePdf: async () => {

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

    

    console.log(newCase.data)
    const response = await axios.get('http://127.0.0.1:3000/generatePdf/' + newCase.data.data._id)
    //console.log(response)

    await axios.delete('http://127.0.0.1:3000/api/Cases/' + newCase.data.data._id)
    await axios.delete('http://127.0.0.1:3000/api/Investor/' + newInvestor.data.data._id)


    return response;
}


}

module.exports = investorFunctions