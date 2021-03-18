import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';

// IMPORTS
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../../environments/environment';

// IMPORTS

import {NgDropFilesDirective} from '@app/directives/ng-drop-files.directive';

// FIREBASE
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';

@NgModule({
  declarations: [NavbarComponent, NgDropFilesDirective],
  exports: [
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    NgDropFilesDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ]
})
export class SharedModule {
}
