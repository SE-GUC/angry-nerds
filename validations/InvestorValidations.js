const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            email: Joi.required(),
            password: Joi.required(),
            SSID: Joi.required()
            
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            //email: Joi.required(),
            password: Joi.required(),
            //SSID: Joi.required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}