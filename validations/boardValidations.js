const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            companyID: Joi.string().min(3).max(500).required(),
            firstName: Joi.string().min(3).max(100).required(),
            middleName: Joi.string().min(3).max(100).required(),
            lastName: Joi.string().min(3).max(500).required(),
            nationality: Joi.string().required(),
            gender: Joi.string().min(4).max(6).required(),
            birthdate: Joi.number().min(3).max(500).required(),
            ssid: Joi.number().max(14).required(),
            idType: Joi.string().min(3).max(500).required(),
            investorType: Joi.string(),
            address: Joi.string().required(),
            position:Joi.string().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
           companyID: Joi.string().min(3).max(500).required(),
           firstName: Joi.string().min(3).max(100).required(),
           middleName: Joi.string().min(3).max(100).required(),
           lastName: Joi.string().min(3).max(500).required(),
           nationality: Joi.string().required(),
           gender: Joi.string().min(4).max(6).required(),
           birthdate: Joi.number().min(3).max(500).required(),
           ssid: Joi.number().max(14).required(),
           idType: Joi.string().min(3).max(500).required(),
           investorType: Joi.string(),
           address:Joi.string().required(),
           position:Joi.string().required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}








