import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';

// IMPORTS
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
