export class ProductoModel {
  id ?: string;
  tienda: string;
  tipo: string;
  precio: number;
  nombre: string;
  marca: string;
  genero: string;
  color: string;
  tamano: string;
  stockInicial: number;
  stockActual ?: number;
  imagenUrl: string;
  disponibilidad: boolean;
  creacionFecha: string;
  updateFecha: string;

  constructor() {
    this.imagenUrl = '';
    this.disponibilidad = true;
  }
}
