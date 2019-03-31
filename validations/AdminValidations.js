const Joi = require('joi')



module.exports = {
    createValidation: request => {
        const createSchema = {
            FName: Joi.String().min(3).max(100).required(),
            MName: Joi.String().min(3).max(100).required(),
            LName: Joi.String().min(3).max(100).required(),
            ssid: Joi.number().integer(),
            Nationality:Joi.String().required(),
            gender:Joi.String().min(4).max(6),
            birthdate: Joi.number().integer().min(1900).max(2013),
            Type:Joi.required(),
            gender:Joi.required().string(),
            Address:Joi.string().required(),
            fax:Joi.number(),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
            telephone_number:Joi.number().required(),
            email: Joi.String().email({ minDomainAtoms: 2 })

        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            FName: Joi.String().min(3).max(100).required(),
            MName: Joi.String().min(3).max(100).required(),
            LName: Joi.String().min(3).max(100).required(),
            ssid: Joi.number().min(0).max(3000).required(),
            Nationality:Joi.String().required(),
            gender:Joi.String().min(4).max(6),
            birthdate: Joi.number().integer().min(1900).max(2013),
            Type:Joi.required(),
            Address:Joi.String().required(),
            fax:Joi.number().required(),
            password: Joi.String().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
            telephone_number:Joi.number().required(),
            email: Joi.String().email({ minDomainAtoms: 2 })

        }

        return Joi.validate(request, updateSchema)
    }, 
}
