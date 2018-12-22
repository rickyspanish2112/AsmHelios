import { Component, OnInit } from '@angular/core';
import { DeclarationService } from '../../services/declaration.service';
import { Declarationtypes } from '../../models/declarationtypes';
import { Badges } from '../../models/badges';

@Component({
  selector: 'app-cds-declaration',
  templateUrl: './cds-declaration.component.html',
  styleUrls: ['./cds-declaration.component.scss']
})
export class CdsDeclarationComponent implements OnInit {

  panelOpenState = false;
  errorMessage: string;
  declarationTypes: Declarationtypes[] = [];
  badges: Badges[] = [];

  customCollapsedHeight = '40px';
  customExpandedHeight = '40px';
  TraderReferenceValue = '';

  constructor(private declarationService: DeclarationService) { }

  ngOnInit() {

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
}
