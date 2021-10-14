import { Schema, model } from "mongoose";
import { HorasI } from "../Interfaces/HorasI";

const schema = new Schema<HorasI>({
  disponible: { type: Boolean, default: true },
  idCliente: { type: String, required: false },
  descripcion: { type: String, required: false },
  nombre: { type: String, required: false },
  fecha: { type: Date, required: true },
  pagado: { type: Boolean, default: false },
});

export const Horas = model<HorasI>("Horas", schema);
