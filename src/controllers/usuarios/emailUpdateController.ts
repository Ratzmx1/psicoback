import { Request, Response } from "express";
import { UsuarioService } from "../../services/UsurioServices";

export const emailUpdate =
  (userService: UsuarioService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { newEmail } = req.body;
      const usuario = await userService.obtenerUsuario(res.locals._id);

      if (!usuario) return res.status(404).json({ message: "No existe" });

      if (!newEmail) {
        return res.status(401).json({ message: "Debe ingresar un email" });
      }

      const updatedUser = await userService.actualizarEmail(
        res.locals._id,
        newEmail
      );
      return res.json({ usuario: updatedUser });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Internal server error | ${error.message}` });
    }
  };
