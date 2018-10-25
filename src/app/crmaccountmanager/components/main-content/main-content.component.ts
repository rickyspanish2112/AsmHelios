import { Component, OnInit } from '@angular/core';
import { CrmaccountserviceService } from '../../services/crmaccountservice.service';
import { Observable } from 'rxjs/Observable';
import { Account } from '../../models/account';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  account: Account;

  constructor(private userService: CrmaccountserviceService) {}

  ngOnInit() {
    this.account = this.userService.getAccount();

    console.log(this.account);
  }
}
