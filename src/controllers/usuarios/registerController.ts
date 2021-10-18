import { Request, Response } from "express";
import { UsuarioI } from "../../Interfaces/UsuarioI";
import { UsuarioService } from "../../services/UsurioServices";
import jwt from "jsonwebtoken";
import { sendError } from "../../helpers/sendError";

export const register =
  (userService: UsuarioService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { rut, nombre, correo, pass, nacimiento, sexo, telefono } =
        req.body;

      if (
        !rut ||
        !nombre ||
        !correo ||
        !pass ||
        !nacimiento ||
        !sexo ||
        !telefono
      ) {
        return sendError(400, "Falta informacion", res);
      }

      const obtenidoRut: UsuarioI | null = await userService.obtenerPorrut(rut);
      const obtenidoEmail: UsuarioI | null = await userService.obtenerPorEmail(
        correo
      );

      if (obtenidoRut) {
        return res.status(400).json({ message: "Usuario ya esta registrado" });
      }

      if (obtenidoEmail) {
        return sendError(400, "El correo electronico ya esta en uso", res);
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
        expiresIn: "1 years",
      });

      return res.json({ usuario: usuarioRegistrado, token });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
