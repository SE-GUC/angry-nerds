const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            FirstName: Joi.string().min(3).max(100).required(),
            MiddleName: Joi.string().min(3).max(100).required(),
            LastName: Joi.string().min(3).max(100).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
            ID_type:Joi.string().required(),
            SSID: Joi.number().integer().required(),
            Nationality:Joi.string().required(),
            gender:Joi.string().min(4).max(6),
            birthdate: Joi.number().integer().min(1900).max(2013),
            Type:Joi.required(),
            gender:Joi.required().string(),
            Address:Joi.string().required(),
            fax:Joi.number(),
            telephone_number:Joi.number().required(),

        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            FirstName: Joi.string().min(3).max(100).required(),
            MiddleName: Joi.string().min(3).max(100).required(),
            LastName: Joi.string().min(3).max(100).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
            ID_type:Joi.string().required(),
            SSID: Joi.number().integer().required(),
            Nationality:Joi.string().required(),
            gender:Joi.string().min(4).max(6),
            birthdate: Joi.number().integer().min(1900).max(2013),
            Type:Joi.required(),
            gender:Joi.required().string(),
            Address:Joi.string().required(),
            fax:Joi.number(),
            telephone_number:Joi.number().required(),

        }

        return Joi.validate(request, updateSchema)
    }, 
}