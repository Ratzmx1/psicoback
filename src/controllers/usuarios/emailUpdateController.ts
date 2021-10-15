import { Request, Response } from "express";
import { UsuarioService } from "../../services/UsurioServices";

export const emailUpdate =
  (userService: UsuarioService) =>
  async (req: Request, res: Response): Promise<Response> => {
    return res;
  };
