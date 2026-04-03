import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oferta } from '../Models/Ofertas';

@Injectable({
  providedIn: 'root',
})
export class OfertaService {
  private apiUrl = 'https://localhost:7240/api/Oferta' ;

  constructor(private http: HttpClient) {}

  // Obtener todos los negocios
  getOferta() {
    return this.http.get<Oferta[]>(this.apiUrl);
  }

  // Insertar un negocio nuevo
  insertOferta(oferta: Oferta) {
    return this.http.post(this.apiUrl, oferta);
  }

  // Eliminar un negocio por ID
  deleteOferta(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateOferta(oferta: Oferta) {
  return this.http.put(`${this.apiUrl}/${oferta.OfertaId}`, oferta);
  }

}

