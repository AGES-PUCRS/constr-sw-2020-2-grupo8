const Joi = require("joi");
const schemas = {
  Disciplina: Joi.object().keys({
    nome: Joi.string().required(),
    objetivos: Joi.string().required(),
    ementa: Joi.string().required(),
    bibliografia: Joi.array().required(),
    codigo: Joi.number().required(),
    creditos: Joi.number().required(),
  }),
};
module.exports = schemas;
