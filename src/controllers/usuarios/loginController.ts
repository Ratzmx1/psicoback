import { Request, Response } from "express";
import { UsuarioService } from "../../services/UsurioServices";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendError } from "../../helpers/sendError";

export const login =
  (userService: UsuarioService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { rut, pass } = req.body;

      if (!rut || !pass) {
        return sendError(400, "Falta informacion", res);
      }

      const usuario = await userService.obtenerPorrut(rut);
      if (!usuario) {
        return sendError(404, "Usuario no encontrado", res);
      }

      const passCorrecta = bcrypt.compareSync(pass, usuario.pass);

      if (!passCorrecta) {
        return sendError(401, "Contraseña incorrecta", res);
      }

      const token = jwt.sign({ _id: usuario?._id }, "EstaEsLaKeyxd", {
        expiresIn: "1 years",
      });

      return res.json({ usuario, token });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
