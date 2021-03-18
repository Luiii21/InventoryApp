import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductoService} from '@app/services/producto.service';
import {ProductoModel} from '@app/models/producto.model';
import {ProductoFileModel} from '@app/models/productoFile.model';

@Component({
  selector: 'app-item-register',
  templateUrl: './item-register.component.html',
  styleUrls: ['./item-register.component.scss']
})
export class ItemRegisterComponent implements OnInit {
  Form: FormGroup;
  productFiles: ProductoFileModel[] = [];
  isOverDrop = false;

  constructor(private fb: FormBuilder, private productoService: ProductoService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.Form = this.fb.group(
      {
        tienda: [null, [Validators.required, Validators.min(1), Validators.max(3)]],
        tipo: [null, Validators.required],
        precio: [null, [Validators.required, Validators.min(1)]],
        nombre: [null, [Validators.required, Validators.minLength(5)]],
        marca: [null, [Validators.required]],
        genero: [null, [Validators.required]],
        color: [null, [Validators.required]],
        tamano: [null, [Validators.required]],
        stock: [null, [Validators.required, Validators.min(1)]]
      }
    );
  }

  saveProduct(): void {
    if (this.Form.valid) {
      const newForm: ProductoModel = {...this.Form.value};
      newForm.precio = Number(newForm.precio);
      newForm.stock = Number(newForm.stock);
    }
    /* this.productoService.registerProduct(this.Form.value).subscribe();*/
  }

  uploadImage(): void {
    this.productoService.loadImage(this.productFiles);
  }

  test(event): void {
    console.log(event);
  }
}
