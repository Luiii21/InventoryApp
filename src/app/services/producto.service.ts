import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductoModel} from '@app/models/producto.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


// IMPORTS
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import {ProductoFileModel} from '@app/models/productoFile.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private CARPETA_IMAGENES = 'img';

  constructor(private http: HttpClient, private db: AngularFirestore) {
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

  // tslint:disable-next-line:typedef
  private saveImage(imagen: { nombre: string, url: string }) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`).add(imagen);
  }

  // tslint:disable-next-line:typedef
  loadImage(images: ProductoFileModel[]) {
    console.log(images);
  }
}
