import Joi from "joi";
export const generateinvoice = {
  body: Joi.object().keys({
    numberOfItems: Joi.number().required(),
    company: Joi.string().required(),
    currency: Joi.string().required(),
    date: Joi.string().required(),
  }),
};
export const createteInvoice = {
  body: Joi.object().keys({
    company: Joi.string().required(),
    currency: Joi.string(),
    date: Joi.string().required(),
    items: Joi.array()
      .required()
      .ordered(
        Joi.object().required().keys({
          item: Joi.string().required(),
          quantity: Joi.number().required(),
          unit: Joi.string().required(),
          price: Joi.number().required(),
        })
      ),
  }),
};
