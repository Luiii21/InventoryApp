import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductoService} from '@app/services/producto.service';
import {ProductoModel} from '@app/models/producto.model';
import {ProductoFileModel} from '@app/models/productoFile.model';
import {AtributosModel} from '@app/models/atributos.model';
import {AttributesService} from '@app/services/attributes.service';
import {AtributosLoaderModel} from '@app/models/atributosLoader.model';

@Component({
  selector: 'app-item-register',
  templateUrl: './item-register.component.html',
  styleUrls: ['./item-register.component.scss']
})
export class ItemRegisterComponent implements OnInit {
  Form: FormGroup;
  filePicked: string | ArrayBuffer;
  imagesFiles: ProductoFileModel[] = [];
  productImage: ProductoFileModel = null;
  loadingStatus: string;
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
    this.initLists();
  }

  createForm(): void {
    this.Form = this.fb.group(
      {
        tienda: [{value: null, disabled: true}, [Validators.required, Validators.min(1), Validators.max(3)]],
        tipo: [{value: null, disabled: true}, Validators.required],
        precio: [null, [Validators.required, Validators.minLength(1)]],
        nombre: [null, [Validators.required, Validators.minLength(5)]],
        marca: [null, [Validators.required]],
        genero: [null, [Validators.required]],
        color: [{value: null, disabled: true}, [Validators.required]],
        tamano: [null, [Validators.required]],
        stockInicial: [null, [Validators.required, Validators.min(1)]],
        disponibilidad: [true],
        creacionFecha: [this.dateFormat()]
      }
    );
  }

  saveProduct(): void {
    this.loadingStatus = 'Cargando';
    if (this.Form.valid && this.productImage) {
      this.Form.disable();
      const newForm: ProductoModel = {...this.Form.value};
      newForm.stockInicial = Number(newForm.stockInicial);
      newForm.stockActual = Number(newForm.stockInicial);
      this.productoService.registerProduct(newForm).subscribe();
      this.productoService.updateProductImage(this.productImage, newForm);
      this.loadingStatus = 'Registro completado';
      setTimeout(() => {
        this.Form.reset([]);
        this.filePicked = null;
        this.productImage = null;
        this.Form.enable();
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

  // VALIDADORES

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
      this.Form.get('color').enable();
    });
    this.serviceAttributes.listAttributes('atributoTiendas').subscribe(resp => {
      this.listTiendas = resp;
      this.Form.get('tienda').enable();
    });
    this.serviceAttributes.listAttributes('atributoTipos').subscribe(resp => {
      this.listTipos = resp;
      this.Form.get('tipo').enable();
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
