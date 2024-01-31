import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TanimlamalarRoutingModule } from './tanimlamalar-routing.module';
import { HttpService } from 'src/app/services/http.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from 'src/app/helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { BrowserModule } from '@angular/platform-browser';
import { InputSwitchModule } from 'primeng/inputswitch';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
import { HelpMethod } from 'src/app/auth/help/help';
import { FirmaComponent } from './firma/firma.component';
import { PipesModulModule } from 'src/app/pipes-modul/pipes-modul.module';

@NgModule({
  declarations: [FirmaComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    TanimlamalarRoutingModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,CalendarModule,
    //BrowserModule,
    InputSwitchModule,
    ToggleButtonModule,
    TooltipModule,
    ReactiveFormsModule,
    PipesModulModule
    
   

   
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ,HelpMethod,
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }  
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: []
})
export class TanimlamalarModule { }
