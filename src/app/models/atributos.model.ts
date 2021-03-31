import {AttributesService} from '@app/services/attributes.service';

export class AtributosModel {
  id ?: string;
  nombre: string;
  cuerpoZona ?: string;
  activo: boolean;

  constructor() {
    this.activo = true;
  }
}
