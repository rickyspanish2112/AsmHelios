import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Accountnode } from '../models/accountnode';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Iaccount } from '../contracts/iaccount';
import { Iaddress } from '../contracts/iaddress';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class CrmaccountserviceService {
  private _addresses: BehaviorSubject<Address[]>;

  private dataStore: {
    addresses: Address[];
  };

  // Allows component sto subscribe to this observable
  get addresses(): Observable<Address[]> {
    return this._addresses.asObservable();
  }

  constructor(private http: HttpClient) {
    this.dataStore = { addresses: [] };
    this._addresses = new BehaviorSubject<Address[]>([]);
  }

  loadAll() {
    const addressUrl = '../../../assets/api/addresses.json';

    return this.http.get<Address[]>(addressUrl).subscribe(
      data => {
        this.dataStore.addresses = data;
        this._addresses.next(Object.assign({}, this.dataStore).addresses);
      },
      error => {
        console.log('Failed to fetch addresses');
      }
    );
  }

  getAccountNodes(): Observable<Accountnode[]> {
    const accountUrl = '../../../assets/api/accountnode.json';

    return this.http.get<Accountnode[]>(accountUrl).pipe(
      tap(this.DoGetAccountNodes()),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred ${err.error.message}`;
    } else {
      errorMessage = `Server side returned code: ${
        err.status
      }, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  private DoGetAccountNodes(): (x: Accountnode[]) => void {
    return data =>
      console.log(
        'The following account nodes were returned: ' + JSON.stringify(data)
      );
  }

  getAccount(): Observable<Iaccount> {
    const accountUrl = '../../../assets/api/account.json';
    return this.http.get<Iaccount>(accountUrl).pipe(
      tap(this.DoGetAccount()),
      catchError(this.handleError)
    );
  }

  private DoGetAccount(): (x: Iaccount) => void {
    return data =>
      console.log(
        'The following account was returned: ' + JSON.stringify(data)
      );
  }

  getPrimaryAddress(): Observable<Iaddress> {
    const addressUrl = '../../../assets/api/addresses.json';

    return this.http.get<Iaddress[]>(addressUrl).pipe(
      map(data => {
        return this.doGetPrimaryAddress(data);
      }),
      catchError(this.handleError)
    );
  }
  doGetPrimaryAddress(data: Iaddress[]): Iaddress {
    const primaryAddress = data.find(x => x.isPrimary);
    console.log(
      'The following primary address was returned: ' + JSON.stringify(data)
    );
    return primaryAddress;
  }
}
