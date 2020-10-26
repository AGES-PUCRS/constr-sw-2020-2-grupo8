import IDiscipline from "../models/Discipline";

interface ITurma {
  horario: string[];
  alunos: string[];
  aulas: string[];
  _id: string;
  numero: number;
  ano: number;
  semestre: number;
  sala: any;
  disciplina: any;
  professor: string;
}

export default {
  render(discipline: typeof IDiscipline) {
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

  renderTurma(turma: ITurma) {
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

  renderMany(disciplines: typeof Discipline[]) {
    return disciplines.map((discipline) => this.render(discipline));
  },

  renderManyTurmas(turmas: typeof ITurma[]) {
    return turmas.map((turma) => this.renderTurma(turma));
  },

  renderWithExpandsTurma(discipline: typeof Discipline, turma: ITurma) {
    return {
      _id: discipline._id,
      nome: discipline.nome,
      objetivos: discipline.objetivos,
      ementa: discipline.ementa,
      bibliografia: discipline.bibliografia,
      codigo: discipline.codigo,
      creditos: discipline.creditos,
      turma: this.renderTurma(turma),
    };
  },

  renderManyWithExpandsTurma(
    discipline: typeof Discipline[],
    turmas: ITurma[]
  ) {
    return {
      _id: discipline._id,
      nome: discipline.nome,
      objetivos: discipline.objetivos,
      ementa: discipline.ementa,
      bibliografia: discipline.bibliografia,
      codigo: discipline.codigo,
      creditos: discipline.creditos,
      turmas: this.renderManyTurmas(turmas),
    };
  },
};
