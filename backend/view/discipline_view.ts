import Discipline from "../models/Discipline";
export default {
  render(discipline: typeof Discipline) {
    return {
      id: discipline._id,
      nome: discipline.nome,
      objetivos: discipline.objetivos,
      ementa: discipline.ementa,
      bibliografia: discipline.bibliografia,
      codigo: discipline.codigo,
      creditos: discipline.creditos,
    };
  },

  renderMany(disciplines: typeof Discipline[]) {
    return disciplines.map((discipline) => this.render(discipline));
  },
};
