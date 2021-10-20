import { Request, Response } from "express";
import { sendError } from "../../helpers/sendError";
import { UsuarioService } from "../../services/UsurioServices";

export const verClientes =
  (userService: UsuarioService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const clientes = await userService.obtenerTodos();
      return res.json({ clientes });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
