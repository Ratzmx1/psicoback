import { Request, Response } from "express";
import { sendError } from "../../helpers/sendError";
import { HoraService } from "../../services/Horaservice";

export const crearHora =
  (horaService: HoraService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { fecha } = req.body;
      if (!fecha) {
        return sendError(400, "Fecha no ingresada", res);
      }

      const formattedFecha = new Date(fecha);
      console.log(formattedFecha.toUTCString());
      const hora = await horaService.crearHora(formattedFecha);

      if (!hora) return sendError(400, "Hora ya existe", res);

      return res.json({ hora });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
