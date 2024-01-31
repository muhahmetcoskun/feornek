import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HelpMethod } from 'src/app/auth/help/help';
import { Table } from 'primeng/table';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as fileSaver from 'file-saver';
import { Firma } from '../models/firma';
import { BasePBTanimlamalarService } from '../services/basepbtanimlamalar.service';
@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.scss'],
  providers: [MessageService]
})
export class FirmaComponent {
  loading: boolean = true;
  constructor(private baseService: BasePBTanimlamalarService, private messageService: MessageService, private helpMethod: HelpMethod) { }
  async ngOnInit() {
    this.baseService.get(this.apiname).subscribe(response => {
      this.firmas = (response);
      this.loading = false;

    });
    this.cols = [
      { field: 'sira', header: 'Sıra' },
      { field: 'tcknVkn', header: 'Tckn/Vkn' },
      { field: 'firmaAdi', header: 'Firma Adi' },
      { field: 'firmaSahipAdSoyad', header: 'Firma Sahip Ad Soyad' },
      { field: 'firmaTel', header: 'Firma Telelefonu' },
      { field: 'firmaEposta', header: 'Firma E-Posta' },
      { field: 'firmaAdres', header: 'Firma Adresi' },
      { field: 'aktif', header: 'Aktif' }
    ];

    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
  }
  apiname = "Firmas";
  datas = [];
  exportColumns;
  firmaDialog: boolean = false;
  deletefirmaDialog: boolean = false;
  deletefirmasDialog: boolean = false;
  firmas: Firma[] = [];
  firma: Firma = {
    id: null,
    aktif: null,
    firmaAdi: null,
    firmaAdres: null,
    firmaEposta: null,
    firmaSahipAdSoyad: null,
    firmaTel: null,
    tcknVkn: null,
    ustFirmaId: null
  }

  firmaDuzenle: Firma = {
    id: null,
    aktif: null,
    firmaAdi: null,
    firmaAdres: null,
    firmaEposta: null,
    firmaSahipAdSoyad: null,
    firmaTel: null,
    tcknVkn: null,
    ustFirmaId: null
  }

  data: any[] = [];
  selectedfirmas: Firma[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  guncelleId = null;
  buttonS: boolean = true;
  openNew() {
    this.firma = {
      id: null,
    aktif: null,
    firmaAdi: null,
    firmaAdres: null,
    firmaEposta: null,
    firmaSahipAdSoyad: null,
    firmaTel: null,
    tcknVkn: null,
    ustFirmaId: null
    }

    this.submitted = false;
    this.firmaDialog = true;
    this.guncelleId = null;
    this.firma.aktif = true;
    this.firma.id = 0;
  }

  deleteSelectedfirmas() {
    //this.deletefirmasDialog = true;
  }

  editfirma(firma: Firma) {
    this.firma = firma
    this.firmaDialog = true;
  }

  deletefirma(firma: Firma) {
    this.deletefirmaDialog = true;
    this.firma = firma;
  }

  confirmDeleteSelected() {
    this.deletefirmasDialog = false;

    this.baseService.sil(this.apiname, this.firma.id).subscribe(
      (success) => {
        this.deletefirmaDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Pasife Alma', life: 3000 });
      },
      (error) => {

        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Hata Oluştu', life: 3000 });
      }
    );

    this.firmas = this.firmas.filter(val => val.id !== this.firma.id)
    this.firma.aktif = false;
    this.firmas.push(this.firma);

  }

  confirmDelete() {

  }

  hideDialog() {
    this.firmaDialog = false;
    this.submitted = false;
  }

  savefirma() {

    if (this.firma.id != 0) {

      this.baseService.guncelle(this.apiname, this.firma).subscribe(
        (success) => {
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kayıt Başarılı', life: 3000 });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Hata Oluştu', life: 3000 });
        }
      );

      this.firma = {
        id: null,
        aktif: null,
        firmaAdi: null,
        firmaAdres: null,
        firmaEposta: null,
        firmaSahipAdSoyad: null,
        firmaTel: null,
        tcknVkn: null,
        ustFirmaId: null
      };
      this.hideDialog();
    }
    else {
      // this.firma.tarih=Date("2023-07-28T07:43:00.326Z");
      this.baseService.kaydet(this.apiname, this.firma).subscribe(
        (success) => {
          this.firmas.push(success);
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kayıt Başarılı', life: 3000 });
        },
        (error) => {

          this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Hata Oluştu', life: 3000 });
        }
      );

      this.firma = {
        id: null,
    aktif: null,
    firmaAdi: null,
    firmaAdres: null,
    firmaEposta: null,
    firmaSahipAdSoyad: null,
    firmaTel: null,
    tcknVkn: null,
        ustFirmaId: null
      };
      this.hideDialog();
    }
  }

  exportPdf() {
    const doc = new jsPDF('p', 'pt');
    doc['autoTable'](this.exportColumns, this.firmas);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("Çıktı.pdf");
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.firmas);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Çıktı");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }



  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
