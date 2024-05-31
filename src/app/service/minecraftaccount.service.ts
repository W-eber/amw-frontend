import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MinecraftAccount } from '../data/minecraftaccount';

@Injectable({
  providedIn: 'root'
})
export class MinecraftAccountService {
  readonly backendUrl = 'minecraftaccount';

  constructor(private http: HttpClient) {}

  public getList(): Observable<MinecraftAccount[]> {
    return this.http.get<MinecraftAccount[]>(`${environment.backendBaseUrl}${this.backendUrl}`);
  }

  public getOne(id: number): Observable<MinecraftAccount> {
    return this.http.get<MinecraftAccount>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`);
  }

  public update(minecraftAccount: MinecraftAccount): Observable<MinecraftAccount> {
    return this.http.put<MinecraftAccount>(`${environment.backendBaseUrl}${this.backendUrl}/${minecraftAccount.id}`, minecraftAccount);
  }

  public save(minecraftAccount: MinecraftAccount): Observable<MinecraftAccount> {
    return this.http.post<MinecraftAccount>(`${environment.backendBaseUrl}${this.backendUrl}`, minecraftAccount);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`, { observe: 'response' });
  }
}
