/* Back-end para o trabalho da cadeira de Construção de Software */

/* swagger-ui is a traditional npm module intended for use in single-page applications that are capable of resolving dependencies (via Webpack, Browserify, etc). */
const swaggerUI = require("swagger-ui");

const openApiDocumentation = require("./openApiDocumentation");
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

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

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
  criado: Date.now,
});

//GET<root>/<api>: Busca todas as disciplinas que estão cadastradas
server.route({
  method: "GET",
  path: "/disciplinas",
  handler: async (request, resp) => {
    try {
      let disciplines = await DisciplineModel.find().exec();
      let count = await DisciplineModel.countDocuments().exec();
      let data = {
        status: "Sucesso",
        message: "Disciplinas resgatadas com sucesso!",
        disciplines: disciplines,
        count: count,
      };
      return resp.response(data).code(200);
    } catch (error) {
      let errorResponse = error;
      return resp.response(errorResponse).code(500);
    }
  },
});

//GET<root>/<api>/<id>: Busca uma nova disciplina
server.route({
  method: "GET",
  path: "/disciplinas/{id}",
  options: {
    validate: {
      failAction: (request, resp, error) => {
        return error.isJoi
          ? resp.response(error.details[0]).takeover()
          : resp.response(error).takeover();
      },
    },
  },
  handler: async (request, resp) => {
    try {
      let findOne = DisciplineModel.findById(request.params.id).exec();
      if (findOne) {
        let data = {
          status: "Sucesso",
          message: "Objeto encontrado",
          discipline: findOne,
        };
        return resp.response(data).code(302);
      } else {
        let data = {
          status: "Falha",
          message: "Objeto não encontrado encontrado",
        };
        return resp.response(data).code(404);
      }
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//GET<root>/<api>?<query>: Retorna as disciplinas que atendem à query

//DELETE<root>/<api>/<id>:Busca uma nova disciplina
server.route({
  method: "DELETE",
  path: "/disciplinas/{id}",
  options: {
    validate: {
      failAction: (request, resp, error) => {
        return error.isJoi
          ? resp.response(error.details[0]).takeover()
          : resp.response(error).takeover();
      },
    },
  },
  handler: async (request, resp) => {
    try {
      let findOne = DisciplineModel.findOne(request.params.id).exec();
      if (findOne) {
        await DisciplineModel.deleteOne(findOne);
        let data = {
          status: "Sucesso",
          message: "Objeto deletado",
        };
        return resp.response(data).code(200);
      }
      let data = {
        status: "Falha",
        message: "Objeto não encontrado",
      };
      return resp.response(data).code(404);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//POST<root>/<api>: Registra uma nova turma
server.route({
  method: "POST",
  path: "/disciplinas",
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
      let codigoRequest = request.payload.codigo;
      let findOne = DisciplineModel.findOne({ codigo: codigoRequest }).exec();
      if (findOne) {
        let data = {
          status: "Falha",
          message: "Objeto ja existente",
          discipline: findOne,
        };
        return resp.response(data).code(302);
      }
      let discipline = new DisciplineModel(request.payload);
      await discipline.save();
      let data = {
        status: "Sucesso",
        message: "Disciplina criada!",
        discipline: discipline,
      };
      return resp.response(data).code(201);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//PUT<root>/<api>/id>: Atualiza a disciplina com esse id
server.route({
  method: "PUT",
  path: "/disciplinas/{id}",
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
      let findOne = DisciplineModel.findById(request.params.id).exec();
      if (findOne) {
        await DisciplineModel.update(findOne);
        return resp.response().code(200);
      }
      let data = {
        status: "Falha",
        message: "Objeto não encontrado",
      };
      return resp.response(data).code(404);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//PATCH<root>/<api>/id>: Atualiza parcialmente a disciplina com aquele id
server.route({
  method: "PATCH",
  path: "/disciplinas/{id}",
  options: {
    validate: {
      payload: {
        nome: joi.string().optional(),
        codigo: joi.number().optional(),
        creditos: joi.string().optional(),
        objetivos: joi.string().optional(),
        ementa: joi.string().optional(),
        bibliografia: joi.array().optional(),
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
      let findOne = DisciplineModel.findOne(request.params.id).exec();
      if (findOne) {
        await DisciplineModel.update(findOne);
        return resp.response().code(200);
      }
      let data = {
        status: "Falha",
        message: "Objeto não encontrado",
      };
      return resp.response(data).code(404);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});
