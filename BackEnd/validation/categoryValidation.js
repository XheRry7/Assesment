import Joi from "joi";

export const CategoryValidator = (car) => {
  const categorySchemaJoi = Joi.object({
    name: Joi.string().required(),
  });
  return categorySchemaJoi.validate(car);
};
