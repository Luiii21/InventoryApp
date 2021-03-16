import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-item-register',
  templateUrl: './item-register.component.html',
  styleUrls: ['./item-register.component.scss']
})
export class ItemRegisterComponent implements OnInit {
  Form: FormGroup;

  constructor(private fb: FormBuilder) {
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
        tamano: [null, [Validators.required]]
      }
    );
  }

  registerProduct(): void {
    console.log(this.Form.value);
  }
}
