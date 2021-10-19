import { HorasI } from "../Interfaces/HorasI";
import { HoraServicesI } from "../Interfaces/HoraServiceI";
import { Horas } from "../models/Hora";

export class HoraService implements HoraServicesI {
  async crearHora(fecha: Date): Promise<HorasI | null> {
    try {
      const hora = await Horas.create({ fecha });
      return hora;
    } catch (error: any) {
      console.log(error.code);
      if (error.code == 11000) return null;
      throw new Error(`Database error: ${error}`);
    }
  }
  async eliminarHora(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async confirmarHora(id: string): Promise<HorasI | null> {
    throw new Error("Method not implemented.");
  }
  async obtenerDisponibles(): Promise<HorasI[]> {
    try {
      const horas = await Horas.find({
        disponible: true,
        fecha: { $gt: new Date() },
      })
        .sort("fecha")
        .select("_id fecha");
      return horas;
    } catch (error: any) {
      throw new Error(`Database error: ${error}`);
    }
  }
  async obtenerHistorial(): Promise<HorasI[]> {
    throw new Error("Method not implemented.");
  }
  async agregarDetalle(id: string, detalle: string): Promise<HorasI | null> {
    throw new Error("Method not implemented.");
  }
  async cancelarHora(id: string): Promise<HorasI | null> {
    try {
      await Horas.findByIdAndUpdate(id, {
        disponible: true,
        idCliente: "",
        descripcion: "",
        nombre: "",
      });
      const cancelada = await Horas.findById(id);
      return cancelada;
    } catch (error: any) {
      throw new Error(`Database error: ${error}`);
    }
  }
  async obtenerHistorialPorUsuario(idUsuario: string): Promise<HorasI[]> {
    throw new Error("Method not implemented.");
  }
  async obtenerHora(id: string): Promise<HorasI | null> {
    try {
      const hora = await Horas.findById(id);
      if (!hora) {
        return null;
      }
      return hora;
    } catch (error: any) {
      throw new Error(`Database error: ${error}`);
    }
  }
  async solicitarhora(
    id: string,
    idCliente: string,
    nombre: string
  ): Promise<HorasI | null> {
    try {
      await Horas.findOneAndUpdate(
        { _id: id },
        {
          idCliente,
          nombre,
          disponible: false,
          pagado: false,
          confirmada: false,
        }
      );
      const hora = await Horas.findById(id);
      return hora;
    } catch (error: any) {
      console.log(error.code);
      if (error.code == 11000) return null;
      throw new Error(`Database error: ${error}`);
    }
  }
}
