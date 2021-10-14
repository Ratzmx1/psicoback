import { HorasI } from "../Interfaces/HorasI";
import { UsuarioI } from "../Interfaces/UsuarioI";
import { UsuarioServicesI } from "../Interfaces/UsuarioServicesI";
import bcrypt from "bcrypt";
import { Cliente } from "../models/Cliente";

export class UsuarioService implements UsuarioServicesI {
  async obtenerPorEmail(email: string): Promise<UsuarioI | null> {
    const usuario = await Cliente.findOne({ correo: email });
    return usuario;
  }
  async obtenerPorrut(rut: string): Promise<UsuarioI | null> {
    const usuario = await Cliente.findOne({ rut });
    return usuario;
  }
  obtenerUsuario(userId: string): Promise<UsuarioI> {
    throw new Error("Method not implemented.");
  }

  login(rut: string, pass: string): Promise<UsuarioI> {
    throw new Error("Method not implemented.");
  }

  async registro(
    rut: string,
    nombre: string,
    correo: string,
    pass: string,
    nacimiento: Date,
    sexo: string,
    telefono: string
  ): Promise<UsuarioI | null> {
    const passEncryped = bcrypt.hashSync(pass, 12);

    try {
      const client = await Cliente.create({
        rut,
        nombre,
        correo,
        pass: passEncryped,
        nacimiento,
        sexo,
        telefono,
      });
      return client;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  solicitarHora(
    idHora: string,
    idCliente: string,
    nombre: string
  ): Promise<HorasI> {
    throw new Error("Method not implemented.");
  }

  historialHoras(idCliente: string): Promise<HorasI[]> {
    throw new Error("Method not implemented.");
  }

  verHorasDisponibles(): Promise<HorasI[]> {
    throw new Error("Method not implemented.");
  }
  cancelarHoras(idHora: string, idCliente: string): Promise<HorasI> {
    throw new Error("Method not implemented.");
  }
  actualizarPass(idCliente: string, newPass: string): Promise<UsuarioI> {
    throw new Error("Method not implemented.");
  }
  actualizarEmail(idCliente: string, newEmail: string): Promise<UsuarioI> {
    throw new Error("Method not implemented.");
  }
}
