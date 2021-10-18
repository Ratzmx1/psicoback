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
  async obtenerUsuario(userId: string): Promise<UsuarioI | null> {
    try {
      const usuario = await Cliente.findById(userId);
      return usuario;
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
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

  async actualizarPass(
    idCliente: string,
    newPass: string
  ): Promise<UsuarioI | null> {
    try {
      const usuario = await Cliente.findByIdAndUpdate(idCliente, {
        pass: newPass,
      });
      return usuario;
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  }
  async actualizarEmail(
    idCliente: string,
    newEmail: string
  ): Promise<UsuarioI | null> {
    try {
      const usuario = await Cliente.findByIdAndUpdate(idCliente, {
        correo: newEmail,
      });
      return usuario;
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  }
}
