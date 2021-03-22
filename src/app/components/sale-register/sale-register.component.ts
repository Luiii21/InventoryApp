import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductoService} from '@app/services/producto.service';
import {ProductoModel} from '@app/models/producto.model';

@Component({
  selector: 'app-sale-register',
  templateUrl: './sale-register.component.html',
  styleUrls: ['./sale-register.component.scss']
})
export class SaleRegisterComponent implements OnInit {
  errorText: string;
  Form: FormGroup;
  productList: ProductoModel[];

  constructor(private fb: FormBuilder, private productoService: ProductoService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getItems();
  }

  createForm(): void {
    this.Form = this.fb.group(
      {
        numeroVenta: [null, [Validators.required, Validators.minLength(5)]],
        producto: [{value: null, disabled: (this.productList)}, Validators.required],
        cantidad: [null, Validators.required]
      }
    );
  }

  getItems(): void {
    this.productList = [];
    this.productoService.listProducts().subscribe(resp => {
      this.productList = resp;
    });
  }

  registerSale(): void {
    if (this.Form.valid) {
      const newForm = {...this.gettingStock(this.Form.get('producto').value)};
      newForm.stock = newForm.stock - this.Form.get('cantidad').value;
      const updateStock = this.gettingStock(this.Form.get('producto').value);

      if (newForm.stock === 0) {
        newForm.disponibilidad = false;
        this.productoService.updateProduct(newForm).subscribe();
        updateStock.stock = newForm.stock;
        this.Form.reset();
      }
      if (newForm.stock > 0) {
        this.productoService.updateProduct(newForm).subscribe();
        updateStock.stock = newForm.stock;
        this.Form.reset();
      }

      if (newForm.stock < 0) {
        this.errorText = 'Error al actualizar stock, intentelo de nuevo.';
      }
    }
  }

  // tslint:disable-next-line:typedef
  private gettingStock(id: string) {
    const index = this.productList.findIndex(i => i.id === id);
    return this.productList[index];
  }
}
