import { HorasI } from "./HorasI";
import { UsuarioI } from "./UsuarioI";

export interface UsuarioServicesI {
  registro(
    rut: string,
    nombre: string,
    correo: string,
    pass: string,
    nacimiento: Date,
    sexo: string,
    telefono: string
  ): Promise<UsuarioI | null>;

  obtenerUsuario(userId: string): Promise<UsuarioI | null>;
  obtenerDatos(userId: string): Promise<UsuarioI | null>;
  actualizarPass(idCliente: string, newPass: string): Promise<UsuarioI | null>;
  actualizarEmail(
    idCliente: string,
    newEmail: string
  ): Promise<UsuarioI | null>;
  obtenerPorEmail(email: string): Promise<UsuarioI | null>;
  obtenerPorrut(rut: string): Promise<UsuarioI | null>;
  obtenerTodos(): Promise<UsuarioI[]>;
}
