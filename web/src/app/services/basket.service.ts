import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Item } from '../models/item';
import { BaseService } from './base.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService extends BaseService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public setBasketItems(basket: Item[], username: string): Observable<any> {
    return this.httpClient
      .post(this.getbaseUrl() + `/users/${username}/basket/`, basket)
      .pipe(catchError((error) => this.handleError(error)));
  }

  public getBasketItems(username: string): Observable<any> {
    return this.httpClient
      .get(this.getbaseUrl() + `/users/${username}/basket`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: Response | any) {
    console.log(error);
    return throwError(error);
  }

}
