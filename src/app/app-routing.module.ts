import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard, IsAdminGuard } from './guards/auth.guard';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { HomeComponent } from './auth/home/home.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent, canActivate: [IsAdminGuard],data: {role:  ["ADMIN", "FIRMAADMIN","FIRMAKULLANICI"]} ,
                children: [
                    {   path: '', component: HomeComponent,  canActivate: [IsAdminGuard],data: {role:  ["ADMIN", "FIRMAADMIN","FIRMAKULLANICI"]} },
                ]
            },
            {
                path: '', component: AppLayoutComponent, canActivate: [IsAdminGuard],data: {role:  ["ADMIN", "FIRMAADMIN","FIRMAKULLANICI"]} ,
                children: [
                   
                    { path: 'tanimlamalar', loadChildren: () => import('./lo/tanimlamalar/tanimlamalar.module').then(m => m.TanimlamalarModule),   canActivate: [IsAdminGuard],data: {role:  ["ADMIN"]}  },
                  
                ]
            },
           
        
            {
                path: 'auth',
                children: [
                    { path: '', loadChildren: () => import('./auth/auth/auth.module').then(m => m.AuthModule), },
                ]
            },
            {path: '404', component: NotFoundComponent},
            {path: '401', component: UnauthorizedComponent},
            {path: '**', component: NotFoundComponent},
           
            

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
