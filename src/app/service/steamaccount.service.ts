import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SteamAccount } from '../data/steamaccount';

@Injectable({
  providedIn: 'root'
})
export class SteamAccountService {
  readonly backendUrl = 'steamaccount';

  constructor(private http: HttpClient) {}

  public getList(): Observable<SteamAccount[]> {
    return this.http.get<SteamAccount[]>(`${environment.backendBaseUrl}${this.backendUrl}`);
  }

  public getOne(id: number): Observable<SteamAccount> {
    return this.http.get<SteamAccount>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`);
  }

  public update(steamAccount: SteamAccount): Observable<SteamAccount> {
    return this.http.put<SteamAccount>(`${environment.backendBaseUrl}${this.backendUrl}/${steamAccount.id}`, steamAccount);
  }

  public save(steamAccount: SteamAccount): Observable<SteamAccount> {
    return this.http.post<SteamAccount>(`${environment.backendBaseUrl}${this.backendUrl}`, steamAccount);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`, { observe: 'response' });
  }
}
