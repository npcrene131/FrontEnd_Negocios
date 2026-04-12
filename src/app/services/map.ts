import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MapsService {
  private apiUrl = 'https://localhost:7240/api/Map/search'; // tu backend

  constructor(private http: HttpClient) {}

  searchPlaces(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${query}`);
  }
}
