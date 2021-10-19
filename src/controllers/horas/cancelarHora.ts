import { Request, Response } from "express";
import { sendError } from "../../helpers/sendError";
import { HoraService } from "../../services/Horaservice";

export const cancelarHora =
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
      const idUsuario = res.locals._id;
      if (hora.idCliente !== idUsuario) {
        return sendError(403, "Esta hora no corresponde al cliente", res);
      }
      const cancelada = await horaService.cancelarHora(id);
      return res.json({ hora: cancelada });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
