import { Router } from "express";
import { UsuarioI } from "../Interfaces/UsuarioI";
import { UsuarioService } from "../services/UsurioServices";
import jwt from "jsonwebtoken";
import { login } from "../controllers/usuarios/loginController";
import { register } from "../controllers/usuarios/registerController";

const userRouter = Router();

const userService = new UsuarioService();

userRouter.post("/", register(userService));

userRouter.post("/login", login(userService));

export default userRouter;
