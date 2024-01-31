import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { User } from './models/user.model';
import { AuthenticationService } from './services/authentication.service';
import { CurrentUser } from './models/currentuser.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    currentUser: CurrentUser = new CurrentUser;
    constructor(private primengConfig: PrimeNGConfig,private authenticationService: AuthenticationService, private router: Router) {

        this.authenticationService.currentUser.subscribe(data => {
            this.currentUser = data;
          });
     }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
    logOut() {
        this.authenticationService.logOut();
        this.router.navigate(['/login']);
      }
}
