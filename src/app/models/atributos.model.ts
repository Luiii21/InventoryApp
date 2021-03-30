export class AtributosModel {
  id ?: string;
  nombre: string;
  cuerpoZona ?: string;
  activo: boolean;

  constructor() {
    this.activo = true;
  }
}
