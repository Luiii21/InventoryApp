import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRegisterRoutingModule } from './item-register-routing.module';
import { ItemRegisterComponent } from './item-register.component';


@NgModule({
  declarations: [ItemRegisterComponent],
  imports: [
    CommonModule,
    ItemRegisterRoutingModule
  ]
})
export class ItemRegisterModule { }
