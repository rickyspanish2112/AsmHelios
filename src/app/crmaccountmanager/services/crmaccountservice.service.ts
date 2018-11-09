import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Accountnode } from '../models/accountnode';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Iaccount } from '../contracts/iaccount';
import { Iaddress } from '../contracts/iaddress';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class CrmaccountserviceService {

  constructor(private http: HttpClient) {}

  getAccount(): Observable<Iaccount> {
    const accountUrl = '../../../assets/api/account.json';
    return this.http.get<Iaccount>(accountUrl).pipe(
      tap(this.DoGetAddresses()),
      catchError(this.handleError)
    );
  }

  private DoGetAddresses(): (x: Iaccount) => void {
    return data => console.log('The following account was returned: ' + JSON.stringify(data));
  }

  getAccountNodes(): Observable<Accountnode[]> {
    const accountUrl = '../../../assets/api/accountnode.json';

    return this.http.get<Accountnode[]>(accountUrl).pipe(
      tap(data =>
        console.log(
          'The following account nodes were returned: ' + JSON.stringify(data)
        )
      ),
      catchError(this.handleError)
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
   console.log('The following primary address was returned: ' + JSON.stringify(data)
  );
   return primaryAddress;
  }

  addAddress(address: Address): Promise<Address> {
    return new Promise((resolver, reject) => {
      resolver(address);
    });

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

getAllAddresses(): Observable<Address[]> {
  const accountUrl = '../../../assets/api/addresses.json';

  return this.http.get<Address[]>(accountUrl).pipe(
    tap(data =>
      console.log(
        'The following addresses were returned: ' + JSON.stringify(data)
      )
    ),
    catchError(this.handleError)
  );
}
}



