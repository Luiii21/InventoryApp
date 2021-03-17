export class ProductoFileModel {
  public archivo: File;
  public nombreArchivo: string;
  public url: string;

  constructor( archivo: File) {
    this.archivo = archivo;
  }
}
