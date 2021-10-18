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
    throw new Error("Method not implemented.");
  }
  async obtenerHistorial(): Promise<HorasI[]> {
    throw new Error("Method not implemented.");
  }
  async agregarDetalle(id: string, detalle: string): Promise<HorasI | null> {
    throw new Error("Method not implemented.");
  }
  async cancelarHora(id: string): Promise<HorasI | null> {
    throw new Error("Method not implemented.");
  }
  async obtenerHistorialPorUsuario(idUsuario: string): Promise<HorasI[]> {
    throw new Error("Method not implemented.");
  }
  async obtenerHora(id: string): Promise<HorasI | null> {
    throw new Error("Method not implemented.");
  }
  async solicitarhora(
    id: string,
    idCliente: string,
    nombre: string
  ): Promise<HorasI | null> {
    throw new Error("Method not implemented.");
  }
}
