import { Component, OnInit } from '@angular/core';

import { DeclarationService } from '../../services/declaration.service';
import { Declarationtype } from '../../models/declarationtypes';
import { Badge } from '../../models/badges';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromDeclaraionType from '../../state/declaration-type.reducer';
import * as fromDeclarationTypeActions from '../../state/declaration-type.actions';

@Component({
  selector: 'app-cds-declaration',
  templateUrl: './cds-declaration.component.html',
  styleUrls: ['./cds-declaration.component.scss']
})
export class CdsDeclarationComponent implements OnInit {
 //#region Properties

  declarationTypes: Declarationtype[] = [];
  selectedDeclarationType: Declarationtype;

  badges: Badge[] = [];
  selectedBadge: Badge;

  displayTypes: boolean;
  panelOpenState: false;
  errorMessage: string;

  customCollapsedHeight = '40px';
  customExpandedHeight = '40px';
  traderReferenceValue = '';
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

  //#endregion

  //#region Constructor
  constructor(
    private declarationService: DeclarationService,
    private store: Store<fromDeclaraionType.State>
  ) {}
  //#endregion

  //#region OnInit
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

    this.store
      .pipe(select(fromDeclaraionType.getTraderReference))
      .subscribe(
        traderReference => (this.traderReferenceValue = traderReference)
      );

      this.store
      .pipe(select(fromDeclaraionType.getCurrentDeclarationType))
      .subscribe(selectedType =>
        this.doSetSelectedDeclarationTypeChanged(selectedType)
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

  //#endregion

  //#region Methods
  checkChanged(value: boolean): void {
    console.log('About to dispatch toggle Display Declaration Types');
    this.store.dispatch(
      new fromDeclarationTypeActions.ToggleDeclarationTypes(value)
    );
  }

  onSelecedBadgeCodeChange(event) {
    if (!event.isUserInput) {
      return null;
    }

    this.selectedBadge = this.badges.find(b => b.code === event.source.value);

    if (this.selectedBadge == null) {
      console.log('No badge found matching code ' + event.source.value);
      return;
    }

    console.log('Found badge matching code: ' + this.selectedBadge.code);

    console.log('About to dispatch data to SetCurrentBadge action:');
    this.store.dispatch(
      new fromDeclarationTypeActions.SetCurrentBadge(this.selectedBadge)
    );
  }

  onSelectedDeclarationTypeChange(event) {
    if (!event.isUserInput) {
      return null;
    }
    this.selectedDeclarationType = this.declarationTypes.find(b => b.value === event.source.value);

    console.log('About to dispatch Set Trader Reference: ' + this.selectedDeclarationType.value);

    this.store.dispatch(
      new fromDeclarationTypeActions.SetDeclarationType(this.selectedDeclarationType)
    );

  }

  onBlurTraderReferenceChange(traderReference: string) {
    console.log('About to dispatch Set Trader Reference: ' + traderReference);

    this.store.dispatch(
      new fromDeclarationTypeActions.SetTraderReference(traderReference)
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

  doSetSelectedDeclarationTypeChanged(selectedType: Declarationtype) {
    if (selectedType === null) {
      return null;
    }
    console.log(
      'About to set selected declaration type view. Selected  type: ' +
        [selectedType.value]
    );
    this.selectedDeclarationType = selectedType;
  }

  //#endregion
}
