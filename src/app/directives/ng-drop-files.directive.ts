import {
  Directive, EventEmitter, ElementRef,
  HostListener, Input, Output
} from '@angular/core';
import {ProductoFileModel} from '@app/models/productoFile.model';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() productFiles: ProductoFileModel[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any): void {
    this.mouseOver.emit(true);
    this.preventStop(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any): void {
    this.mouseOver.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any): void {
    const transference = this.getTransference(event);
    if (!transference) {
      return;
    }
    this.extractFiles(transference.files);
    this.preventStop(event);
    this.mouseOver.emit(false);
  }

  // tslint:disable-next-line:typedef
  private getTransference(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  // tslint:disable-next-line:typedef
  private extractFiles(imagesList: FileList) {
    // tslint:disable-next-line:forin
    for (const property in Object.getOwnPropertyNames(imagesList)) {
      const temporalFile = imagesList[property];
      if (this.fileCanBeLoaded(temporalFile)) {
        const newFile = new ProductoFileModel(temporalFile);
        this.productFiles.push(newFile);
      }
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

  // tslint:disable-next-line:typedef
  private preventStop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private fileDropped(fileName: string): boolean {
    for (const file of this.productFiles) {
      if (file.nombreArchivo === fileName) {
        console.log('Ya existe' + fileName);
        return true;
      }
    }

    return false;
  }

  private isImage(typeFile: string): boolean {
    return (typeFile === '' || typeFile === undefined) ? false : typeFile.startsWith('image');
  }
}
