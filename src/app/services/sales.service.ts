import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProductoModel} from '@app/models/producto.model';
import {map} from 'rxjs/operators';
import {SaleModel} from '@app/models/sale.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  registerSale(product: SaleModel): Observable<any>{
    return this.http.post(`${environment.inventoryDB}/ventas.json`, product);
  }
}
