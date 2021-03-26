import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemDownloadRoutingModule } from './item-download-routing.module';
import { ItemDownloadComponent } from './item-download.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [ItemDownloadComponent],
    imports: [
        CommonModule,
        ItemDownloadRoutingModule,
        SharedModule
    ]
})
export class ItemDownloadModule { }
