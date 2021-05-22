import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { BaseService } from './base.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public getLoggedInUser(): User{
    let user = new User('','', []);
    const activeUserInfo = localStorage.getItem('activeUser');
    if(activeUserInfo) {
      const userInfo = JSON.parse(activeUserInfo)
      user = new User(userInfo.username, userInfo.password, []);
    }
    return user;
  }

  public getAllUsers(): Observable<any> {
    return this.httpClient
      .get(this.getbaseUrl() + '/users/')
      .pipe(catchError((error) => this.handleError(error)));
  }

  public createUser(user: User): Observable<any> {
    return this.httpClient
      .post(this.getbaseUrl() + '/users/', user)
      .pipe(catchError((error) => this.handleError(error)));
  }

  public signIn(user: User): Observable<any> {
    return this.httpClient
      .post(this.getbaseUrl() + '/users/sign-in/', user)
      .pipe(catchError((error) => this.handleError(error)));
  }

  public logOut() {
    localStorage.removeItem('activeUser');
  }


  private handleError(error: Response | any) {
    console.log(error);
    return throwError(error);
  }
}
