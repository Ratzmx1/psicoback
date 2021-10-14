import { Router } from "express";
import { UsuarioI } from "../Interfaces/UsuarioI";
import { UsuarioService } from "../services/UsurioServices";
import jwt from "jsonwebtoken";

const userRouter = Router();

const userService = new UsuarioService();

userRouter.post("/", async (req, res) => {
  const { rut, nombre, correo, pass, nacimiento, sexo, telefono } = req.body;

  const obtenidoRut: UsuarioI | null = await userService.obtenerPorrut(rut);
  const obtenidoEmail: UsuarioI | null = await userService.obtenerPorEmail(
    correo
  );

  if (obtenidoRut) {
    return res.status(400).json({ message: "Usuario ya esta registrado" });
  }

  if (obtenidoEmail) {
    return res
      .status(400)
      .json({ message: "El correo electronico ya esta en uso" });
  }

  const nacimientoDate = new Date(nacimiento);
  const usuarioRegistrado = await userService.registro(
    rut,
    nombre,
    correo,
    pass,
    nacimientoDate,
    sexo,
    telefono
  );

  const token = jwt.sign({ _id: usuarioRegistrado?._id }, "EstaEsLaKeyxd", {
    expiresIn: "5 years",
  });

  return res.json({ user: usuarioRegistrado, token });
});

export default userRouter;
