import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { NewAccountDialogComponent } from '../new-account-dialog/new-account-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
  }

  openAddAccountDialog(): void {
this.matDialog.open(NewAccountDialogComponent,
  {
    width: '450px'
  });

  }

}
