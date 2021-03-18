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
  stock: number;
  imagenUrl: string;

  constructor() {
    this.imagenUrl = '';
  }
}
