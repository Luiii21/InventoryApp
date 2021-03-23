import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductoModel} from '@app/models/producto.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


// IMPORTS
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import {ProductoFileModel} from '@app/models/productoFile.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private CARPETA_IMAGENES = 'img';

  constructor(private http: HttpClient, private db: AngularFirestore) {
  }

  // tslint:disable-next-line:typedef
  registerProduct(product: ProductoModel) {
    return this.http.post(`${environment.inventoryDB}/productos.json`, product)
      .pipe(
        map((resp: any) => {
          product.id = resp.name;
          this.updateProduct(product);
          return product;
        })
      );
  }

  filterItems(parameter: any): Observable<any> {
    return this.listProducts().pipe((map((data: any) => {

      let blankArray: any[] = [...data];

      // tslint:disable-next-line:forin
      for (const i in parameter) {
        let item: any = [...blankArray];
        item = item.filter(f => {
          return f[`${i}`].toLowerCase().includes(parameter[i].toLowerCase());
        });
        blankArray = item;
      }
      if (blankArray.length > 0) {
        return blankArray;
      } else {
        return null;
      }
    })));
  }

  listProducts(): Observable<ProductoModel[]> {
    return this.http.get(`${environment.inventoryDB}/productos.json`).pipe(
      map(this.formatArray)
    );
  }

  // tslint:disable-next-line:typedef
  updateProduct(product: ProductoModel) {
    const productID = product.id;
    return this.http.put(`${environment.inventoryDB}/productos/${productID}.json`, product);
  }

  updateProductImage(image: ProductoFileModel, product: ProductoModel): void {
    const storageRef = firebase.storage().ref();
    const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${image.nombreArchivo}`).put(image.archivo);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      }, (error) => {
        console.log('Error al subir', error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          product.imagenUrl = url;
          this.updateProduct(product).subscribe();
        });
      });
  }

  // tslint:disable-next-line:typedef
  private formatArray(productsResp: object) {
    const products: any[] = [];
    Object.keys(productsResp).forEach(k => {
      const product: any = productsResp[k];
      products.push(product);
    });
    if (productsResp === null) {
      return [];
    }
    return products;
  }
}
