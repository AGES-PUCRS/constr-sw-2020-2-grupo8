import { Router } from "express";

const routes = Router();
import handle from "express-async-handler";

import DisciplineController from "../controllers/DisciplineController";

routes.get("/disciplinas", handle(DisciplineController.getAllOrQuery));

routes.get("/disciplinas/:id", handle(DisciplineController.get));

routes.delete("/disciplinas/:id", handle(DisciplineController.delete));

routes.post("/disciplinas", handle(DisciplineController.post));
routes.put("/disciplinas/:id", handle(DisciplineController.put));

routes.patch("/disciplinas/:id", handle(DisciplineController.patch));

export default routes;
