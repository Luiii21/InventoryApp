import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemDownloadRoutingModule } from './item-download-routing.module';
import { ItemDownloadComponent } from './item-download.component';


@NgModule({
  declarations: [ItemDownloadComponent],
  imports: [
    CommonModule,
    ItemDownloadRoutingModule
  ]
})
export class ItemDownloadModule { }
