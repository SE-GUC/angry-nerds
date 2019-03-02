const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            //firstName: Joi.required(),
            //MiddleName: Joi.required(),
            //LastName: Joi.required(),
            email: Joi.required(),
            password: Joi.required(),
            //ID_type: Joi.required(),
            SSID: Joi.required(),
            //Nationality: Joi.required(),
            //Type: Joi.required(),
            //Address: Joi.required(),
            //birthdate: Joi.required(),
            //telephone_number: Joi.required(),
            //gender: Joi.required()

        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            //firstName: Joi.required(),
            //MiddleName: Joi.required(),
            //LastName: Joi.required(),
            email: Joi.required(),
            password: Joi.required(),
            //ID_type: Joi.required(),
            SSID: Joi.required(),
            //Nationality: Joi.required(),
            //Type: Joi.required(),
            //Address: Joi.required(),
            //birthdate: Joi.required(),
            //telephone_number: Joi.required(),
            //gender: Joi.required()
        }

        return Joi.validate(request, updateSchema)
    }
}