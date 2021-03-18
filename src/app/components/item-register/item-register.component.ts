import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  imagesFiles: ProductoFileModel[] = [];
  productImage: ProductoFileModel = null;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private productoService: ProductoService) {
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
    if (this.Form.valid && this.productImage) {
      const newForm: ProductoModel = {...this.Form.value};
      newForm.precio = Number(newForm.precio);
      newForm.stock = Number(newForm.stock);
    }
    /* this.productoService.registerProduct(this.Form.value).subscribe();*/
  }


  fileChanges(event): void {
    const transference = this.getTransference(event);
    if (!transference) {
      return;
    }
    this.extractFiles(transference.files);
    this.preventStop(event);
  }

  // VALIDADORES DE IMAGENES

  // tslint:disable-next-line:typedef
  private getTransference(event: any) {
    return event.target;
  }

  // tslint:disable-next-line:typedef
  private extractFiles(imagesList: FileList) {
    const temporalFile = imagesList[0];
    const newFile = new ProductoFileModel(temporalFile);
    this.imagesFiles[0] = newFile;
    this.productImage = newFile;
    console.log(this.productImage);
  }

  // VALIDATORS

  private fileCanBeLoaded(document: File): boolean {
    if (!this.fileDropped(document.name) && this.isImage(document.type)) {
      return true;
    } else {
      return false;
    }
  }

  // tslint:disable-next-line:typedef
  private preventStop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private fileDropped(fileName: string): boolean {
    if (this.imagesFiles[0].nombreArchivo === fileName) {
      return true;
    }
    return false;
  }

  private isImage(typeFile: string): boolean {
    return (typeFile === '' || typeFile === undefined) ? false : typeFile.startsWith('image');
  }
}
