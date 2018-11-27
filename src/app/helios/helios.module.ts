import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {NgxMaskModule} from 'ngx-mask';

import { HeliosComponent } from './helios.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CrmaccountserviceService } from './services/crmaccountservice.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AddressesComponent } from './components/addresses/addresses.component';
import { NewAccountDialogComponent } from './components/new-account-dialog/new-account-dialog.component';
import { NewAddressDialogComponent } from './components/new-address-dialog/new-address-dialog.component';
import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CdsDeclarationComponent } from './components/cds-declaration/cds-declaration.component';
import { DeclarationService } from './services/declaration.service';

const routes: Routes = [
  {
    path: '', component: HeliosComponent,
    children:
    [
      { path: 'account', component: MainContentComponent },
      { path: 'addresses', component: AddressesComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'declarations', component: CdsDeclarationComponent },
      { path: '', component: MainContentComponent },
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    NgxMaskModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forChild(),
    ReactiveFormsModule
  ],
  providers: [
    CrmaccountserviceService,
    DeclarationService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  declarations: [HeliosComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    AddressesComponent,
    NewAccountDialogComponent,
    NewAddressDialogComponent,
    NewContactDialogComponent,
    ContactsComponent,
    CdsDeclarationComponent
  ],
  entryComponents: [
    NewAccountDialogComponent,
    NewAddressDialogComponent,
    NewContactDialogComponent
  ]
})
export class HeliosModule { }
