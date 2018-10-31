import { Injectable } from "@angular/core";
import { Account } from "../models/account";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Accountnode } from "../models/accountnode";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { Iaccount } from "../contracts/iaccount";
import { Iaddress } from "../contracts/iaddress";
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CrmaccountserviceService {
  constructor(private http: HttpClient) {}

  getAccount(): Observable<Iaccount> {
    const accountUrl = '../../../assets/api/account.json';
    return this.http.get<Iaccount>(accountUrl).pipe(
      tap(data =>
        console.log(
          'The following account was returned: ' + JSON.stringify(data)
        )
      ),
      catchError(this.handleError)
    );
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
   const bob = data.find(x => x.isPrimary);
   return bob;
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
}
