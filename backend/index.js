/* Back-end para o trabalho da cadeira de Construção de Software */

/* swagger-ui is a traditional npm module intended for use in single-page applications that are capable of resolving dependencies (via Webpack, Browserify, etc). */
const swaggerUI = require('swagger-ui')

const openApiDocumentation = require('./openApiDocumentation');
/* Hapi is a simple to use configuration-centric framework with built-in support for input validation, 
caching, authentication, and other essential facilities for building web and services applications. */
const hapi = require("hapi"); 
/* Joi lets you describe your data using a simple, intuitive, and readable language. */
const joi = require("joi");
/* Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks. */
const mongoose = require("mongoose"); 



const server = new hapi.Server({
  host: "localhost/constr-sw-2020-2-grupo8",
  port: 9876,
  routes: { cors: { origin: ["*"] } },
});

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

/* MongoDb connection */
mongoose.connect("mongodb://localhost/constr-sw-2020-2-grupo8", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/* Model */
const DisciplineModel = mongoose.model("discipline", {
  nome: String,
  codigo: Number,
  creditos: Number,
  objetivos: String, 
  ementa: String,
  bibliografia: Array,
  criado: Date.now
});

//Buscar todas as disciplinas que estão cadastradas
server.route({
    method: "GET",
    path: "/disciplines",
    handler: async (request, resp) => {
      try {
        var disciplines = await DisciplineModel.find().exec();
        var count = await DisciplineModel.countDocuments().exec();
        var data = {
          status: "Success",
          message: "Disciplines retrieved successfully",
          disciplines: disciplines,
          count: count
        };
        return resp.response(data);
      } catch (error) {
        return resp.response(error).code(500);
      }
    }
});

//Registar uma nova turma
server.route({
  method: "POST",
  path: "/registerDiscipline",
  options: {
    validate: {
      payload: {
        nome: joi.string().required(),
        codigo: joi.number().required(),
        creditos: joi.string().required(),
        objetivos: joi.string().required(), 
        ementa: joi.string().required(),
        bibliografia: joi.array().required(),
      },
      failAction: (request, resp, error) => {
        return error.isJoi
          ? resp.response(error.details[0]).takeover()
          : resp.response(error).takeover();
      },
    },
  },
  handler: async (request, resp) => {
    try {
      let discipline = new DisciplineModel(request.payload);
      await user.save();
      let data = {
        message: "Discipline created!",
      };
      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});