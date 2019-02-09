import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Declarationtype } from '../models/declarationtypes';
import { Badge } from '../models/badges';

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {

  constructor(private http: HttpClient) { }

  getAllDeclarationTypes() {
    const declarationTypesUrl = '../../../assets/api/declarationtypes.json';

    return this.http.get<Declarationtype[]>(declarationTypesUrl).pipe(
      tap(this.DoGetDeclarationTypes()),
      catchError(this.handleError)
    );
  }

  getAllBadges() {
    const badgesUrl = '../../../assets/api/badges.json';

    return this.http.get<Badge[]>(badgesUrl).pipe(
      tap(this.DoGetBadges()),
      catchError(this.handleError)
    );
  }

  private DoGetBadges(): (x: Badge[]) => void {
    return data =>
      console.log(
        'The following declaration types were returned: ' + JSON.stringify(data)
      );
  }

  private DoGetDeclarationTypes(): (x: Declarationtype[]) => void {
    return data =>
      console.log(
        'The following declaration types were returned: ' + JSON.stringify(data)
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

}
