const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            senderID: Joi.required(),
            responderID: Joi.required(),
            question: Joi.required(),
            answer: Joi.required(),
            time: Joi.required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            senderID: Joi.required(),
            responderID: Joi.required(),
            question: Joi.required(),
            answer: Joi.required(),
            time: Joi.required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}