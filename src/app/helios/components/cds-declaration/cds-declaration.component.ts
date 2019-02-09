import { Component, OnInit } from '@angular/core';
import { DeclarationService } from '../../services/declaration.service';
import { Declarationtype } from '../../models/declarationtypes';
import { Badge } from '../../models/badges';

import * as fromDeclaraionType from '../../state/declaration-type.reducer';
import * as fromDeclarationTypeActions from '../../state/declaration-type.actions';


/* NgRx */
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-cds-declaration',
  templateUrl: './cds-declaration.component.html',
  styleUrls: ['./cds-declaration.component.scss']
})
export class CdsDeclarationComponent implements OnInit {

  // panelOpenState = false;
  errorMessage: string;
  declarationTypes: Declarationtype[] = [];
  badges: Badge[] = [];
  displayTypes: boolean;
  panelOpenState: false;

  customCollapsedHeight = '40px';
  customExpandedHeight = '40px';
  TraderReferenceValue = '';
  ImporterShortCode = '';
  ImorterAccountName = '';
  ExporterShortCode = '';
  ExporterAccountName = '';
  DeclarantAccountName = '';
  DeclarantShortCode = '';
  RepresentitiveShortCode = '';
  RepresentitiveAccountName = '';
  step = 0;



  constructor(private declarationService: DeclarationService, private store: Store<fromDeclaraionType.State>) { }

  ngOnInit() {

   this.store.pipe(select(fromDeclaraionType.getDisplayDeclarationType)).subscribe(
    displayDeclarationTypes => this.displayTypes = displayDeclarationTypes
   );

    this.declarationService.getAllDeclarationTypes().subscribe(
      data => {
        this.declarationTypes = data;
      },
      error => (this.errorMessage = <any>error)
    );

    this.declarationService.getAllBadges().subscribe(
      data => {
        this.badges = data;
      },
      error => (this.errorMessage = <any>error)
    );
  }

  checkChanged(value: boolean): void {
    console.log('About to dispatch toggle display declaration types');
    this.store.dispatch(new fromDeclarationTypeActions.ToggleDeclarationTypes(value));
  }
}
