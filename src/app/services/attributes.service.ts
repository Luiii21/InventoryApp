import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductoModel} from '@app/models/producto.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AtributosModel} from '@app/models/atributos.model';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(private http: HttpClient) {
  }

  registerAttribute(attribute: AtributosModel, db: string): Observable<AtributosModel> {
    return this.http.post(`${environment.inventoryDB}/${db}.json`, attribute)
      .pipe(
        map((resp: any) => {
          attribute.id = resp.name;
          this.updateAttribute(attribute, db).subscribe();
          return attribute;
        })
      );
  }

  updateAttribute(attribute: AtributosModel, db: string): Observable<any> {
    const attributeId = attribute.id;
    return this.http.put(`${environment.inventoryDB}/${db}/${attributeId}.json`, attribute);
  }

  listAttributes(db: string): Observable<AtributosModel[]> {
    return this.http.get(`${environment.inventoryDB}/${db}.json`).pipe(
      map(this.formatArray)
    );
  }

  private formatArray(productsResp: object): boolean | any {
    const products: any[] = [];
    if (productsResp !== null) {
      Object.keys(productsResp).forEach(k => {
        const product: any = productsResp[k];
        products.push(product);
      });
    } else {
      return null;
    }
    return products;
  }
}
