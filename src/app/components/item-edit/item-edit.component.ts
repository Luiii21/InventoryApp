import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductoModel} from '@app/models/producto.model';
import {ProductoFileModel} from '@app/models/productoFile.model';
import {ProductoService} from '@app/services/producto.service';
import {Router} from '@angular/router';
import {deepEqual} from 'assert';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {
  editForm: FormGroup;
  imagesFiles: ProductoFileModel[] = [];
  disableImage = true;
  Form: FormGroup;
  productImage: ProductoFileModel = null;
  productList: ProductoModel[];
  selectedProduct: ProductoModel = null;
  loadingStatus: string;

  constructor(private fb: FormBuilder, private productoService: ProductoService, private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
    this.Form.disable();
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
        stockInicial: [null, [Validators.required, Validators.min(1)]],
        stockActual: [null, [Validators.required, Validators.min(1)]],
        disponibilidad: [null, Validators.required],
        updateFecha: [null]
      }
    );

    this.editForm = this.fb.group(
      {
        tienda: [null],
        productoId: [{value: null, disabled: true}, Validators.required],
      }
    );
  }

  getItems(): void {
    this.editForm.get('productoId').disable();
    this.Form.reset();
    this.editForm.get('productoId').reset();
    this.loadingStatus = 'loading-products';
    this.productList = [];
    this.productoService.filterItems({tienda: this.editForm.get('tienda').value}).subscribe(resp => {
      this.productList = resp;
      if (this.productList) {
        this.editForm.get('productoId').enable();
      }
    });
    this.loadingStatus = '';
  }

  setProductToEdit(): void {
    this.Form.reset();
    this.Form.disable();
    this.disableImage = true;
    const selectedProduct = this.productList.filter(p => p.id === this.editForm.get('productoId').value)[0];
    this.selectedProduct = selectedProduct;
    this.disableImage = false;
    console.log(selectedProduct);
    this.Form.reset(selectedProduct);
    this.Form.enable();
  }

  saveProduct(): void {
    const newForm = {...this.Form.value};
    if (this.Form.valid || this.productImage) {
      newForm.id = this.selectedProduct.id;
      newForm.creacionFecha = this.selectedProduct.creacionFecha;
      if (!this.Form.pristine) {
        this.loadingStatus = 'Cargando';
        this.Form.disable();
        newForm.precio = Number(newForm.precio);
        newForm.stockInicial = Number(newForm.stockInicial);
        newForm.stockActual = Number(newForm.stockActual);
        newForm.updateFecha = this.dateFormat();
        this.productoService.updateProduct(newForm).subscribe();
        this.loadingStatus = 'Actualización completada';
      }

      if (!this.productImage) {
        newForm.imagenUrl = this.selectedProduct.imagenUrl;
      } else {
        this.loadingStatus = 'Cargando';
        this.Form.disable();
        this.productoService.updateProductImage(this.productImage, newForm);
      }

      setTimeout(() => {
        this.Form.reset([]);
        this.editForm.reset([]);
        this.productImage = null;
        this.Form.enable();
        this.loadingStatus = '';
      }, 2000);
    }
  }

  loadImage(event): void {
    const transference = this.getTransference(event);
    if (!transference) {
      return;
    }
    this.extractFiles(transference.files);
  }

  // VALIDADORES DE IMAGENES

  private dateFormat(): string {
    const date = new Date();
    return String(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
  }

  // tslint:disable-next-line:typedef
  private getTransference(event: any) {
    return event.target;
  }

  // tslint:disable-next-line:typedef
  private extractFiles(imagesList: FileList) {
    const temporalFile = imagesList[0];
    if (this.fileCanBeLoaded(temporalFile)) {
      const newFile = new ProductoFileModel(temporalFile);
      this.imagesFiles[0] = newFile;
      this.productImage = newFile;
    }
  }

  // VALIDATORS
  private fileCanBeLoaded(document: File): boolean {
    if (!this.fileDropped(document.name) && this.isImage(document.type)) {
      return true;
    } else {
      return false;
    }
  }

  private fileDropped(fileName: string): boolean {
    if (this.imagesFiles[0] && this.imagesFiles[0].nombreArchivo === fileName) {
      return true;
    }
    return false;
  }

  private isImage(typeFile: string): boolean {
    return (typeFile === '' || typeFile === undefined) ? false : typeFile.startsWith('image');
  }

}
