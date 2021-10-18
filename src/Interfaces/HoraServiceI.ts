import { HorasI } from "./HorasI";

export interface HoraServicesI {
  crearHora(): Promise<HorasI>;
  eliminarHora(id: string): Promise<boolean>;
  confirmarHora(id: string): Promise<HorasI | null>;
  solicitarhora(
    id: string,
    idCliente: string,
    nombre: string
  ): Promise<HorasI | null>;
  obtenerDisponibles(): Promise<Array<HorasI>>;
  obtenerHistorial(): Promise<Array<HorasI>>;
  agregarDetalle(id: string, detalle: string): Promise<HorasI | null>;
  cancelarHora(id: string): Promise<HorasI | null>;
  obtenerHistorialPorUsuario(idUsuario: string): Promise<Array<HorasI>>;
  obtenerHora(id: string): Promise<HorasI | null>;
}
