import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductoService} from '@app/services/producto.service';
import {ProductoModel} from '@app/models/producto.model';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  @Output() clothesList: EventEmitter<any>;
  Clothes: ProductoModel[] = [];
  colorList = [{value: 'azul'}, {value: 'rojo'}, {value: 'verde'}];
  Form: FormGroup;
  typesList = [{value: 'abrigo'}, {value: 'pantalones'}, {value: 'zapatos'}];
  tiendaList = [{nombre: 'Tienda 1', value: 'tienda1'}, {nombre: 'Tienda 2', value: 'tienda2'}, {nombre: 'Tienda 3', value: 'tienda3'}];
  genderList = [
    {nombre: 'Hombre', value: 'hombre'},
    {nombre: 'Mujer', value: 'mujer'},
    {nombre: 'Niño', value: 'nino'},
    {nombre: 'Niña', value: 'nina'}];

  constructor(private productoService: ProductoService,
              private fb: FormBuilder) {
    this.clothesList = new EventEmitter<{ data: ProductoModel[], status: string }>();
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllClothes();
  }

  initForm(): void {
    this.Form = this.fb.group({
      color: [null],
      genero: [null],
      nombre: [null],
      tipo: [null],
      tienda: [null]
    });
  }

  getAllClothes(): void {
    this.clothesList.emit({data: [], status: 'Loading'});
    this.productoService.listProducts().subscribe((clothes: ProductoModel[]) => {
      this.Clothes = clothes.filter(x => {
        return x.disponibilidad === true;
      });
      this.clothesList.emit({data: this.Clothes, status: 'Loaded'});
    });
  }

  searchClothes(): void {
    const newForm = {...this.Form.value};
    for (const i in newForm) {
      if (!newForm[i]) {
        this.Form.setErrors({vacio: true});
        delete newForm[i];
      }
    }

    this.productoService.filterItems(newForm).subscribe((clothes: ProductoModel[]) => {
      if (clothes !== null) {
        const availableClothes = clothes.filter(x => {
          return x.disponibilidad === true;
        });

        if (availableClothes !== null && availableClothes.length !== 0) {
          this.clothesList.emit({data: availableClothes, status: 'Loaded'});
        } else {
          this.clothesList.emit({data: [], status: 'error'});
        }
      } else {
        this.clothesList.emit({data: [], status: 'error'});
      }
    });
  }

  orderLowerHigher(): void {
    if (this.Clothes) {
      // @ts-ignore
      this.Clothes.sort((a, b) => {
        return a.precio - b.precio;
      });
      this.clothesList.emit({data: this.Clothes, status: 'Loaded'});
    }
  }

  orderHigherLower(): void {
    if (this.Clothes) {
      // @ts-ignore
      this.Clothes.sort((a, b) => {
        return b.precio - a.precio;
      });
      this.clothesList.emit({data: this.Clothes, status: 'Loaded'});
    }
  }

  resetFilter(): void {
    this.Clothes = [];
    this.Form.reset([]);
    this.getAllClothes();
  }
}
