import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SaleRegisterRoutingModule} from './sale-register-routing.module';
import {SaleRegisterComponent} from './sale-register.component';

// IMPORTS
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [SaleRegisterComponent],
  imports: [
    CommonModule,
    SaleRegisterRoutingModule,
    SharedModule
  ]
})
export class SaleRegisterModule {
}
