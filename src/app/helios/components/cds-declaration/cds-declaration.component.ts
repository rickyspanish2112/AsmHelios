import { Component, OnInit } from '@angular/core';
import { DeclarationService } from '../../services/declaration.service';
import { Declarationtypes } from '../../models/declarationtypes';
import { Badges } from '../../models/badges';


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
  declarationTypes: Declarationtypes[] = [];
  badges: Badges[] = [];
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



  constructor(private declarationService: DeclarationService, private store: Store<any>) { }

  ngOnInit() {

   this.store.pipe(select('declarationType')).subscribe(
     declarationTypes => {
       if (declarationTypes) {
         this.displayTypes = declarationTypes.showDeclarationTypes;
       }
     }
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
    this.store.dispatch({
      type: 'TOGGLE_DISPLAY_DECLARATION_TYPES',
      payload: value
    });
  }


}
