import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemSearchRoutingModule } from './item-search-routing.module';
import { ItemSearchComponent } from './item-search.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { SearchDisplayComponent } from './search-display/search-display.component';


@NgModule({
  declarations: [ItemSearchComponent, SearchPanelComponent, SearchDisplayComponent],
  imports: [
    CommonModule,
    ItemSearchRoutingModule
  ]
})
export class ItemSearchModule { }
