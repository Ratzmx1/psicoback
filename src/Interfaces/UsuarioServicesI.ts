import { HorasI } from "./HorasI";
import { UsuarioI } from "./UsuarioI";

export interface UsuarioServicesI {
  login(rut: string, pass: string): Promise<UsuarioI>;
  registro(
    rut: string,
    nombre: string,
    correo: string,
    pass: string,
    nacimiento: Date,
    sexo: string,
    telefono: string
  ): Promise<UsuarioI | null>;
  solicitarHora(
    idHora: string,
    idCliente: string,
    nombre: string
  ): Promise<HorasI>;
  obtenerUsuario(userId: string): Promise<UsuarioI>;
  historialHoras(idCliente: string): Promise<Array<HorasI>>;
  verHorasDisponibles(): Promise<Array<HorasI>>;
  cancelarHoras(idHora: string, idCliente: string): Promise<HorasI>;
  actualizarPass(idCliente: string, newPass: string): Promise<UsuarioI>;
  actualizarEmail(idCliente: string, newEmail: string): Promise<UsuarioI>;
  obtenerPorEmail(email: string): Promise<UsuarioI | null>;
  obtenerPorrut(rut: string): Promise<UsuarioI | null>;
}
