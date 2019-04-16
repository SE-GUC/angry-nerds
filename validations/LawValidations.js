const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            LawNumber: Joi.required().string().min(1).max(500).required,
            LawName: Joi.required().String().min(3).max(500).required,
            LawValue: Joi.number().min(0).max(1000000).required,
            LawCalc: Joi.number().required,
            min: Joi.number().required,
            max: Joi.number().required,
        }
    }
}