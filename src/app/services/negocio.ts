import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Negocio } from '../Models/Negocios';

@Injectable({
  providedIn: 'root',
})
export class NegocioServices {
  private apiUrl = 'https://localhost:7240/api/Negocio' ;

  constructor(private http: HttpClient) {}

  // Obtener todos los negocios
  getNegocios() {
    return this.http.get<Negocio[]>(this.apiUrl);
  }

  // Insertar un negocio nuevo
  insertNegocio(negocio: Negocio) {
    return this.http.post(this.apiUrl, negocio);
  }

  // Eliminar un negocio por ID
  deleteNegocio(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateNegocio(negocio: Negocio) {
  return this.http.put(`${this.apiUrl}/${negocio.NegocioId}`, negocio);
  }

}

