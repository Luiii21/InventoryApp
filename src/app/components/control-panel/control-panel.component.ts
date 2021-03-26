import {Component, OnInit} from '@angular/core';
import {ExportExcelService} from '@app/services/export-excel.service';
import {ProductoService} from '@app/services/producto.service';
import {ProductoModel} from '@app/models/producto.model';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  actualDate: string = new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear();
  productList: ProductoModel[] = [];

  // tslint:disable-next-line:variable-name
  constructor(private __exportExcel: ExportExcelService, private __productos: ProductoService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  exportToExcel(): void {
    const toExcel = [...this.productList];
    toExcel.forEach( product => {
      delete product.imagenUrl;
      delete product.id;
    });
    this.__exportExcel.exportExcel(toExcel, 'inventario' + this.actualDate);
  }

  getProducts(): void {
    this.__productos.listProducts().subscribe(resp => {
      this.productList = resp;
    });
  }
}
