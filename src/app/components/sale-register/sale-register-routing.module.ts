import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SaleRegisterComponent} from '@components/sale-register/sale-register.component';

const routes: Routes = [
  {
    path: '',
    component: SaleRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRegisterRoutingModule {
}
