import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Profile } from "../data/profile";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class ProfileService {
  
    readonly backendUrl = 'profile';
  
    constructor(
      private http: HttpClient
    ) {}
  
    public getList(): Observable<Profile[]> {
      return this.http.get<Profile[]>(environment.backendBaseUrl + this.backendUrl);
    }
  
    public getOne(id: number): Observable<Profile> {
      return this.http.get<Profile>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
    }
  
  }