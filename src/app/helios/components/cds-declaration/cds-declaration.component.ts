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
  declarationTypes: Declarationtype[] = [];
  badges: Badge[] = [];
  selectedBadge: Badge;

  displayTypes: boolean;
  panelOpenState: false;
  errorMessage: string;

  customCollapsedHeight = '40px';
  customExpandedHeight = '40px';
  TraderReferenceValue = '';
  ImporterShortCode = '';
  ImporterAccountName = '';
  ExporterShortCode = '';
  ExporterAccountName = '';
  DeclarantAccountName = '';
  DeclarantShortCode = '';
  RepresentitiveShortCode = '';
  RepresentitiveAccountName = '';
  SellerShortCode = '';
  SellerAccountName = '';
  BuyerShortCode = '';
  BuyerAccountName = '';

  constructor(
    private declarationService: DeclarationService,
    private store: Store<fromDeclaraionType.State>
  ) {}

  ngOnInit() {
    this.store
      .pipe(select(fromDeclaraionType.getCurrentBadge))
      .subscribe(selectedBadge =>
        this.doSetSelectedBadgeChanged(selectedBadge)
      );

    this.store
      .pipe(select(fromDeclaraionType.getDisplayDeclarationType))
      .subscribe(
        displayDeclarationTypes => (this.displayTypes = displayDeclarationTypes)
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
    console.log('About to dispatch toggle Display Declaration Types');
    this.store.dispatch(
      new fromDeclarationTypeActions.ToggleDeclarationTypes(value)
    );
  }

  doSetSelectedBadgeChanged(selectedBadge: Badge) {
    if (selectedBadge === null) {
      return null;
    }
    console.log(
      'About to set selected badge on view. Selected badge code: ' +
        [selectedBadge.code]
    );
    this.selectedBadge = selectedBadge;
  }

  onChange(event) {
    if (event.isUserInput) {
      console.log(
        'The following badge has been selected: ' + event.source.value
      );

      this.selectedBadge = this.badges.find(b => b.code === event.source.value);

      if (this.selectedBadge.code === 'undefined') {
        console.log('No badge found matching code: ' + event.source.value);
        return;
      }

      console.log('Found badge matching code: ' + this.selectedBadge.code);

      console.log('About to dispatch data to SetCurrentBadge action:');
      this.store.dispatch(
        new fromDeclarationTypeActions.SetCurrentBadge(this.selectedBadge)
      );
    }
  }
}
