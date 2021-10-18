import { Router } from "express";

import middleware from "./middleware";
import middlewarePsico from "./middlewarePsico";
import { HoraService } from "../services/Horaservice";
import { UsuarioService } from "../services/UsurioServices";
import { crearHora } from "../controllers/horas/crearHora";

const HorasRouter = Router();

const horaService = new HoraService();
const userService = new UsuarioService();

HorasRouter.post("/", middlewarePsico(userService), crearHora(horaService));

export default HorasRouter;
