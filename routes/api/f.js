console.log("f is starting !");
const Case = require('../../models/Cases');
const cases = require('../../routes/api/Cases'); 




module.exports.calc_fees = async function(id) {
    const Cases = await Case.findById(id)
    console.log(Cases.companyName);
};