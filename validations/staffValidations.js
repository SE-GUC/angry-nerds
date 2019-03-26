const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
          FName: Joi.string().min(3).max(58).required(),
            MName: Joi.string().min(3).max(58).required(),
            LName: Joi.string().min(3).max(58).required(),
            ssid: Joi.number().min(14).max(14).positive().required(),
            Nationality:Joi.string().required(),
            gender:Joi.string().valid(['Male', 'Female']).required(),  
            birthdate: Joi.number().integer().positive().min(1900).max(2013),
            Type:Joi.required(),
             Address:Joi.string().required(),
            fax:Joi.number().positive().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            telephone_number:Joi.number().positive().required(),
            total_number_of_cases:Joi.number().positive().required(),
            number_of_cases:Joi.number().required(),
            completed_number_of_cases:Joi.number().required(),
            total_time_on_cases:Joi.number().required(),
            email: Joi.string().email({ minDomainAtoms: 2 })

        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            FName: Joi.string().min(3).max(58).required(),
            MName: Joi.string().min(3).max(58).required(),
            LName: Joi.string().min(3).max(58).required(),
            ssid: Joi.number().min(14).max(14).positive().required(),
            Nationality:Joi.string().required(),
            gender:Joi.string().valid(['Male', 'Female']).required(),  
            birthdate: Joi.number().integer().positive().min(1900).max(2013),
            Type:Joi.required(),
            Address:Joi.string().required(),
            fax:Joi.number().positive().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            telephone_number:Joi.number().positive().required(),
            total_number_of_cases:Joi.number().positive().required(),
            number_of_cases:Joi.number().required(),
            completed_number_of_cases:Joi.number().required(),
            total_time_on_cases:Joi.number().required(),
            email: Joi.string().email({ minDomainAtoms: 2 })

        }

        return Joi.validate(request, updateSchema)
    }, 
}
