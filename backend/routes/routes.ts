import { Router } from "express";

const routes = Router();

import DisciplineController from "../controllers/DisciplineController";

routes.get("/disciplinas", DisciplineController.getAll);
routes.get("/disciplinas/:id", DisciplineController.get);
routes.post("/disciplinas", DisciplineController.post);
routes.put("/disciplinas/:id", DisciplineController.put);
routes.patch("/disciplinas/:id", DisciplineController.patch);
routes.delete("/disciplinas/:id", DisciplineController.delete);

export default routes;
