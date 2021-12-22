import { Router } from "express";

import middleware from "./middleware";
import middlewarePsico from "./middlewarePsico";
import { HoraService } from "../services/Horaservice";
import { UsuarioService } from "../services/UsurioServices";
import { crearHora } from "../controllers/horas/crearHora";
import { verDisponibles } from "../controllers/horas/verDisponibles";
import { solicitarHora } from "../controllers/horas/solicitarHora";
import { cancelarHora } from "../controllers/horas/cancelarHora";
import { verHistorial } from "../controllers/horas/verHistorial";
import { verHistorialId } from "../controllers/horas/verHistorialId";
import { verHistoriales } from "../controllers/horas/verHistoriales";
import { verHora } from "../controllers/horas/verHora";
import { eliminarHora } from "../controllers/horas/eliminarHora";
import { agregarDetalle } from "../controllers/horas/agregarDetalle";
import { Horas } from "../models/Hora";
import { verTomadas } from "../controllers/horas/verTomadas";
import { verTodas } from "../controllers/horas/verTodas";


const HorasRouter = Router();

const horaService = new HoraService();
const userService = new UsuarioService();

HorasRouter.post("/", middlewarePsico(userService), crearHora(horaService));

HorasRouter.get("/disponibles", middleware(), verDisponibles(horaService));

HorasRouter.get("/todas", middleware(), verTodas(horaService));

HorasRouter.post(
  "/solicitar",
  middleware(),
  solicitarHora(horaService, userService)
);

HorasRouter.patch("/cancelar", middleware(), cancelarHora(horaService));

HorasRouter.get("/historial", middleware(), verHistorial(horaService));

HorasRouter.get(
  "/historiales",
  middlewarePsico(userService),
  verHistoriales(horaService)
);
HorasRouter.get(
  "/tomadas",
  middlewarePsico(userService),
  verTomadas(horaService)
);
HorasRouter.get(
  "/historial/:id",
  middlewarePsico(userService),
  verHistorialId(horaService)
);
HorasRouter.get(
  "/hora/:idHora",
  middleware(),
  verHora(horaService, userService)
);
HorasRouter.delete(
  "/",
  middlewarePsico(userService),
  eliminarHora(horaService)
);
HorasRouter.patch(
  "/descripcion",
  middlewarePsico(userService),
  agregarDetalle(horaService)
);
export default HorasRouter;
