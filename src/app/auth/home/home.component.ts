

import { Component } from '@angular/core';
import { HelpMethod } from 'src/app/auth/help/help';
import { Table } from 'primeng/table';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as fileSaver from 'file-saver';

import { MessageService } from 'primeng/api';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { BasePBTanimlamalarService } from 'src/app/lo/tanimlamalar/services/basepbtanimlamalar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})


export class HomeComponent {
  loading: boolean = true;
  constructor(private baseService: BasePBTanimlamalarService, private authenticationService: AuthenticationService, private messageService: MessageService) { }
  async ngOnInit() {
    this.authenticationService.currentUser.subscribe(data => {
      this.firmaId = data.firmaId;
    });
    this.baseService.birFiltreliGetir("Anasayfa/Musteri","FirmaId",this.firmaId).subscribe(response => {
      this.musteriSayisi = (response);

    });

  }

  firmaId: number=null;
  musteriSayisi: number=null;
  
}