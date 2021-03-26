import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SaleModel} from '@app/models/sale.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) {
  }

  registerSale(product: SaleModel): Observable<any> {
    return this.http.post(`${environment.inventoryDB}/ventas.json`, product);
  }

  listSales(): Observable<SaleModel[]> {
    return this.http.get(`${environment.inventoryDB}/ventas.json`).pipe(
      map(this.formatArray)
    );
  }

  private formatArray(productsResp: object): SaleModel[] {
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
