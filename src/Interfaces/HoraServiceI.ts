import { HorasI } from "./HorasI";

export interface HoraServicesI {
  crearHora(fecha: Date): Promise<HorasI | null>;
  eliminarHora(id: string): Promise<boolean>;
  solicitarhora(
    id: string,
    idCliente: string,
    nombre: string
  ): Promise<HorasI | null>;
  obtenerDisponibles(): Promise<Array<HorasI>>;
  obtenerHistoriales(): Promise<Array<HorasI>>;
  agregarDetalle(id: string, detalle: string): Promise<HorasI | null>;
  cancelarHora(id: string): Promise<HorasI | null>;
  obtenerHistorialPorUsuario(idUsuario: string): Promise<Array<HorasI>>;
  obtenerHora(id: string): Promise<HorasI | null>;
}
