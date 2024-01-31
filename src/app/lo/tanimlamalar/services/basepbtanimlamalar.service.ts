import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, firstValueFrom, Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BasePBTanimlamalarService {

  constructor(private httpService: HttpService) { }


  get(appString: string): Observable<any> {
    return this.httpService.get("", appString, null);
  }
  kaydet(appString: string,tatilgun: any): Observable<any> {
    debugger;
    return this.httpService.post("", appString,  tatilgun);
  }
  guncelle(appString: string,tatilgun: any): Observable<any> {
    return this.httpService.put("", appString,  tatilgun,tatilgun.id);
  }
  sil(appString: string,id ): Observable<any> {
    return this.httpService.delete("",appString, id);
  }

 filtreliGetir(appString: string,entity: any): Observable<any> {
    return this.httpService.getFilter("", appString, entity);
  }
  birFiltreliGetir(appString: string,paramString: any,paramValue: any): Observable<any> {
    return this.httpService.getFilterOne("", appString, paramString,paramValue);
  }
  getAktif(appString: string): Observable<any> {
    return this.httpService.getActive("", appString);
  }
}
