import * as Yup from "yup";

const discipline = Yup.object().shape({
  nome: Yup.string().required(),
  objetivos: Yup.string().required(),
  ementa: Yup.string().optional(),
  bibliografia: Yup.array(Yup.string().required()).required(),
  codigo: Yup.number().required(),
  creditos: Yup.number().required(),
});

export default discipline;
