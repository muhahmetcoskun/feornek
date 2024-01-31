import { Injectable, inject } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {User} from "../models/user.model";
import {AuthenticationService} from "../services/authentication.service";
import { CurrentUser } from '../models/currentuser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  private currentUser: CurrentUser = new CurrentUser;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

    if (this.currentUser) {
      //todoAC:yunus rolü yapınca burası ve menü düzenlenecek..
      let varmi=true;
      for (let index = 0; index < route.data['role'].length; index++) {

        for (let i = 0; i <  this.currentUser.roller.length; i++) {
       

      if (route.data['role'][index]=== this.currentUser.roller[i]) {
      varmi=false;
     }}
  
    } 
  if(varmi){
    this.router.navigate(['/401']);
    return false;
  }
  else { 
  return true;
}
  
  }
  else {
    this.router.navigate(['/auth/login']);
    return true;
  }
  return false;
}

  
  

}
export const IsAdminGuard :CanActivateChildFn=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean =>{
  return inject(AuthGuard).canActivate(route,state);

}