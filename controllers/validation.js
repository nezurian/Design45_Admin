const Joi = require("@hapi/joi");
//INPUT VALIDATION FOR REGISTERATION
const registerValidation = Joi.object({
  username: Joi.string()
    .min(3)
    .max(20)
    .required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(6)
    .max(2048)
});
// INPUT VALIDATION FOR LOGIN
const loginValidation = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(6)
    .max(2048)
});


const documentValidation = Joi.object({
  title: Joi.string().min(5).max(2048).required(),
  text: Joi.string().min(5).required(),
  type: Joi.string().min(4).required(),
  images: Joi.optional()
})

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.documentValidation = documentValidation
