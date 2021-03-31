import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductoModel} from '@app/models/producto.model';
import {ProductoFileModel} from '@app/models/productoFile.model';
import {ProductoService} from '@app/services/producto.service';
import {AttributesService} from '@app/services/attributes.service';
import {AtributosModel} from '@app/models/atributos.model';
import {AtributosLoaderModel} from '@app/models/atributosLoader.model';

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
  filePicked: string | ArrayBuffer;
  listTiendas: AtributosModel[] = [];
  listColores: AtributosModel[] = [];
  listTipos: AtributosModel[] = [];
  listGeneros = [];

  constructor(private fb: FormBuilder,
              private classAttributes: AtributosLoaderModel,
              private productoService: ProductoService,
              private serviceAttributes: AttributesService) {
    this.listGeneros = this.classAttributes.genderList;
  }

  ngOnInit(): void {
    this.createForm();
    this.Form.disable();
    this.initLists();
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
    this.Form.disable();
    this.editForm.get('productoId').reset();
    this.loadingStatus = 'loading-products';
    this.disableImage = true;
    this.selectedProduct = null;
    this.filePicked = null;
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
    const selectedProduct = this.productList.filter(p => p.id === this.editForm.get('productoId').value)[0];
    this.selectedProduct = selectedProduct;
    this.disableImage = false;
    this.Form.reset(selectedProduct);
    this.Form.enable();
  }

  saveProduct(): void {
    const newForm = {...this.Form.value};
    if (this.Form.valid || this.productImage) {
      newForm.id = this.selectedProduct.id;
      newForm.creacionFecha = this.selectedProduct.creacionFecha;
      newForm.imagenUrl = this.selectedProduct.imagenUrl;
      if (!this.Form.pristine) {
        this.loadingStatus = 'Cargando';
        this.Form.disable();
        newForm.stockInicial = Number(newForm.stockInicial);
        newForm.stockActual = Number(newForm.stockActual);
        newForm.updateFecha = this.dateFormat();
        this.productoService.updateProduct(newForm).subscribe();
        this.loadingStatus = 'Actualización completada';
      }

      if (this.productImage) {
        this.loadingStatus = 'Cargando';
        this.Form.disable();
        this.productoService.updateProductImage(this.productImage, newForm);
        this.loadingStatus = 'Actualización completada';
      }

      setTimeout(() => {
        this.Form.reset([]);
        this.editForm.reset([]);
        this.filePicked = null;
        this.productImage = null;
        this.loadingStatus = '';
      }, 2000);
    }
  }

  loadImage(event): void {
    this.readURL(event);
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

  private readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.filePicked = reader.result;

      reader.readAsDataURL(file);
    }
  }

  private initLists(): void {
    this.serviceAttributes.listAttributes('atributoColores').subscribe(resp => {
      this.listColores = resp;
    });
    this.serviceAttributes.listAttributes('atributoTiendas').subscribe(resp => {
      this.listTiendas = resp;
    });
    this.serviceAttributes.listAttributes('atributoTipos').subscribe(resp => {
      this.listTipos = resp;
    });
  }

  setCharType(): string {
    if (this.Form.get('tipo').value) {
      const list: AtributosModel[] = this.listTipos.filter(i => {
        return i.id === this.Form.get('tipo').value;
      });

      return list[0].cuerpoZona;
    }
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
