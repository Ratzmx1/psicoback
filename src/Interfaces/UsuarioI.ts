export interface UsuarioI {
  _id?: string;
  rut: string;
  nombre: string;
  correo: string;
  pass: string;
  nacimiento: Date;
  sexo: string;
  telefono: number;
  tipo: string;
}
