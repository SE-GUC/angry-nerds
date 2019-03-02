const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            //SSC
            form_type:Joi.string().min(3),
            regulated_law: Joi.string().min(3).max(500),
            legal_form: Joi.string().min(3).max(100),
            arabic_name: Joi.string().min(3).max(100),
            english_name: Joi.string().min(3).max(100),
            government: Joi.string().min(3).max(100),
            city: Joi.string().min(3).max(100),
            address: Joi.string().min(3).max(100),
            main_center_phone: Joi.number(),
            main_center_fax: Joi.string(),
            currency: Joi.string().min(3).max(100),
            equality_capital: Joi.number().min(50000),
            inv_name: Joi.string().min(3).max(100),
            inv_type: Joi.string().min(3).max(100),
            inv_gender: Joi.string().min(3).max(100),
            inv_nationallity: Joi.string().min(3).max(100),
            inv_person_id_type: Joi.string().min(3).max(100),
            inv_person_id_number: Joi.number(),
            inv_birth_date: Joi.date(),
            inv_adrdess: Joi.string().min(3).max(100),
            inv_phone: Joi.number(),
            inv_fax: Joi.number(),
            inv_mail: Joi.string(),
            managers: Joi.array(),


            //SPC
            form_type:Joi.string().min(3),
            regulated_law: Joi.string().min(3).max(500),
            legal_form: Joi.string().min(3).max(100),
            ar_organization_name: Joi.string().min(3).max(100),
            en_organization_name: Joi.string().min(3).max(100),
            arabic_name: Joi.string().min(3).max(100),
            english_name: Joi.string().min(3).max(100),
            government: Joi.string().min(3).max(100),
            city: Joi.string().min(3).max(100),
            address: Joi.string().min(3).max(100),
            main_center_phone: Joi.number(),
            main_center_fax: Joi.string(),
            currency: Joi.string().min(3).max(100),
            equality_capital: Joi.number().min(50000),
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            //SSC
            form_type:Joi.string().min(3),
            regulated_law: Joi.string().min(3).max(500),
            legal_form: Joi.string().min(3).max(100),
            arabic_name: Joi.string().min(3).max(100),
            english_name: Joi.string().min(3).max(100),
            government: Joi.string().min(3).max(100),
            city: Joi.string().min(3).max(100),
            address: Joi.string().min(3).max(100),
            main_center_phone: Joi.number(),
            main_center_fax: Joi.number(),
            currency: Joi.string().min(3).max(100),
            equality_capital: Joi.number().min(50000),
            inv_name: Joi.string().min(3).max(100),
            inv_type: Joi.string().min(3).max(100),
            inv_gender: Joi.string().min(3).max(100),
            inv_nationallity: Joi.string().min(3).max(100),
            inv_person_id_type: Joi.string().min(3).max(100),
            inv_person_id_number: Joi.number(),
            inv_birth_date: Joi.date(),
            inv_adrdess: Joi.string().min(3).max(100),
            inv_phone: Joi.number(),
            inv_fax: Joi.number(),
            inv_mail: Joi.string(),
            managers: Joi.array(),


            //SPC
            form_type:Joi.string().min(3),
            regulated_law: Joi.string().min(3).max(500),
            legal_form: Joi.string().min(3).max(100),
            ar_organization_name: Joi.string().min(3).max(100),
            en_organization_name: Joi.string().min(3).max(100),
            arabic_name: Joi.string().min(3).max(100),
            english_name: Joi.string().min(3).max(100),
            government: Joi.string().min(3).max(100),
            city: Joi.string().min(3).max(100),
            address: Joi.string().min(3).max(100),
            main_center_phone: Joi.number(),
            main_center_fax: Joi.number(),
            currency: Joi.string().min(3).max(100),
            equality_capital: Joi.number().min(50000),
        }

        return Joi.validate(request, updateSchema)
    }, 
}
