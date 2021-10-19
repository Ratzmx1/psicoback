import { Router } from "express";

import middleware from "./middleware";
import middlewarePsico from "./middlewarePsico";
import { HoraService } from "../services/Horaservice";
import { UsuarioService } from "../services/UsurioServices";
import { crearHora } from "../controllers/horas/crearHora";
import { verDisponibles } from "../controllers/horas/verDisponibles";
import { solicitarHora } from "../controllers/horas/solicitarHora";
import { cancelarHora } from "../controllers/horas/cancelarHora";

const HorasRouter = Router();

const horaService = new HoraService();
const userService = new UsuarioService();

HorasRouter.post("/", middlewarePsico(userService), crearHora(horaService));
HorasRouter.get("/disponibles", middleware(), verDisponibles(horaService));
HorasRouter.post(
  "/solicitar",
  middleware(),
  solicitarHora(horaService, userService)
);
HorasRouter.patch("/cancelar", middleware(), cancelarHora(horaService));
export default HorasRouter;
