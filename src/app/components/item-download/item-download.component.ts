import {Component, OnInit} from '@angular/core';
import {ProductoModel} from '@app/models/producto.model';
import {SaleModel} from '@app/models/sale.model';
import {ProductoService} from '@app/services/producto.service';
import {SalesService} from '@app/services/sales.service';
import {ExportExcelService} from '@app/services/export-excel.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-item-download',
  templateUrl: './item-download.component.html',
  styleUrls: ['./item-download.component.scss']
})
export class ItemDownloadComponent implements OnInit {
  inputDbs: [{ value: 'productos' }, { value: 'ventas' }];
  Form: FormGroup;
  listFields: any[] = [];
  listExport: any[] = [];

  constructor(private fb: FormBuilder,
              private serviceExcel: ExportExcelService,
              private serviceProducto: ProductoService,
              private serviceVentas: SalesService) {
  }

  ngOnInit(): void {
    this.Form = this.fb.group({
      tabla: [null]
    });
  }

  exportToExcel(): void {
    const toExcel = [...this.listExport];
    toExcel.forEach(product => {
      delete product.imagenUrl;
      delete product.id;
    });
    const date = new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear();
    this.serviceExcel.exportExcel(toExcel, 'inventario-' + this.Form.get('tabla').value + + date);
  }

  listAttributes(): void {
    this.listFields = [];
    this.listExport = null;

    const form = {...this.Form.value};
    if (form.tabla && form.tabla === 'productos') {
      this.serviceProducto.listProducts().subscribe((resp: ProductoModel[]) => {
        resp.forEach(i => {
          delete i.imagenUrl;
          delete i.id;
        });
        this.listExport = resp;
        Object.keys(this.listExport[0]).forEach(f => {
          this.listFields.push(f);
        });
      });
    }

    if (form.tabla && form.tabla === 'ventas') {
      this.serviceVentas.listSales().subscribe((resp: SaleModel[]) => {
        resp.forEach(i => {
          delete i.productoId;
        });
        this.listExport = resp;
        Object.keys(this.listExport[0]).forEach(f => {
          this.listFields.push(f);
        });
      });
    }
  }
}
