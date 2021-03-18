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

  uploadImage(image: ProductoFileModel, product: ProductoModel): void {
    const storageRef = firebase.storage().ref();
    const uploadTask: firebase.storage.UploadTask =
      storageRef.child(`${this.CARPETA_IMAGENES}/${image.nombreArchivo}`).put(image.archivo);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      }, (error) => {
        console.log('Error al subir', error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          product.imagenUrl = url;
          this.updateProduct(product).subscribe(resp => {});
        });
      });
  }


  // tslint:disable-next-line:typedef
  private updateProduct(product: ProductoModel) {
    const productID = product.id;
    delete product.id;
    return this.http.put(`${environment.inventoryDB}/productos/${productID}.json`, product);
  }
}
