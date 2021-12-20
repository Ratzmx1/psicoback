import { Request, Response } from "express";
import { sendError } from "../../helpers/sendError";
import { UsuarioService } from "../../services/UsurioServices";

export const verDatos =
  (userService: UsuarioService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const usuario = await userService.obtenerDatos(res.locals._id);
      return res.json({ usuario });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
