const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            caseStatus: Joi.string().min(3).max(500).required(),
            
            caseOpenSince: Joi.date().required(),
            caseClosedDate: Joi.date().required(),

            reviewerID: Joi.required(),
            lawyerID: Joi.required(),
            investorID: Joi.required(),
            
            //forms
            form_type:Joi.string().min(3),
            regulated_law: Joi.string().min(3).max(500),
            legal_form: Joi.string().min(3).max(100),
            arabic_name: Joi.string().min(3).max(100),
            english_name: Joi.string().min(3).max(100),
            government: Joi.string().min(3).max(100),
            city: Joi.string().min(3).max(100),
            hq_address: Joi.string().min(3).max(100),
            hq_city: Joi.string().min(3).max(100),
            main_center_phone: Joi.number(),
            main_center_fax: Joi.number(),
            currency: Joi.string().min(3).max(100),
            equality_capital: Joi.number().min(50000),
            managers: Joi.array()



        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            caseStatus: Joi.string().min(3).max(500).required(),
            
            caseOpenSince: Joi.date().required(),
            caseClosedDate: Joi.date().required(),

            reviewerID: Joi.required(),
            lawyerID: Joi.required(),
            investorID: Joi.required(),
            
            //forms
            form_type:Joi.string().min(3),
            regulated_law: Joi.string().min(3).max(500),
            legal_form: Joi.string().min(3).max(100),
            arabic_name: Joi.string().min(3).max(100),
            english_name: Joi.string().min(3).max(100),
            government: Joi.string().min(3).max(100),
            city: Joi.string().min(3).max(100),
            hq_address: Joi.string().min(3).max(100),
            hq_city: Joi.string().min(3).max(100),
            main_center_phone: Joi.number(),
            main_center_fax: Joi.number(),
            currency: Joi.string().min(3).max(100),
            equality_capital: Joi.number().min(50000),
            managers: Joi.array()
        }

        return Joi.validate(request, updateSchema)
    }, 
}s