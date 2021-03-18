export class ProductoFileModel {
  public archivo: File;
  public nombreArchivo: string;
  public url: string;
  public productoID: string;

  constructor(archivo: File) {
    this.archivo = archivo;
    this.nombreArchivo = archivo.name;
  }
}
