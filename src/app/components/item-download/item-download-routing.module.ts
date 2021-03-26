import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ItemDownloadComponent} from '@components/item-download/item-download.component';

const routes: Routes = [
  {
    path: '',
    component: ItemDownloadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemDownloadRoutingModule {
}
