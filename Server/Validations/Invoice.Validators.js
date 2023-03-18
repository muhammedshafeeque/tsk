import Joi from "joi";
export const generateinvoice = {
  body: Joi.object().keys({
    numberOfItems:Joi.number().required(),
    company:Joi.string().required(),
    currency:Joi.string().required(),
    date:Joi.string().required()
  }),
};