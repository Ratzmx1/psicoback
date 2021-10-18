import { HorasI } from "../Interfaces/HorasI";
import { HoraServicesI } from "../Interfaces/HoraServiceI";
import { Horas } from "../models/Hora";

export class HoraService implements HoraServicesI {
  crearHora(): Promise<HorasI> {
    throw new Error("Method not implemented.");
  }
  eliminarHora(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  confirmarHora(id: string): Promise<HorasI | null> {
    throw new Error("Method not implemented.");
  }
  obtenerDisponibles(): Promise<HorasI[]> {
    throw new Error("Method not implemented.");
  }
  obtenerHistorial(): Promise<HorasI[]> {
    throw new Error("Method not implemented.");
  }
  agregarDetalle(id: string, detalle: string): Promise<HorasI | null> {
    throw new Error("Method not implemented.");
  }
  cancelarHora(id: string): Promise<HorasI | null> {
    throw new Error("Method not implemented.");
  }
  obtenerHistorialPorUsuario(idUsuario: string): Promise<HorasI[]> {
    throw new Error("Method not implemented.");
  }
  obtenerHora(id: string): Promise<HorasI | null> {
    throw new Error("Method not implemented.");
  }
  solicitarhora(
    id: string,
    idCliente: string,
    nombre: string
  ): Promise<HorasI | null> {
    throw new Error("Method not implemented.");
  }
}
