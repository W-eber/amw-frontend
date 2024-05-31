import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DiscordAccount } from '../data/discordaccount';

@Injectable({
  providedIn: 'root'
})
export class DiscordAccountService {
  readonly backendUrl = 'discordaccount';

  constructor(private http: HttpClient) {}

  public getList(): Observable<DiscordAccount[]> {
    return this.http.get<DiscordAccount[]>(`${environment.backendBaseUrl}${this.backendUrl}`);
  }

  public getOne(id: number): Observable<DiscordAccount> {
    return this.http.get<DiscordAccount>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`);
  }

  public update(discordAccount: DiscordAccount): Observable<DiscordAccount> {
    return this.http.put<DiscordAccount>(`${environment.backendBaseUrl}${this.backendUrl}/${discordAccount.id}`, discordAccount);
  }

  public save(discordAccount: DiscordAccount): Observable<DiscordAccount> {
    return this.http.post<DiscordAccount>(`${environment.backendBaseUrl}${this.backendUrl}`, discordAccount);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`, { observe: 'response' });
  }
}
