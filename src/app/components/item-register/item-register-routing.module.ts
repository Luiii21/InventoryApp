import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from '@components/home/home.component';
import {ItemRegisterComponent} from '@components/item-register/item-register.component';

const routes: Routes = [
  {
    path: '',
    component: ItemRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRegisterRoutingModule {
}
