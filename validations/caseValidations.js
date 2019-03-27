const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            caseStatus: Joi.string().min(3).max(500),
            
            caseOpenSince: Joi.date(),
            caseClosedDate: Joi.date(),
            lawyerFinishDate: joi.date(),
            reviewerFinishDate: joi.date(),

          /*  reviewerID: Joi.required(),
            lawyerID: Joi.required(),
            investorID: Joi.required(),*/
            
            //forms          /// dont forget to add the comments arrey ex joi.aray().text we date beta3et paul
            form_type:Joi.string().min(3),                                       //for dates .min('1-1-1990').iso().required();
            regulated_law: Joi.string().min(3).max(500),
            legal_form: Joi.string().min(3).max(100),
            arabic_name: Joi.string().min(3).max(100),
            english_name: Joi.string().min(3).max(100),
            government: Joi.string().min(3).max(100),
            city: Joi.string().min(3).max(24),
            hq_address: Joi.string().min(3).max(100),
            hq_city: Joi.string().min(3).max(100),
            main_center_phone: Joi.number(),
            main_center_fax: Joi.number(),
            currency: Joi.string().min(3).max(24),
            equality_capital: Joi.number().maxlength(12),
            managers: Joi.array().name.string().min(3).max(58),
            managers: Joi.array().inv_type.name.string().min(3).max(58),
            managers: Joi.array().gender.string().valid(['Male', 'Female']).required(), 
            managers: Joi.array().nationallity.string().required(),
            managers: Joi.array().person_id_type.number(),
            managers: Joi.array().person_id_number.number(),
            managers: Joi.array().birth_date.Joi.date().min('1-1-1990').iso().required(),
            managers: Joi.array().address.string(),
            managers: Joi.array().position.string(),

            comment:  joi.aray().date.date().iso(),
            comment:  joi.aray().Case.number(),
            comment:  joi.aray().Reviewer.number(),
            comment:  joi.aray().Lawyer.number(),
            comment:  joi.aray().Investor.number(),


         }

         return Joi.validate(request, createSchema)
     },

    updateValidation: request => {
        const updateSchema = {
            caseStatus: Joi.string().min(3).max(500),
            
            caseOpenSince: Joi.date(),
            caseClosedDate: Joi.date(),
            lawyerFinishDate: joi.date(),
            reviewerFinishDate: joi.date(),

          /*  reviewerID: Joi.required(),
            lawyerID: Joi.required(),
            investorID: Joi.required(),*/
            
            //forms          /// dont forget to add the comments arrey ex joi.aray().text we date beta3et paul
            form_type:Joi.string().min(3),                                       //for dates .min('1-1-1990').iso().required();
            regulated_law: Joi.string().min(3).max(500),
            legal_form: Joi.string().min(3).max(100),
            arabic_name: Joi.string().min(3).max(100),
            english_name: Joi.string().min(3).max(100),
            government: Joi.string().min(3).max(100),
            city: Joi.string().min(3).max(24),
            hq_address: Joi.string().min(3).max(100),
            hq_city: Joi.string().min(3).max(100),
            main_center_phone: Joi.number(),
            main_center_fax: Joi.number(),
            currency: Joi.string().min(3).max(24),
            equality_capital: Joi.number().maxlength(12),
            managers: Joi.array().name.string().min(3).max(58),
            managers: Joi.array().inv_type.name.string().min(3).max(58),
            managers: Joi.array().gender.string().valid(['Male', 'Female']).required(), 
            managers: Joi.array().nationallity.string().required(),
            managers: Joi.array().person_id_type.number(),
            managers: Joi.array().person_id_number.number(),
            managers: Joi.array().birth_date.Joi.date().min('1-1-1990').iso().required(),
            managers: Joi.array().address.string(),
            managers: Joi.array().position.string(),

            comment:  joi.aray().date.date().iso(),
            comment:  joi.aray().Case.number(),
            comment:  joi.aray().Reviewer.number(),
            comment:  joi.aray().Lawyer.number(),
            comment:  joi.aray().Investor.number(),



            
        }

        return Joi.validate(request, updateSchema)
    }, 
}
