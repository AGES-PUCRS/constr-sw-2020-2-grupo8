import { InterfaceDiscipline } from "../interfaces/discipline";
import { InterfaceTurma } from "../interfaces/turma";

export default {
  render(discipline: InterfaceDiscipline) {
    return {
      _id: discipline._id,
      nome: discipline.nome,
      objetivos: discipline.objetivos,
      ementa: discipline.ementa,
      bibliografia: discipline.bibliografia,
      codigo: discipline.codigo,
      creditos: discipline.creditos,
      criado: discipline.criado,
      turma: discipline.turma,
    };
  },

  renderTurma(turma: InterfaceTurma) {
    return {
      horario: turma.horario,
      alunos: turma.alunos,
      _id: turma._id,
      numero: turma.numero,
      ano: turma.ano,
      semestre: turma.semestre,
      sala: turma.sala,
      aulas: turma.aulas,
      professor: turma.professor,
    };
  },

  renderMany(disciplines: InterfaceDiscipline[]) {
    return disciplines.map((discipline) => this.render(discipline));
  },

  renderManyTurmas(turmas: InterfaceTurma[]) {
    return turmas.map((turma) => this.renderTurma(turma));
  },

  renderWithExpandsTurma(
    discipline: InterfaceDiscipline,
    turma: InterfaceTurma
  ) {
    return {
      _id: discipline._id,
      nome: discipline.nome,
      objetivos: discipline.objetivos,
      ementa: discipline.ementa,
      bibliografia: discipline.bibliografia,
      codigo: discipline.codigo,
      creditos: discipline.creditos,
      criado: discipline.criado,
      turma: this.renderTurma(turma),
    };
  },

  /* renderManyWithExpandsTurma(
    discipline: InterfaceDiscipline[],
    turmas: InterfaceTurma[]
  ) {
    return {
      _id: discipline._id,
      nome: discipline.nome,
      objetivos: discipline.objetivos,
      ementa: discipline.ementa,
      bibliografia: discipline.bibliografia,
      codigo: discipline.codigo,
      creditos: discipline.creditos,
      criado: discipline.criado,
      turmas: this.renderManyTurmas(turmas),
    };
  }, */
};
