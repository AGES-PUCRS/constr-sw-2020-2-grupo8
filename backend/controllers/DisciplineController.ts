import { Request, Response } from "express";

import discipline_view from "../view/discipline_view";
import disciplineRepository from "../models/Discipline";
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { InterfaceDiscipline } from "../interfaces/discipline";
import { InterfaceTurma } from "../interfaces/turma";
import { QueryFindOptions } from "mongoose";
import disciplineYup from "../models/DisciplineYup";
import disciplineYupUpdate from "../models/DisciplineYupUpdate";

const serviceUrl = "http://ec2-34-238-114-89.compute-1.amazonaws.com:3000/";
const axiosConfig: AxiosRequestConfig = { baseURL: serviceUrl };
const axiosInstance: AxiosInstance = Axios.create(axiosConfig);

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
    try {
      printRequest("BODY", request.body);
      printRequest("PARAMS", request.params);

      const query: QueryFindOptions = request.query;
      const disciplines = await disciplineRepository.find(query);

      printResponse(disciplines);

      if (disciplines) {
        return response
          .status(200)
          .json(discipline_view.renderMany(disciplines));
      }
      return response.status(204).json("Não há disciplinas cadastradas");
    } catch (error) {
      return response.status(500).send("Falha no servidor");
    }
  },

  //GET<root>/<api>/<id>: Busca uma disciplina
  async get(request: Request, response: Response) {
    try {
      printRequest("PARAMS", request.params);

      const { id } = request.params;

      const findOne = await disciplineRepository.findById(id);

      printResponse(findOne);

      if (findOne) {
        if (request.query.expand === "turmas") {
          const { data }: any = await axiosInstance
            .get(`turma/${findOne?.turma}`)
            .catch(function (error) {
              console.error(error);
            });

          return response
            .status(200)
            .json(discipline_view.renderWithExpandsTurma(findOne, data));
        }

        return response.status(200).json(discipline_view.render(findOne));
      } else {
        return response.status(404).send("Objeto não encontrado encontrado");
      }
    } catch (error) {
      return response.status(500).send("Falha no servidor");
    }
  },

  //POST<root>/<api>: Registra uma nova disciplina
  async post(request: Request, response: Response) {
    try {
      printRequest("BODY", request.body);

      const {
        nome,
        objetivos,
        ementa,
        bibliografia,
        codigo,
        creditos,
        turma,
      } = request.body;

      const data: any = {
        nome,
        objetivos,
        ementa,
        bibliografia,
        codigo,
        creditos,
        turma,
      };

      try {
        await disciplineYup
          .validate(data, { abortEarly: false })
          .catch((errors) => {
            const schemaErrors = errors.inner.map((err: any) => {
              return { campo: err.path, mensagem: err.message };
            });
            return response.status(400).json({
              success: false,
              mensagem: "Campos informados inválidos",
              erros: schemaErrors,
            });
          });
      } catch (error) {
        return response.status(500).json({ "Fail to validate data: ": error });
      }

      const findOne = await disciplineRepository.findOne({ codigo: codigo });

      printResponse(findOne);

      if (findOne) {
        return response.status(302).send("Objeto já existe");
      }
      const discipline: InterfaceDiscipline = await disciplineRepository.create(
        data
      );

      return response.status(201).json(discipline_view.render(discipline));
    } catch (error) {
      return response.status(500).send("Falha no servidor");
    }
  },

  //PUT<root>/<api>/id>: Atualiza a disciplina com esse id
  async put(request: Request, response: Response) {
    try {
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
        turma,
      } = request.body;

      const data: InterfaceDiscipline = {
        nome,
        objetivos,
        ementa,
        bibliografia,
        codigo,
        creditos,
        turma,
      };

      try {
        await disciplineYup
          .validate(data, { abortEarly: false })
          .catch((errors) => {
            const schemaErrors = errors.inner.map((err: any) => {
              return { campo: err.path, mensagem: err.message };
            });
            return response.status(400).json({
              success: false,
              mensagem: "Campos informados inválidos",
              erros: schemaErrors,
            });
          });
      } catch (error) {
        return response.status(500).json({ "Fail to validate data: ": error });
      }

      const discipline: any = await disciplineRepository.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
        }
      );

      printResponse(discipline);

      return response.status(200).json(discipline_view.render(discipline));
    } catch (error) {
      return response.status(500).send("Falha no servidor");
    }
  },

  //PATCH<root>/<api>/id>: Atualiza parcialmente a disciplina com aquele id
  async patch(request: Request, response: Response) {
    try {
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
        turma,
      } = request.body;

      const data = {
        nome,
        objetivos,
        ementa,
        bibliografia,
        codigo,
        creditos,
        turma,
      };

      try {
        await disciplineYupUpdate
          .validate(data, { abortEarly: false })
          .catch((errors) => {
            const schemaErrors = errors.inner.map((err: any) => {
              return { campo: err.path, mensagem: err.message };
            });
            return response.status(400).json({
              success: false,
              mensagem: "Campos informados inválidos",
              erros: schemaErrors,
            });
          });
      } catch (error) {
        return response.status(500).json({ "Fail to validate data: ": error });
      }

      const findOne: any = await disciplineRepository.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
        }
      );

      printResponse(findOne);

      return response.status(200).json(discipline_view.render(findOne));
    } catch (error) {
      return response.status(500).send("Falha no servidor");
    }
  },

  //DELETE<root>/<api>/<id>:Deleta nova disciplina
  async delete(request: Request, response: Response) {
    try {
      printRequest("PARAMS", request.params);

      const { id } = request.params;

      const discipline = await disciplineRepository.findByIdAndRemove(id);

      printResponse(discipline);

      if (discipline) {
        return response.status(200).send("Disciplina deletada com sucesso");
      }
      return response.status(404).send("Disciplina não encontrada");
    } catch (error) {
      return response.status(500).send("Falha no servidor");
    }
  },
};
