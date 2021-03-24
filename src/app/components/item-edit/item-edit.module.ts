import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemEditRoutingModule } from './item-edit-routing.module';
import { ItemEditComponent } from './item-edit.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [ItemEditComponent],
  imports: [
    CommonModule,
    ItemEditRoutingModule,
    SharedModule
  ]
})
export class ItemEditModule { }
