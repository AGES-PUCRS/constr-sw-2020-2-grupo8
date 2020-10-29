import { Request, Response } from "express";

import discipline_view from "../view/discipline_view";
import disciplineRepository from "../models/Discipline";
import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { InterfaceDiscipline } from "../interfaces/discipline";
import { QueryFindOptions } from "mongoose";
import disciplineYup from "../models/DisciplineYup";
import disciplineYupUpdate from "../models/DisciplineYupUpdate";
import {
  loggerRequest,
  loggerResponse,
  loggerBeforeReturn,
} from "../logger/loggerFunction";

const serviceUrl = "http://ec2-34-238-114-89.compute-1.amazonaws.com:3000/";
const axiosConfig: AxiosRequestConfig = { baseURL: serviceUrl };
const axiosInstance: AxiosInstance = Axios.create(axiosConfig);

export default {
  //GET<root>/<api>: Busca todas as disciplinas que estão cadastradas ou com os campos informados
  async getAllOrQuery(request: Request, response: Response) {
    try {
      loggerRequest({
        method: "GetAllOrQuery",
        action: "Buscar disciplinas com query ou não",
        url: request.url,
        body: request.body,
        params: request.params,
      });

      const query: QueryFindOptions = request.query;
      const disciplines = await disciplineRepository.find(query);

      if (disciplines) {
        loggerResponse({
          method: "GetAllOrQuery",
          action: "Buscar disciplinas com query ou não",
          url: request.url,
          response: discipline_view.renderMany(disciplines),
        });

        return response
          .status(200)
          .json(discipline_view.renderMany(disciplines));
      }

      loggerBeforeReturn({ message: "Não há disciplinas cadastradas" });

      return response.status(204).json("Não há disciplinas cadastradas");
    } catch (error) {
      loggerBeforeReturn({ message: "Falha no servidor:" });
      return response.status(500).send("Falha no servidor:" + error);
    }
  },

  //GET<root>/<api>/<id>: Busca uma disciplina
  async get(request: Request, response: Response) {
    try {
      loggerRequest({
        method: "GET",
        action: "Buscar disciplinas por id",
        url: request.url,
        body: request.body,
        params: request.params,
      });

      const { id } = request.params;

      const findOne = await disciplineRepository.findById(id);

      if (findOne) {
        if (request.query.expand === "turmas") {
          const { data }: any = await axiosInstance
            .get(`turma/${findOne?.turma}`)
            .catch(function (error) {
              loggerBeforeReturn({ message: "Erro na busca da API Turmas" });
              return response
                .status(500)
                .send("Erro na busca da API Turmas" + error);
            });

          loggerResponse({
            method: "GET",
            action: "Buscar disciplinas por id",
            url: request.url,
            response: discipline_view.renderWithExpandsTurma(findOne, data),
          });

          return response
            .status(200)
            .json(discipline_view.renderWithExpandsTurma(findOne, data));
        }

        loggerResponse({
          method: "GET",
          action: "Buscar disciplinas por id",
          url: request.url,
          response: discipline_view.render(findOne),
        });

        return response.status(200).json(discipline_view.render(findOne));
      } else {
        loggerBeforeReturn({ message: "Objeto não encontrado encontrado" });
        return response.status(404).send("Objeto não encontrado encontrado");
      }
    } catch (error) {
      loggerBeforeReturn({ message: "Falha no servidor:" });
      return response.status(500).send("Falha no servidor:" + error);
    }
  },

  //POST<root>/<api>: Registra uma nova disciplina
  async post(request: Request, response: Response) {
    try {
      loggerRequest({
        method: "POST",
        url: request.url,
        action: "Registra uma nova disciplina",
        body: request.body,
        params: request.params,
      });

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

            loggerBeforeReturn({ message: "Campos informados inválidos" });

            return response.status(400).json({
              success: false,
              mensagem: "Campos informados inválidos",
              erros: schemaErrors,
            });
          });
      } catch (error) {
        loggerBeforeReturn({ message: "Fail to validate data: " });
        return response.status(500).json({ "Fail to validate data: ": error });
      }

      const findOne = await disciplineRepository.findOne({ codigo: codigo });

      if (findOne) {
        loggerBeforeReturn({ message: "Objeto já existe" });
        return response.status(302).send("Objeto já existe");
      }
      const discipline: InterfaceDiscipline = await disciplineRepository.create(
        data
      );

      loggerResponse({
        method: "POST",
        action: "Registra uma nova disciplina",
        url: request.url,
        response: findOne
          ? discipline_view.render(findOne)
          : discipline_view.render(discipline),
      });

      return response.status(201).json(discipline_view.render(discipline));
    } catch (error) {
      loggerBeforeReturn({ message: "Falha no servidor" });
      return response.status(500).send("Falha no servidor:" + error);
    }
  },

  //PUT<root>/<api>/id>: Atualiza a disciplina com esse id
  async put(request: Request, response: Response) {
    try {
      loggerRequest({
        method: "PUT",
        action: "Atualiza a disciplina com o id",
        url: request.url,
        body: request.body,
        params: request.params,
      });

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
            loggerBeforeReturn({ message: "Campos informados inválidos" });
            return response.status(400).json({
              success: false,
              mensagem: "Campos informados inválidos",
              erros: schemaErrors,
            });
          });
      } catch (error) {
        loggerBeforeReturn({ message: "Fail to validate data: " });
        return response.status(500).json({ "Fail to validate data: ": error });
      }

      const discipline: any = await disciplineRepository.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
        }
      );

      loggerResponse({
        method: "PUT",
        action: "Atualiza a disciplina com o id",
        url: request.url,
        response: discipline_view.render(discipline),
      });

      return response.status(200).json(discipline_view.render(discipline));
    } catch (error) {
      loggerBeforeReturn({ message: "Falha no servidor: " });
      return response.status(500).send("Falha no servidor: " + error);
    }
  },

  //PATCH<root>/<api>/id>: Atualiza parcialmente a disciplina com aquele id
  async patch(request: Request, response: Response) {
    try {
      loggerRequest({
        method: "PATCH",
        url: request.url,
        action: "Atualiza parcialmente a disciplina com o id",
        body: request.body,
        params: request.params,
      });

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

            loggerBeforeReturn({ message: "Campos informados inválidos" });

            return response.status(400).json({
              success: false,
              mensagem: "Campos informados inválidos",
              erros: schemaErrors,
            });
          });
      } catch (error) {
        loggerBeforeReturn({ message: "Fail to validate data: " });
        return response.status(500).json({ "Fail to validate data: ": error });
      }

      const findOne: any = await disciplineRepository.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
        }
      );

      loggerResponse({
        method: "PATCH",
        action: "Atualiza parcialmente a disciplina com o id",
        url: request.url,
        response: discipline_view.render(findOne),
      });

      return response.status(200).json(discipline_view.render(findOne));
    } catch (error) {
      loggerBeforeReturn({ message: "Falha no servidor: " });
      return response.status(500).send("Falha no servidor:" + error);
    }
  },

  //DELETE<root>/<api>/<id>:Deleta uma disciplina
  async delete(request: Request, response: Response) {
    try {
      loggerRequest({
        method: "DELETE",
        url: request.url,
        action: "Deleta uma disciplina",
        body: request.body,
        params: request.params,
      });

      const { id } = request.params;

      const discipline = await disciplineRepository.findByIdAndRemove(id);

      if (discipline) {
        loggerResponse({
          method: "DELETE",
          url: request.url,
          action: "Deleta uma disciplina",
          response: discipline,
        });

        return response.status(200).send("Disciplina deletada com sucesso");
      }
      loggerBeforeReturn({ message: "Disciplina não encontrada" });
      return response.status(404).send("Disciplina não encontrada");
    } catch (error) {
      loggerBeforeReturn({ message: "Falha no servidor: " });
      return response.status(500).send("Falha no servidor:" + error);
    }
  },
};
