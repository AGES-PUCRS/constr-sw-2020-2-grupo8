import mongoose from "mongoose";

const DisciplinaModel = new mongoose.Schema({
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
  criado: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Disciplina", DisciplinaModel);
