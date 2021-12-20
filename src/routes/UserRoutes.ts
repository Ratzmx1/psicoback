import { Router } from "express";
import { UsuarioService } from "../services/UsurioServices";
import { login } from "../controllers/usuarios/loginController";
import { register } from "../controllers/usuarios/registerController";
import { passUpdate } from "../controllers/usuarios/passUpdateController";
import middleware from "./middleware";
import middlewarePsico from "./middlewarePsico";
import { verClientes } from "../controllers/usuarios/verClientes";
import { verDatos } from "../controllers/usuarios/verDatos";

const userRouter = Router();

const userService = new UsuarioService();

userRouter.post("/", register(userService));

userRouter.post("/login", login(userService));

userRouter.patch("/password", middleware(), passUpdate(userService));

userRouter.get(
  "/clientes",
  middlewarePsico(userService),
  verClientes(userService)
);

userRouter.get("/datos", middleware(), verDatos(userService));

export default userRouter;
