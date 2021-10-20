import { Request, Response } from "express";
import { sendError } from "../../helpers/sendError";
import { HoraService } from "../../services/Horaservice";

export const verHistoriales =
  (horaService: HoraService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const horas = await horaService.obtenerHistoriales();
      if (!horas) {
        return sendError(404, "No existen horas anteriores", res);
      }
      return res.json({ horas });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
