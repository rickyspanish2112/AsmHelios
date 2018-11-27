import { Component, OnInit } from '@angular/core';
import { DeclarationService } from '../../services/declaration.service';
import { Declarationtypes } from '../../models/declarationtypes';

@Component({
  selector: 'app-cds-declaration',
  templateUrl: './cds-declaration.component.html',
  styleUrls: ['./cds-declaration.component.scss']
})
export class CdsDeclarationComponent implements OnInit {

  panelOpenState = false;
  errorMessage: string;
  declarationTypes: Declarationtypes[] = [];

  constructor(private declarationService: DeclarationService) { }

  ngOnInit() {

    this.declarationService.getAllDeclarationTypes().subscribe(
      data => {
        this.declarationTypes = data;
      },
      error => (this.errorMessage = <any>error)
    );
  }
}
