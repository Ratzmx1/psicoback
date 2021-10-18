import { Request, Response } from "express";
import { HoraService } from "../../services/Horaservice";

export const crearHora =
  (horaService: HoraService) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { fecha } = req.body;
      if (!fecha) {
        return res.status(400).json({ message: "Fecha no ingresada" });
      }
      const formattedFecha = new Date(fecha);
      console.log(formattedFecha.toUTCString());
      const hora = await horaService.crearHora(formattedFecha);
      if (!hora) return res.status(400).json({ message: "Hora ya existe" });
      return res.json({ hora });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Internal server error | ${error.message}` });
    }
  };
