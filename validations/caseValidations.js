const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            caseStatus: Joi.required().string().min(3).max(500),
            caseOpenSince: Joi.date(),
            caseClosedDate: Joi.date(),
            lawyerStartDate: Joi.date(),
            reviewerStartDate:Joi.date(),
            reviewerTotalTime:Joi.date(),
            reviewerID: Joi.string(),
            lawyerID: Joi.string(),
            investorID: Joi.string(),
            form_type:Joi.require().string().min(3),
            regulated_law: Joi.require().string().min(3).max(500),
            legal_form: Joi.require().string().min(3).max(100),
            arabic_name: Joi.require().string().min(3).max(100),
            english_name: Joi.require().string().min(3).max(100),
            governorate: Joi.require().string().min(3).max(100),
            city: Joi.require().string().min(3).max(100),
            address: Joi.require().string().min(3).max(100),
            main_center_phone: Joi.require().number(),
            main_center_fax: Joi.number(),
            currency: Joi.string().min(3).max(100),
            equality_capital: Joi.require().number(),
            fees:Joi.number(),
            managers: Joi.array(),
            comment: Joi.array()



         }

         return Joi.validate(request, createSchema)
     },

    updateValidation: request => {
        const updateSchema = {
            caseStatus: Joi.string().min(3).max(500),
            
            caseOpenSince: Joi.date(),
            caseClosedDate: Joi.date(),

           /* reviewerID: Joi.required(),
            lawyerID: Joi.required(),
            investorID: Joi.required(),*/
            
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
            equality_capital: Joi.number(),
            managers: Joi.array()
             
        }

        return Joi.validate(request, updateSchema)
    }, 
}
