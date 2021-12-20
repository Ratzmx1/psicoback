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

  async eliminarHora(id: string): Promise<HorasI | null> {
    try {
      const hora = await Horas.findByIdAndDelete(id);
      return hora;
    } catch (error: any) {
      throw new Error(`Database error: ${error}`);
    }
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

  async obtenerHistoriales(): Promise<HorasI[]> {
    try {
      const horas = await Horas.find({
        disponible: false,
        fecha: { $lt: new Date() },
      })
        .sort("fecha")
        .select("_id fecha pagado");
      return horas;
    } catch (error: any) {
      throw new Error(`Database error: ${error}`);
    }
  }

  async agregarDetalle(id: string, detalle: string): Promise<HorasI | null> {
    try {
      await Horas.findByIdAndUpdate(id, {
        descripcion: detalle,
      });
      const cambiada = await Horas.findById(id);
      return cambiada;
    } catch (error: any) {
      throw new Error(`Database error: ${error}`);
    }
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

  async obtenerHistorialPorUsuario(id: string): Promise<HorasI[]> {
    try {
      const horas = await Horas.find({
        idCliente: id,
      })
        .sort({ fecha: -1 })
        .select("_id fecha pagado");
      return horas;
    } catch (error: any) {
      throw new Error(`Database error: ${error}`);
    }
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
