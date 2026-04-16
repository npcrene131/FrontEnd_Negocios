import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oferta } from '../Models/Ofertas';

@Injectable({
  providedIn: 'root',
})
export class OfertaService {
  private apiUrl = 'https://localhost:7240/api/Oferta';

  constructor(private http: HttpClient) {}

  getOferta(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.apiUrl);
  }

  insertOferta(oferta: Oferta): Observable<any> {
    return this.http.post(this.apiUrl, oferta);
  }

  deleteOferta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateOferta(oferta: Oferta): Observable<any> {
    return this.http.put(`${this.apiUrl}/${oferta.OfertaId}`, oferta);
  }
}