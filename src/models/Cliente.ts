import { Schema, model } from "mongoose";
import { ClienteI } from "../Interfaces/ClienteI";

const schema = new Schema<ClienteI>({
  rut: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  nacimiento: { type: Date, required: true },
  nombre: { type: String, required: true },
  pass: { type: String, required: true },
  sexo: { type: String, required: true },
  telefono: { type: Number, required: true },
});

export const Cliente = model<ClienteI>("Cliente", schema);
