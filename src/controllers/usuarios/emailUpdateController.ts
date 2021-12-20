import { Request, Response } from "express";
import { sendError } from "../../helpers/sendError";
import { UsuarioService } from "../../services/UsurioServices";

export const emailUpdate =
  (userService: UsuarioService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { newEmail } = req.body;
      const usuario = await userService.obtenerUsuario(res.locals._id);

      if (!usuario) return sendError(404, "No existe", res);

      if (!newEmail) {
        return sendError(401, "Debe ingresar un email", res);
      }

      const updatedUser = await userService.actualizarEmail(
        res.locals._id,
        newEmail
      );
      console.log(updatedUser);
      return res.json({ usuario: updatedUser });
    } catch (error: any) {
      console.log(error.message);
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
