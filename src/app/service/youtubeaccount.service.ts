import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { YoutubeAccount } from '../data/youtubeaccount';

@Injectable({
  providedIn: 'root'
})
export class YoutubeAccountService {
  readonly backendUrl = 'youtubeaccount';

  constructor(private http: HttpClient) {}

  public getList(): Observable<YoutubeAccount[]> {
    return this.http.get<YoutubeAccount[]>(`${environment.backendBaseUrl}${this.backendUrl}`);
  }

  public getOne(id: number): Observable<YoutubeAccount> {
    return this.http.get<YoutubeAccount>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`);
  }

  public update(youtubeAccount: YoutubeAccount): Observable<YoutubeAccount> {
    return this.http.put<YoutubeAccount>(`${environment.backendBaseUrl}${this.backendUrl}/${youtubeAccount.id}`, youtubeAccount);
  }

  public save(youtubeAccount: YoutubeAccount): Observable<YoutubeAccount> {
    return this.http.post<YoutubeAccount>(`${environment.backendBaseUrl}${this.backendUrl}`, youtubeAccount);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`, { observe: 'response' });
  }
}
