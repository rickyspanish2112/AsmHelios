import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Accountnode } from '../models/accountnode';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Iaccount } from '../contracts/iaccount';

@Injectable({
  providedIn: 'root'
})

export class CrmaccountserviceService {

  constructor(private http: HttpClient) {}

  getAccount(): Observable<Iaccount> {
    const accountUrl = '../../../assets/api/account.json';
    return this.http.get<Iaccount>(accountUrl).pipe(
      tap(data => console.log('The following account was returned: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getAccountNodes(): Observable<Accountnode[]> {
    const accountUrl = '../../../assets/api/accountnode.json';

    return this.http.get<Accountnode[]>(accountUrl).pipe(
      tap(data => console.log('The following account nodes were returned: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred ${err.error.message}`;
    } else {
      errorMessage = `Server side returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
