import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  apiURL: string = 'https://localhost:44306/api';

  constructor(private httpClient: HttpClient) { }

  public getData(type: string) {
    let params = new HttpParams();
    params = params.append("type", type);
    return this.httpClient.get<any>(`${this.apiURL}/Data/GetData`, { params: params });
  }
}
