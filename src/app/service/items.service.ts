import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Items } from '../data/items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  readonly backendUrl = 'items';

  constructor(private http: HttpClient) {}

  public getList(): Observable<Items[]> {
    return this.http.get<Items[]>(`${environment.backendBaseUrl}${this.backendUrl}`);
  }

  public getOne(id: number): Observable<Items> {
    return this.http.get<Items>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`);
  }

  public update(items: Items): Observable<Items> {
    return this.http.put<Items>(`${environment.backendBaseUrl}${this.backendUrl}/${items.id}`, items);
  }

  public save(items: Items): Observable<Items> {
    return this.http.post<Items>(`${environment.backendBaseUrl}${this.backendUrl}`, items);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`, { observe: 'response' });
  }
}
