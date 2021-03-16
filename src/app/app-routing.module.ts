import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'registro-producto',
    loadChildren: () => import('./components/item-register/item-register.module').then(m => m.ItemRegisterModule)
  },
  {
    path: 'panel-control',
    loadChildren: () => import('./components/control-panel/control-panel.module').then(m => m.ControlPanelModule)
  },
  {
    path: 'buscar-producto',
    loadChildren: () => import('./components/control-panel/control-panel.module').then(m => m.ControlPanelModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
