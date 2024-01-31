import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import { Userregister } from '../models/userregister.model';
import { Role } from '../models/role.enum';
import { CurrentUser } from '../models/currentuser.model';
import { UserRefresh } from '../models/userRefresh.model';


const API_URL = `${environment.BASE_URL}/api/authentication/`

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<CurrentUser>;
  private currentUserSubject: BehaviorSubject<CurrentUser>;
  private currentUserReturn: Observable<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currentUserSubject = new BehaviorSubject<CurrentUser>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): CurrentUser {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(API_URL + 'login', user).pipe(
      map(response => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  register(user: Userregister): Observable<any> {
    return this.http.post(API_URL , user);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new CurrentUser);
    localStorage.clear();     
    window.location.reload();
  }
  public get userValue(): CurrentUser {
    return this.currentUserSubject.value;
  }
  refreshToken() {
    const url: string = `${API_URL}refresh`;

    const body: any = {

      userName: this.userValue.userName,         
      roller: this.userValue.roller,
          accessToken: this.userValue.accessToken,
          refreshToken: this.userValue.refreshToken,
          firmaId:this.userValue.firmaId
    };

    return this.http.post<any>(url, body)
      .pipe(map(token => {

        

        const user: CurrentUser = {
          userName: token.userName,
         
          roller: token.roller,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          firmaId:token.firmaId
        }
        //this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }),
      catchError(error => {
        if ( error.status === 401) {
            return error;
        } else {
            return error;
        }
    })
      );
  }

}