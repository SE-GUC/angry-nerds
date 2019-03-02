const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            arabic_name: Joi.required(),
            hq_address: Joi.required(),
            hq_city: Joi.required(),
            hq_state: Joi.required(),
            capital: Joi.required(),
            currency: Joi.required(),
            type: Joi.required(),
            investor_id: Joi.required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            arabic_name: Joi.required(),
            hq_address: Joi.required(),
            hq_city: Joi.required(),
            hq_state: Joi.required(),
            capital: Joi.required(),
            currency: Joi.required(),
            type: Joi.required(),
            investor_id: Joi.required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}