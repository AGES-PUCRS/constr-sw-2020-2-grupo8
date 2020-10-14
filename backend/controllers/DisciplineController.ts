import { Request, Response } from "express";

import schema from "../models/DisciplinesSchema";
import discipline_view from "../view/discipline_view";
import mongoose from "mongoose";

const DisciplinaModel = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  objetivos: {
    type: String,
    required: true,
  },
  ementa: {
    type: String,
    required: true,
  },
  bibliografia: {
    type: [String],
    required: true,
  },
  codigo: {
    type: Number,
    requires: true,
  },
  creditos: {
    type: Number,
    requires: true,
  },
  criado: {
    type: Date,
    default: Date.now,
  },
});

const DisciplineRepository = mongoose.model("Disciplina", DisciplinaModel);

export default {
  //GET<root>/<api>: Busca todas as disciplinas que estão cadastradas
  async getAll(request: Request, response: Response) {
    const disciplines = await DisciplineRepository.find();

    return response.status(200).json(discipline_view.renderMany(disciplines));
  },

  //GET<root>/<api>/<id>: Busca uma disciplina
  async get(request: Request, response: Response) {
    const { id } = request.params;

    const findOne = await DisciplineRepository.findById(id);

    if (findOne) {
      return response.status(200).json(discipline_view.render(findOne));
    } else {
      return response.status(404).send("Objeto não encontrado encontrado");
    }
  },
  //POST<root>/<api>: Registra uma nova disciplina
  async post(request: Request, response: Response) {
    const {
      nome,
      objetivos,
      ementa,
      bibliografia,
      codigo,
      creditos,
    } = request.body;

    const data = {
      nome,
      objetivos,
      ementa,
      bibliografia,
      codigo,
      creditos,
    };

    await schema.validate(data, {
      abortEarly: false,
    });

    const findOne = await DisciplineRepository.findOne({ codigo: codigo });

    if (findOne) {
      return response.status(302).send("Objeto já existe");
    }
    const discipline = await DisciplineRepository.create(data);

    return response.status(201).json(discipline_view.render(discipline));
  },

  //PUT<root>/<api>/id>: Atualiza a disciplina com esse id
  async put(request: Request, response: Response) {
    const { id } = request.params;

    const {
      nome,
      objetivos,
      ementa,
      bibliografia,
      codigo,
      creditos,
    } = request.body;

    const data = {
      nome,
      objetivos,
      ementa,
      bibliografia,
      codigo,
      creditos,
    };

    await schema.validate(data, {
      abortEarly: false,
    });

    const discipline = await DisciplineRepository.findByIdAndUpdate(id, data, {
      new: true,
    });

    return response.status(200).json(discipline_view.render(discipline));
  },

  //PATCH<root>/<api>/id>: Atualiza parcialmente a disciplina com aquele id
  async patch(request: Request, response: Response) {
    const { id } = request.params;

    const {
      nome,
      objetivos,
      ementa,
      bibliografia,
      codigo,
      creditos,
    } = request.body;

    const data = {
      nome,
      objetivos,
      ementa,
      bibliografia,
      codigo,
      creditos,
    };

    const findOne = await DisciplineRepository.findByIdAndUpdate(id, data, {
      new: true,
    });

    return response.status(200).json(discipline_view.render(findOne));
  },

  //DELETE<root>/<api>/<id>:Deleta nova disciplina
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const discipline = await DisciplineRepository.findByIdAndRemove(id);
    if (discipline) {
      return response.status(200).send("Disciplina deletada com sucesso");
    }
    return response.status(400).send("Disciplina não encontrada");
  },
};
