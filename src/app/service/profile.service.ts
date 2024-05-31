import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Profile } from '../data/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  readonly backendUrl = 'profile';

  constructor(private http: HttpClient) {}

  public getList(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${environment.backendBaseUrl}${this.backendUrl}`);
  }

  public getOne(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`);
  }

  public update(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${environment.backendBaseUrl}${this.backendUrl}/${profile.id}`, profile);
  }

  public save(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${environment.backendBaseUrl}${this.backendUrl}`, profile);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendBaseUrl}${this.backendUrl}/${id}`);
  }
}
