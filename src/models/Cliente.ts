import { Schema, model } from "mongoose";
import { UsuarioI } from "../Interfaces/UsuarioI";

const schema = new Schema<UsuarioI>({
  rut: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  nacimiento: { type: Date, required: true },
  nombre: { type: String, required: true },
  pass: { type: String, required: true },
  sexo: { type: String, required: true },
  telefono: { type: Number, required: true },
  tipo: { type: String, default: "CLIENTE" },
});

export const Cliente = model<UsuarioI>("Usuario", schema);
