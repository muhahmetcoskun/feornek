import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmaComponent } from './firma/firma.component';
import { AuthGuard, IsAdminGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'firmaTanimlama', component: FirmaComponent, canActivate: [IsAdminGuard],data: {role: ["ADMIN"]} },
   
   

  ])],
  exports: [RouterModule]
})
export class TanimlamalarRoutingModule { }
