import { Request, Response } from "express";
import { sendError } from "../../helpers/sendError";
import { UsuarioServicesI } from "../../Interfaces/UsuarioServicesI";
import { HoraService } from "../../services/Horaservice";

export const solicitarHora =
  (horaService: HoraService, usuarioService: UsuarioServicesI) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.body;
      if (!id) {
        return sendError(400, "Ingrese la hora a solicitar", res);
      }

      const usuarioSolicitante = await usuarioService.obtenerUsuario(
        res.locals._id
      );
      if (!usuarioSolicitante) {
        return sendError(400, "Usuario inexistente", res);
      }

      const horaSolicitada = await horaService.obtenerHora(id);
      if (!horaSolicitada) {
        return sendError(404, "Hora inexistente", res);
      } else if (!horaSolicitada.disponible) {
        return sendError(400, "Hora no disponible", res);
      }

      const hora = await horaService.solicitarhora(
        id,
        usuarioSolicitante._id || "",
        usuarioSolicitante.nombre
      );

      return res.json({ hora });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
