import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    roller: any[] = [];
     varmi2:boolean=true;
    hidden(rols) {
        
        for (let i = 0; i < rols.items[0].roller.length; i++) {
            for (let j = 0; j <  this.roller.length; j++) {
    
      if (rols.items[0].roller[i]=== this.roller[j].items) {
        this.varmi2=false;
    
    
                }
    
    
            }
        }
        return this.varmi2;

        }
   
    constructor(public layoutService: LayoutService,private authenticationService: AuthenticationService,) { }

    ngOnInit() {
      
        this.authenticationService.currentUser.subscribe(data => {
            this.roller = data.roller;
          });

        this.model = [
            
         
            {   
                label: 'TANIMLAMALAR',visible:  this.roller.some( ai => ['ADMIN'].includes(ai) ),
                items: [
                    { label: 'Firma Tanımla', icon: 'pi pi-fw pi-id-card', routerLink: ['/tanimlamalar/firmaTanimlama'] ,visible:  this.roller.some( ai => ['ADMIN'].includes(ai) )},
                  
                ],
               
            
        }
            
        ];


}



        
    
}
