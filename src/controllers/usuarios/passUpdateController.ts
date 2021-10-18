import { Request, Response } from "express";
import { UsuarioService } from "../../services/UsurioServices";
import bcrypt from "bcrypt";
import { sendError } from "../../helpers/sendError";

export const passUpdate =
  (userService: UsuarioService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { oldPass, newPass } = req.body;
      const usuario = await userService.obtenerUsuario(res.locals._id);

      if (!usuario) return sendError(404, "No existe", res);

      const passCorrecta = bcrypt.compareSync(oldPass, usuario.pass);

      if (!passCorrecta) {
        return sendError(401, "Contraseña incorrecta", res);
      }

      if (oldPass == newPass) {
        return sendError(400, "Contraseña nueva igual a la antigua", res);
      }

      const passEncryped = bcrypt.hashSync(newPass, 12);
      const newUser = await userService.actualizarPass(
        res.locals._id,
        passEncryped
      );
      return res.json({ usuario: newUser });
    } catch (error: any) {
      return sendError(500, `Internal server error | ${error.message}`, res);
    }
  };
