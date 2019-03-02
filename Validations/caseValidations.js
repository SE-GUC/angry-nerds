const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            caseStatus: Joi.string().min(3).max(500).required(),
            companyName: Joi.string().min(3).max(500).required(),
            companyType: Joi.string().min(3).max(500).required(),
            caseOpenSince: Joi.date().required(),
            reviewerID: Joi.required(),
            lawyerID: Joi.required(),
            investorID: Joi.required(),
            formID: Joi.required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            caseStatus: Joi.string().min(3).max(500).required(),
            companyName: Joi.string().min(3).max(500).required(),
            companyType: Joi.string().min(3).max(500).required(),
            caseOpenSince: Joi.date().required(), 
            reviewerID: Joi.required(),
            lawyerID: Joi.required(),
            investorID: Joi.required(),
            formID: Joi.required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}