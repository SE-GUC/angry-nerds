const Joi = require('joi')


module.exports = {
    createValidation: request => {
        const createSchema = {
<<<<<<< HEAD:validations/staffValidations.js
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
=======
            FName: Joi.string().min(3).max(100).required(),
            MName: Joi.string().min(3).max(100).required(),
            LName: Joi.string().min(3).max(100).required(),
            ssid: Joi.number().integer(),
            gender:Joi.string().min(4).max(6),
            birthdate: Joi.number().integer().min(1900).max(2013),
            Type:Joi.required(),
            Address:Joi.string().required(),
            fax:Joi.number(),
            telephone_number:Joi.number().required(),
            email: Joi.string().email({ minDomainAtoms: 2 }),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
            gender:Joi.required().string(),
            Nationality:Joi.string().required(),
>>>>>>> e9267579eaf076dc947d5d5ba3de973c73c50507:validations/ReviewerValidations.js

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
<<<<<<< HEAD:validations/staffValidations.js
            fax:Joi.number().positive().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            telephone_number:Joi.number().positive().required(),
            total_number_of_cases:Joi.number().positive().required(),
            number_of_cases:Joi.number().required(),
            completed_number_of_cases:Joi.number().required(),
            total_time_on_cases:Joi.number().required(),
=======
            fax:Joi.number().required(),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
            telephone_number:Joi.number().required(),
>>>>>>> e9267579eaf076dc947d5d5ba3de973c73c50507:validations/ReviewerValidations.js
            email: Joi.string().email({ minDomainAtoms: 2 })

        }

        return Joi.validate(request, updateSchema)
    }, 
}
