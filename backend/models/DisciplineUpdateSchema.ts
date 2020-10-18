import * as Yup from "yup";

const disciplineUpdate = Yup.object().shape({
  nome: Yup.string().optional(),
  objetivos: Yup.string().optional(),
  ementa: Yup.string().optional(),
  bibliografia: Yup.array(Yup.string().optional()).optional(),
  codigo: Yup.number().optional(),
  creditos: Yup.number().optional(),
});

export default disciplineUpdate;
