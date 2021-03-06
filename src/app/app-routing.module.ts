import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ItemDownloadModule} from '@components/item-download/item-download.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'buscar-producto',
    loadChildren: () => import('@components/item-search/item-search.module').then(m => m.ItemSearchModule)
  },
  {
    path: 'editar-producto',
    loadChildren: () => import('@components/item-edit/item-edit.module').then(m => m.ItemEditModule)
  },
  {
    path: 'descargar-registros',
    loadChildren: () => import('@components/item-download/item-download.module').then(m => ItemDownloadModule)
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
