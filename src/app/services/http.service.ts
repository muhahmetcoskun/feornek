import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.BASE_URL}`
@Injectable(
  { providedIn: "root" }
)
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  private url(controller: string, action: string) {
    controller = controller == "" ? "api" : ""
    return API_URL + `/${controller}/${action}`;
  }

  get(controller: string, action: string, id?: number): Observable<any> {
    if (!id)
      return this.httpClient.get(this.url(controller, action));
    else
      return this.httpClient.get(`${this.url(controller, action)}/${id}`);
  }

  post(controller: string, action: string, body: any) {
    return this.httpClient.post(this.url(controller, action), body);
  }

  put(controller: string, action: string, body: any, id: number) {
    //return this.httpClient.put(this.url(controller, action), body);
    return this.httpClient.put(`${this.url(controller, action)}/${id}`, body);

  }

  delete(controller: string, action: string, id: number) {
    return this.httpClient.delete(`${this.url(controller, action)}/${id}`);
  }

  //getFilter(controller: string, action: string, param: PersonelSearch) {

  // let queryParams = new HttpParams();
  // for (let property in param ) {
  //   queryParams = queryParams.append(property);
  // }

  getFilter(controller: string, action: string, info: any) {
    let queryParams = new HttpParams();
    for (const key of Object.keys(info)) {
      // NOTE: id and name here are not strongly typed. so, you must adjust if you want that. 
      queryParams = queryParams.append(key, info[key]);
    }
    return this.httpClient.get(this.url(controller, action), { params: queryParams });
  }

  
  getAllOwn(controller: string, action: string,param:string, id?: number): Observable<any> {
   
    let queryParams = new HttpParams();

    queryParams = queryParams.append(param, id);

    return this.httpClient.get(this.url(controller, action), { params: queryParams });
  }

  getActive(controller: string, action: string) {
    let queryParams = new HttpParams();

    queryParams = queryParams.append("aktif", "true");

    return this.httpClient.get(this.url(controller, action), { params: queryParams });
  }

  getFilterOne(controller: string, action: string, pSting: any, pValue: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append(pSting, pValue);

    return this.httpClient.get(this.url(controller, action), { params: queryParams });
  }

}
