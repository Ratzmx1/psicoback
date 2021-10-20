import { Request, Response } from "express";
import { sendError } from "../../helpers/sendError";
import { HoraService } from "../../services/Horaservice";

export const eliminarHora =
  (horaService: HoraService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.body;
      if (!id) {
        return sendError(400, "No se ingreso la id de la hora", res);
      }
      const hora = await horaService.obtenerHora(id);
      if (!hora) {
        return sendError(404, "No se encuentra la id", res);
      }
      const eliminada = await horaService.eliminarHora(id);
      return res.json({ hora: eliminada });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
