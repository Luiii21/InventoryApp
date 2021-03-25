import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemSearchRoutingModule } from './item-search-routing.module';
import { ItemSearchComponent } from './item-search.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { SearchDisplayComponent } from './search-display/search-display.component';
import {SharedModule} from '@shared/shared.module';
import {PaginationModule} from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [ItemSearchComponent, SearchPanelComponent, SearchDisplayComponent],
    imports: [
        CommonModule,
        ItemSearchRoutingModule,
        SharedModule,
        PaginationModule
    ]
})
export class ItemSearchModule { }
