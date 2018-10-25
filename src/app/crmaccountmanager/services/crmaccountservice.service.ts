import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { HttpClient } from '@angular/common/http';
import { Address } from '../models/address';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CrmaccountserviceService {
  private _addresses: BehaviorSubject<Address[]>;

  private addressesdataStore: {
    addresses: Address[];
  };

  constructor(private http: HttpClient) {
    this.addressesdataStore = { addresses: [] };
    this._addresses = new BehaviorSubject<Address[]>([]);
  }

  get addresses(): Observable<Address[]> {
    return this._addresses.asObservable();
  }

  getAccount(): Account {

    const account = new Account();
    account.accountName = 'Asm UK Ltd';
    account.accountNumber = '666';
    account.accountType = 'Customer';
    account.country = 'United Kingdom';
    account.createdBy = 'Api',
    account.defaultCurrencyCode = 'GBP';
    account.expiryDate = new Date('March 19, 2016');
    account.externalId = 'Ext ID';
    account.fax = 'really';
    account.id = 1;
    account.mainTelephone = '01784242200';
    return account;
  }

  loadAllAddresses() {
    const addressesUrl = '../../../api/addresses.json';

    return this.http.get<Address[]>(addressesUrl).subscribe(
      data => {
        this.addressesdataStore.addresses = data;
        this._addresses.next(
          Object.assign({}, this.addressesdataStore).addresses
        );
      },
      error => {
        console.log('Unable to load addresses');
      }
    );
  }
}
