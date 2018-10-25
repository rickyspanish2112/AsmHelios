import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CrmaccountmanagerAppComponent } from './crmaccountmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CrmaccountserviceService } from './services/crmaccountservice.service';

const routes: Routes = [
  {
    path: '', component: CrmaccountmanagerAppComponent,
    children: [
      { path: '', component: MainContentComponent }
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
    RouterModule.forChild(routes)
  ],
  providers: [
    CrmaccountserviceService
  ],
  declarations: [CrmaccountmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent
  ]
})
export class CrmaccountmanagerModule { }
