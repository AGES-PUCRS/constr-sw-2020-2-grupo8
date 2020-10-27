import yup from "../validators/validator";

const disciplineYupUpdate = yup.object().shape({
  nome: yup.string().optional().min(5).max(30),
  objetivos: yup.string().optional().min(10).max(300),
  ementa: yup.string().optional().min(10).max(300),
  bibliografia: yup
    .array(yup.string().optional().min(10).max(50))
    .optional()
    .min(1)
    .max(10),
  codigo: yup.string().optional().min(5).max(5),
  creditos: yup.string().optional().min(2).max(2),
  turma: yup.string().optional(),
});

export default disciplineYupUpdate;
