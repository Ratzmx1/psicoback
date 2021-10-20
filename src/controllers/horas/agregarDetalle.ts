import { Request, Response } from "express";
import { sendError } from "../../helpers/sendError";
import { HoraService } from "../../services/Horaservice";

export const agregarDetalle =
  (horaService: HoraService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id, detalle } = req.body;
      if (!id || !detalle) {
        return sendError(400, "Faltan datos", res);
      }
      const hora = await horaService.obtenerHora(id);
      if (!hora) {
        return sendError(404, "No se encuentra la id", res);
      }
      const horaNueva = await horaService.agregarDetalle(id, detalle);
      return res.json({ hora: horaNueva });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
