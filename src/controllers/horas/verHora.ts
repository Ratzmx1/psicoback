import { Request, Response } from "express";
import { sendError } from "../../helpers/sendError";
import { HoraService } from "../../services/Horaservice";
import { UsuarioService } from "../../services/UsurioServices";

export const verHora =
  (horaService: HoraService, UsuarioService: UsuarioService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { idHora } = req.params;
      console.log(idHora);
      if (!idHora) {
        return sendError(400, "No se ingreso una id", res);
      }
      const hora = await horaService.obtenerHora(idHora);
      if (!hora) {
        return sendError(404, "No se encontro la hora especificada", res);
      }
      const idUsuario = res.locals._id;
      const usuario = await UsuarioService.obtenerUsuario(idUsuario);
      if (usuario?.tipo === "CLIENTE" && hora.idCliente !== idUsuario) {
        return sendError(401, "Usuario no autorizado", res);
      }
      return res.json({ hora });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
