import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Capes } from '../data/capes';

@Injectable({
  providedIn: 'root'
})
export class CapesService {
  readonly backendUrl = 'capes';

  constructor(private http: HttpClient) {}

  public getList(): Observable<Capes[]> {
    return this.http.get<Capes[]>(`${environment.backendBaseUrl}${this.backendUrl}`);
  }

  public getOne(id: number): Observable<Capes> {
    return this.http.get<Capes>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`);
  }

  public update(capes: Capes): Observable<Capes> {
    return this.http.put<Capes>(`${environment.backendBaseUrl}${this.backendUrl}/${capes.id}`, capes);
  }

  public save(capes: Capes): Observable<Capes> {
    return this.http.post<Capes>(`${environment.backendBaseUrl}${this.backendUrl}`, capes);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`, { observe: 'response' });
  }
}
