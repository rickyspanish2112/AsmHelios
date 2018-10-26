import { Component, OnInit } from '@angular/core';
import { CrmaccountserviceService } from '../../services/crmaccountservice.service';
import { Account } from '../../models/account';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  account: Account = new Account();
  firstNameAutofilled: boolean;
  lastNameAutofilled: boolean;

  constructor(private crmService: CrmaccountserviceService) {}

  ngOnInit() {
    this.crmService.getAccount().subscribe(data => {
      this.doGetAccount(data);
    });
  }

  doGetAccount(data: Account) {
    this.account = data;
    console.log(this.account.shortCode + ' ' + this.account.accountName);
  }
}
