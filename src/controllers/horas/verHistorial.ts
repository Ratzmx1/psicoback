import { Request, Response } from "express";
import { sendError } from "../../helpers/sendError";
import { HoraService } from "../../services/Horaservice";

export const verHistorial =
  (horaService: HoraService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const idUsuario = res.locals._id;
      const horas = await horaService.obtenerHistorialPorUsuario(idUsuario);
      if (!horas) {
        return sendError(404, "Usuario no tiene horas anteriores", res);
      }
      return res.json({ horas });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
