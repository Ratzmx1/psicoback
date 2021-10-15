import { Request, Response } from "express";
import { UsuarioService } from "../../services/UsurioServices";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login =
  (userService: UsuarioService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { rut, pass } = req.body;

      if (!rut || !pass) {
        return res.status(400).json({ message: "Falta informacion" });
      }

      const usuario = await userService.obtenerPorrut(rut);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const passCorrecta = bcrypt.compareSync(pass, usuario.pass);

      if (!passCorrecta) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign({ _id: usuario?._id }, "EstaEsLaKeyxd", {
        expiresIn: "1 years",
      });

      return res.json({ usuario, token });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Internal server error | ${error.message}` });
    }
  };
