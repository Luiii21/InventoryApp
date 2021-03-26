import {Component, OnInit} from '@angular/core';
import {ProductoModel} from '@app/models/producto.model';
import {SaleModel} from '@app/models/sale.model';

@Component({
  selector: 'app-item-download',
  templateUrl: './item-download.component.html',
  styleUrls: ['./item-download.component.scss']
})
export class ItemDownloadComponent implements OnInit {
  listProducts: ProductoModel[] = [];
  listSales: SaleModel[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
