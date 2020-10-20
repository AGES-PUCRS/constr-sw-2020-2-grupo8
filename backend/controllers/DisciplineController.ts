import { Request, Response } from "express";

import discipline_view from "../view/discipline_view";
import mongoose from "mongoose";
import DisciplinaModel from "../models/Discipline";
import schema from "../models/DisciplinesSchema";
import schemaUpdate from "../models/DisciplineUpdateSchema";

const DisciplineRepository = mongoose.model("Disciplina", DisciplinaModel);

interface Discipline {
  nome: string;
  objetivos: string;
  ementa: string;
  bibliografia: Array<string>;
  codigo: number;
  creditos: number;
}

function printRequest(title: string, request: any) {
  console.log(`\nREQUEST ${title} 👇\n`);
  console.log(request);
}

function printResponse(response: any = {}) {
  console.log(`\nRESPONSE 👇\n`);
  console.log(response ? response : {});
}

export default {
  //GET<root>/<api>: Busca todas as disciplinas que estão cadastradas ou com os campos informados
  async getAllOrQuery(request: Request, response: Response) {
    printRequest("BODY", request.body);
    printRequest("PARAMS", request.params);

    const query = request.query;
    const disciplines = await DisciplineRepository.find(query);
    if (disciplines) {
      return response.status(200).json(discipline_view.renderMany(disciplines));
    }
    return response.status(204).json("Não há disciplinas cadastradas");
  },

  //GET<root>/<api>/<id>: Busca uma disciplina
  async get(request: Request, response: Response) {
    printRequest("PARAMS", request.params);

    const { id } = request.params;

    const findOne = await DisciplineRepository.findById(id);

    printResponse(findOne);

    if (findOne) {
      return response.status(200).json(discipline_view.render(findOne));
    } else {
      return response.status(404).send("Objeto não encontrado encontrado");
    }
  },

  //POST<root>/<api>: Registra uma nova disciplina
  async post(request: Request, response: Response) {
    printRequest("BODY", request.body);

    const {
      nome,
      objetivos,
      ementa,
      bibliografia,
      codigo,
      creditos,
    } = request.body;

    const data: Discipline = {
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

    printResponse(findOne);

    if (findOne) {
      return response.status(302).send("Objeto já existe");
    }
    const discipline = await DisciplineRepository.create(data);

    return response.status(201).json(discipline_view.render(discipline));
  },

  //PUT<root>/<api>/id>: Atualiza a disciplina com esse id
  async put(request: Request, response: Response) {
    printRequest("BODY", request.body);
    printRequest("PARAMS", request.params);

    const { id } = request.params;

    const {
      nome,
      objetivos,
      ementa,
      bibliografia,
      codigo,
      creditos,
    } = request.body;

    const data: Discipline = {
      nome,
      objetivos,
      ementa,
      bibliografia,
      codigo,
      creditos,
    };

    await schemaUpdate.validate(data, {
      abortEarly: false,
    });

    const discipline = await DisciplineRepository.findByIdAndUpdate(id, data, {
      new: true,
    });

    printResponse(discipline);

    return response.status(200).json(discipline_view.render(discipline));
  },

  //PATCH<root>/<api>/id>: Atualiza parcialmente a disciplina com aquele id
  async patch(request: Request, response: Response) {
    printRequest("BODY", request.body);
    printRequest("PARAMS", request.params);

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

    printResponse(findOne);

    return response.status(200).json(discipline_view.render(findOne));
  },

  //DELETE<root>/<api>/<id>:Deleta nova disciplina
  async delete(request: Request, response: Response) {
    printRequest("PARAMS", request.params);

    const { id } = request.params;

    const discipline = await DisciplineRepository.findByIdAndRemove(id);

    printResponse(discipline);

    if (discipline) {
      return response.status(200).send("Disciplina deletada com sucesso");
    }
    return response.status(400).send("Disciplina não encontrada");
  },
};
