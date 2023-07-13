import { Joi } from 'express-validation';

const validSchema = {
    config: {
        context: true,
        statusCode: 422,
        keyByField: true,
    },
    addOrderSchema: {
        body: Joi.object({
            companyName: Joi.string()
                .required(),
            customerAddress: Joi.string()
                .required(),
            orderedItem: Joi.string()
                .required()
        })
    },
    getCompanyOrdersSchema: {
        body: Joi.object({
            companyName: Joi.string()
                .required(),
        })
    },
    getAddressOrdersSchema:{
        body: Joi.object({
            customerAddress: Joi.string()
                .required(),
        })
    },
    updateOrderSchema: {
        params: Joi.object({
            id: Joi.number()
            .required()
        }),
        body: Joi.object({
            customerAddress: Joi.string()
                .required(),
        })
    },
    deleteOrderSchema: {
        params:Joi.object({
            id: Joi.number()
            .required()
        })
    },
}
export default validSchema
