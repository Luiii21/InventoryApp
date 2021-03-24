import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ItemRegisterRoutingModule} from './item-register-routing.module';
import {ItemRegisterComponent} from './item-register.component';

// IMPORTS
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [ItemRegisterComponent],
    imports: [
        CommonModule,
        ItemRegisterRoutingModule,
        SharedModule
    ]
})
export class ItemRegisterModule {
}
