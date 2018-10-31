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
  shortCodeValue: string;
  accountNumberValue: string;
  accountNameValue: string;
  mainTelephoneValue: string;
  countryValue: string;
  tinValue: string;
  websiteValue: string;
  externalIdValue: string;
  faxNumberValue: string;
  defaultCurrencyValue: string;

  constructor(private crmService: CrmaccountserviceService,
     private route: ActivatedRoute) {}

  ngOnInit() {
    this.crmService.getAccount().subscribe(
      data => {
        this.account = data;
        this.shortCodeValue = data.shortCode;
        this.accountNumberValue = data.accountNumber;
        this.accountNameValue = data.accountName;
        this.mainTelephoneValue = data.mainTelephone;
        this.countryValue = data.country;
        this.tinValue = data.tin;
        this.websiteValue = data.website;
        this.externalIdValue = data.externalId;
        this.faxNumberValue = data.fax;
        this.defaultCurrencyValue = data.defaultCurrencyCode;
      },
      error => (this.errorMessage = <any>error)
    );
  }
}
