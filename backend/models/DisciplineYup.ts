import yup from "../validators/validator";

const disciplineYup = yup.object().shape({
  nome: yup.string().required().min(5).max(30),
  objetivos: yup.string().required().min(10).max(300),
  ementa: yup.string().required().min(10).max(300),
  bibliografia: yup
    .array(yup.string().required().min(10).max(300))
    .required()
    .min(1)
    .max(10),
  codigo: yup.string().required().min(5).max(5),
  creditos: yup.string().required().min(2).max(2),
  turma: yup.string().required(),
});

export default disciplineYup;
