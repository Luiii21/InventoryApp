import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductoService} from '@app/services/producto.service';
import {ProductoModel} from '@app/models/producto.model';
import {SalesService} from '@app/services/sales.service';

@Component({
  selector: 'app-sale-register',
  templateUrl: './sale-register.component.html',
  styleUrls: ['./sale-register.component.scss']
})
export class SaleRegisterComponent implements OnInit {
  errorText: string;
  Form: FormGroup;
  productList: ProductoModel[];

  constructor(private fb: FormBuilder, private productoService: ProductoService, private salesService: SalesService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.Form = this.fb.group(
      {
        numeroVenta: [null, [Validators.required, Validators.minLength(5)]],
        tienda: [null],
        productoId: [{value: null, disabled: true}, Validators.required],
        cantidad: [null, Validators.required],
        metodoPago: [null, Validators.required],
        tarjeta: [{value: null, disabled: true}],
        totalPago: [null, Validators.required]
      }
    );
  }

  getItems(): void {
    this.Form.get('productoId').disable();
    this.productList = [];
    this.productoService.filterItems({tienda: this.Form.get('tienda').value}).subscribe(resp => {
      this.productList = resp;
      if (this.productList) {
        this.Form.get('productoId').enable();
      }
    });
  }

  registerSale(): void {
    if (this.Form.valid) {
      const newFormProduct = {...this.gettingStock(this.Form.get('productoId').value)};
      const newForm = {...this.Form.value};
      newFormProduct.stock = newFormProduct.stock - this.Form.get('cantidad').value;
      const updateStock = this.gettingStock(this.Form.get('productoId').value);

      if (newFormProduct.stock === 0) {
        newFormProduct.disponibilidad = false;
        this.productoService.updateProduct(newFormProduct).subscribe();
        updateStock.stock = newFormProduct.stock;
        this.salesService.registerSale(newForm).subscribe();
        this.Form.reset();
      }
      if (newFormProduct.stock > 0) {
        this.productoService.updateProduct(newFormProduct).subscribe();
        updateStock.stock = newFormProduct.stock;
        this.salesService.registerSale(newForm).subscribe();
        this.Form.reset();
      }

      if (newFormProduct.stock < 0) {
        this.errorText = 'Error al actualizar stock, intentelo de nuevo.';
      }
    }
  }

  // tslint:disable-next-line:typedef
  private gettingStock(id: string) {
    const index = this.productList.findIndex(i => i.id === id);
    return this.productList[index];
  }

  enableCard(): void {
    this.Form.get('tarjeta').disable();
    this.Form.get('tarjeta').reset();
    if (this.Form.get('metodoPago').value === 'tarjeta') {
      this.Form.get('tarjeta').enable();
    }
  }
}
