import { Request, response, Response } from "express";
import { UsuarioService } from "../../services/UsurioServices";
import bcrypt from "bcrypt";

export const passUpdate =
  (userService: UsuarioService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { oldPass, newPass } = req.body;
      const usuario = await userService.obtenerUsuario(res.locals._id);
      const passCorrecta = bcrypt.compareSync(oldPass, usuario.pass);
      if (!passCorrecta) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
      if (passCorrecta == newPass) {
        return res
          .status(400)
          .json({ message: "Contraseña nueva igual a la antigua" });
      }
      const passEncryped = bcrypt.hashSync(newPass, 12);
      usuario.pass = passEncryped;
      return res.json({ usuario });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Internal server error | ${error.message}` });
    }
  };
