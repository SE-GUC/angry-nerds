const Joi = require('joi')


module.exports = {
    createValidation: request => {
        const createSchema = {
            FName: Joi.string().min(3).max(100).required(),
            MName: Joi.string().min(3).max(100).required(),
            LName: Joi.string().min(3).max(100).required(),
            ssid: Joi.number().integer(),
            gender:Joi.string().min(4).max(6),
            birthdate: Joi.number().integer().min(1900).max(2013),
            Address:Joi.string().required(),
            fax:Joi.number(),
            telephone_number:Joi.number().required(),
            email: Joi.string().email({ minDomainAtoms: 2 }),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
            gender:Joi.required().string(),
            Nationality:Joi.string().required(),

        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            FName: Joi.string().min(3).max(100).required(),
            MName: Joi.string().min(3).max(100).required(),
            LName: Joi.string().min(3).max(100).required(),
            ssid: Joi.number().min(0).max(3000).required(),
            Nationality:Joi.string().required(),
            gender:Joi.string().min(4).max(6),
            birthdate: Joi.number().integer().min(1900).max(2013),
            Address:Joi.string().required(),
            fax:Joi.number().required(),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
            telephone_number:Joi.number().required(),
            email: Joi.string().email({ minDomainAtoms: 2 })

        }

        return Joi.validate(request, updateSchema)
    }, 
}
