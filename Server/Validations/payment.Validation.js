import Joi from "joi";
export const paymentValidation = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
