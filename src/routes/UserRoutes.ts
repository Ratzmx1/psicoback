import { Router } from "express";
import { UsuarioService } from "../services/UsurioServices";
import { login } from "../controllers/usuarios/loginController";
import { register } from "../controllers/usuarios/registerController";
import { passUpdate } from "../controllers/usuarios/passUpdateController";
import middleware from "./middleware";
import middlewarePsico from "./middlewarePsico";
import { verClientes } from "../controllers/usuarios/verClientes";
<<<<<<< HEAD
import { verDatos } from "../controllers/usuarios/verDatos";
=======
import { emailUpdate } from "../controllers/usuarios/emailUpdateController";
>>>>>>> 6c9060c99aa8588b97b05f10f70be501d795ced3

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

<<<<<<< HEAD
userRouter.get("/datos", middleware(), verDatos(userService));
=======
userRouter.patch("/email", middleware(), emailUpdate(userService));

userRouter.patch("/pass", middleware(), passUpdate(userService));
>>>>>>> 6c9060c99aa8588b97b05f10f70be501d795ced3

export default userRouter;
