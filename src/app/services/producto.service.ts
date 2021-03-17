import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductoModel} from '@app/models/producto.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


// IMPORTS


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  registerProduct(producto: ProductoModel) {
    return this.http.post(`${environment.inventoryDB}/productos.json`, producto)
      .pipe(
        map((resp: any) => {
          producto.id = resp.name;
          return producto;
        })
      );
  }
}
