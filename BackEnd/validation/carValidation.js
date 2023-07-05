import Joi from "joi";

export const CarValidator = (car) => {
  const carSchemaJoi = Joi.object({
    category: Joi.string().required(),
    color: Joi.string().required(),
    model: Joi.string().required(),
    make: Joi.string().required(),
    registrationNo: Joi.string().required(),
  });

  return carSchemaJoi.validate(car);
};
