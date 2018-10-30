import { Component, OnInit } from '@angular/core';
import { CrmaccountserviceService } from '../../services/crmaccountservice.service';
import { Account } from '../../models/account';
import { Accountnode } from '../../models/accountnode';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  account: Account = new Account();
  errorMessage: string;
  checked = false;
  indeterminate = false;
  panelOpenState = false;

  constructor(private crmService: CrmaccountserviceService,
     private route: ActivatedRoute) {}

  ngOnInit() {
    this.crmService.getAccount().subscribe(
      data => {
        this.account = data;
      },
      error => (this.errorMessage = <any>error)
    );
  }
}
