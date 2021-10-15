import { Router } from "express";
import { UsuarioI } from "../Interfaces/UsuarioI";
import { UsuarioService } from "../services/UsurioServices";
import jwt from "jsonwebtoken";
import { login } from "../controllers/usuarios/loginController";
import { register } from "../controllers/usuarios/registerController";
import { passUpdate } from "../controllers/usuarios/passUpdateController";
import middleware from "./middleware";

const userRouter = Router();

const userService = new UsuarioService();

userRouter.post("/", register(userService));

userRouter.post("/login", login(userService));

userRouter.patch("/password", middleware, passUpdate(userService));

export default userRouter;
