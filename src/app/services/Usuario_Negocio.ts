import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario_Negocio } from '../Models/Usuario_Negocio';

@Injectable({
  providedIn: 'root',
})
export class Usuario_Negocio_Service {
  private apiUrl = 'https://localhost:7240/api/Usuario_Negocio_' ;

  constructor(private http: HttpClient) {}

  // Obtener todos los negocios
  getUsuario_Negocio() {
    return this.http.get<Usuario_Negocio[]>(this.apiUrl);
  }

  // Insertar un negocio nuevo
  insertUsuario_Negocio(Usuario_Negocio: Usuario_Negocio) {
    return this.http.post(this.apiUrl, Usuario_Negocio);
  }

  // Eliminar un negocio por ID
  deleteOferta(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateOferta(Usuario_Negocio: Usuario_Negocio) {
  return this.http.put(`${this.apiUrl}/${Usuario_Negocio.UsuarioNegoID}`, Usuario_Negocio);
  }

}

