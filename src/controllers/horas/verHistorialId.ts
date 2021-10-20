import { Request, Response } from "express";
import { sendError } from "../../helpers/sendError";
import { HoraService } from "../../services/Horaservice";

export const verHistorialId =
  (horaService: HoraService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const horas = await horaService.obtenerHistorialPorUsuario(id);
      if (!horas) {
        return sendError(404, "Usuario no tiene horas anteriores", res);
      }
      return res.json({ horas });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
