import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'registro-producto',
    loadChildren: () => import('@components/item-register/item-register.module.ts').then(m => m.ItemRegisterModule)
  },
  {
    path: 'registro-venta',
    loadChildren: () => import('@components/sale-register/sale-register.module.ts').then(m => m.SaleRegisterModule)
  },
  {
    path: 'panel-control',
    loadChildren: () => import('@components/control-panel/control-panel.module').then(m => m.ControlPanelModule)
  },
  {
    path: 'buscar-producto',
    loadChildren: () => import('@components/item-search/item-search.module').then(m => m.ItemSearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
