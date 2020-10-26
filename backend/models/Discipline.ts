import mongoose from "mongoose";

export interface IDiscipline extends mongoose.Document {
  nome: String;
  objetivos: String;
  escola: String;
  bibliografia: Array<string>;
  codigo: Number;
  creditos: Number;
  turma: String;
  criado: String;
  _id: String;
}

const disciplineSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  objetivos: {
    type: String,
    required: true,
  },
  ementa: {
    type: String,
    required: true,
  },
  bibliografia: {
    type: [String],
    required: true,
  },
  codigo: {
    type: Number,
    requires: true,
  },
  creditos: {
    type: Number,
    requires: true,
  },
  turma: {
    type: String,
    required: true,
  },
  criado: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IDiscipline>("Disciplina", disciplineSchema);
