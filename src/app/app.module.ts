import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {NgxMaskModule} from 'ngx-mask';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import {StoreModule} from '@ngrx/store';

const routes: Routes = [
  { path: 'helios',
   loadChildren: './helios/helios.module#HeliosModule' }, // Lazy loading of account manager module
  { path: 'demo', loadChildren: './demo/demo.module#DemoModule' }, // Lazy loading of demo module
  { path: '**', redirectTo: 'helios' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    NgxMaskModule.forRoot(),
    StoreModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
