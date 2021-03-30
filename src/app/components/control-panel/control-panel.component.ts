import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AttributesService} from '@app/services/attributes.service';
import {AtributosModel} from '@app/models/atributos.model';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  bodyParts = [{id: 'cabeza'}, {id: 'cuello'}, {id: 'pecho'}, {id: 'manos'}, {id: 'piernas'}, {id: 'pies'}];
  statusMessage: string = null;
  formColor: FormGroup;
  formTienda: FormGroup;
  formTipo: FormGroup;
  tableHeaders: any[];
  tableList: AtributosModel[];

  constructor(private fb: FormBuilder, private serviceAtributos: AttributesService) {
  }

  ngOnInit(): void {
    this.formsInit();
  }

  private formsInit(): void {
    this.formColor = this.fb.group(
      {
        id: [null, Validators.required],
        nombre: [null, Validators.required]
      }
    );

    this.formTienda = this.fb.group({
      id: [null, Validators.required],
      nombre: [null, Validators.required]
    });

    this.formTipo = this.fb.group({
      id: [null, Validators.required],
      nombre: [null, Validators.required],
      cuerpoZona: [null, Validators.required]
    });
  }

  saveAttribute(): void {
    if (this.formColor.valid) {
      const toSaveForm: AtributosModel = {...this.formColor.value};
      toSaveForm.id.toLowerCase();
      toSaveForm.activo = true;
      this.serviceAtributos.registerAttribute(toSaveForm, 'atributoColores').subscribe();
    }
    if (this.formTienda.valid) {
      const toSaveForm: AtributosModel = {...this.formTienda.value};
      toSaveForm.id.toLowerCase();
      toSaveForm.activo = true;
      this.serviceAtributos.registerAttribute(toSaveForm, 'atributoTiendas').subscribe();
    }
    if (this.formTipo.valid) {
      const toSaveForm: AtributosModel = {...this.formTipo.value};
      toSaveForm.id.toLowerCase();
      toSaveForm.activo = true;
      this.serviceAtributos.registerAttribute(toSaveForm, 'atributoTipos').subscribe();
    }
  }

  listAttributes(db: string): void {
    this.tableHeaders = [];
    this.tableList = [];
    try {
      this.serviceAtributos.listAttributes(db).subscribe((resp: AtributosModel[]) => {
        if (resp !== null) {
          this.tableList = resp;
          Object.keys(this.tableList[0]).forEach(f => {
            this.tableHeaders.push(f);
            this.statusMessage = '';
          });
        } else {
          this.statusMessage = null;
        }
      });
    } catch (e) {
      this.tableHeaders = null;
      this.tableList = null;
      this.statusMessage = 'Error al traer datos';
    }
  }

  validatorEntryExists(element: string, list: any): boolean {
    const exists = list.filter(i => {
      return i.id === element && i.nombre === element;
    });

    return exists;
  }
}
