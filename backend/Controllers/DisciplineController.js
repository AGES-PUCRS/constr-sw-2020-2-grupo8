const mongoose = require("mongoose");
const DisciplineModel = mongoose.model("Disciplina");
const schemas = require("../Models/joi.js");

module.exports = {
  //GET<root>/<api>: Busca todas as disciplinas que estão cadastradas
  async list(request, response) {
    console.log("\nlisting students ...");
    // const { body } = request;
    // const result = Joi.validate(body, schemas.Disciplina);
    // const { value, error } = result;
    // const valid = error == null;
    // if (!valid) {
    //   response.status(422).json({
    //     message: "Invalid request",
    //     data: body,
    //   });
    // }
    try {
      const disciplines = await DisciplineModel.find();
      response.status(200);
      return response.json(disciplines);
    } catch (error) {
      response.status(500);
      return response.json(error);
    }
  },

  //GET<root>/<api>/<id>: Busca uma nova disciplina
  async get(request, response) {
    console.log("\ngetting discipline ...");
    console.log(req.params.id);
    try {
      const findOne = DisciplineModel.findById(request.params.id);
      if (findOne) {
        response.status(200);
        return response.json(findOne);
      } else {
        response.status(404);
        response.send("Objeto não encontrado encontrado");
      }
    } catch (error) {
      response.status(500);
      return response.json(error);
    }
  },
  //POST<root>/<api>: Registra uma nova turma
  async post(request, response) {
    try {
      console.log("\ncreating discipline ...");
      console.log(req.body);
      /* console.log(request.body.codigo);
      response.status(399);
      response.json(request.body); */
      const codigoRequest = request.body.codigo;
      const findOne = DisciplineModel.findOne({ codigo: codigoRequest });
      if (findOne) {
        response.status(302);
        return response.send("Objeto já existe");
      }
      const discipline = DisciplineModel.create(request.body);
      response.status(201);
      return response.json(discipline);
    } catch (error) {
      return response.json(error).status(500);
    }
  },

  //PUT<root>/<api>/id>: Atualiza a disciplina com esse id
  async put(request, response) {
    console.log("\nupdating discipline ...");
    console.log(request.params.id);
    console.log(request.body);
    try {
      const discipline = await DisciplineModel.findAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
        }
      );
      response.status(200);
      return response.json(discipline);
    } catch {
      response.status(404);
      response.send("None shall pass");
    }
  },

  //PATCH<root>/<api>/id>: Atualiza parcialmente a disciplina com aquele id
  async patch(request, response) {
    console.log("\npartially updating discipline ...");
    console.log(req.params.id);
    console.log(req.body);
    try {
      const findOne = await DisciplineModel.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
        }
      );
      response.status(200);
      return response.json(findOne);
    } catch (error) {
      response.code(500);
      return response.json(error);
    }
  },

  //DELETE<root>/<api>/<id>:Busca uma nova disciplina
  async delete(request, response) {
    console.log("\ndeleting discipline ...");
    console.log(request.params.id);
    try {
      await DisciplineModel.findByIdAndRemove(request.params.id);
      response.status(200);
      return response.send();
    } catch {
      response.status(500);
      response.send("None shall pass");
    }
  },
};
