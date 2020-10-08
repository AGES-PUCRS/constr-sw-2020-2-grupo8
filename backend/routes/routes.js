const express = require("express");

const routes = express.Router();

const DisciplineController = require("../Controllers/DisciplineController");

const middleware = require("../Middleware/middleware.js");

const schemas = require("../Models/joi.js");

routes.get("/disciplinas", DisciplineController.list);
routes.get("/disciplinas/:id", DisciplineController.get);
routes.post("/disciplinas", DisciplineController.post);
routes.put("/disciplinas/:id", DisciplineController.put);
routes.patch("/disciplinas/:id", DisciplineController.patch);
routes.delete("/disciplinas/:id", DisciplineController.delete);

module.exports = routes;
