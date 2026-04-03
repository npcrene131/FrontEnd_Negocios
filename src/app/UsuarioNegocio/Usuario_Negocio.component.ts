import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario_Negocio } from '../Models/Usuario_Negocio';
import { Usuario_Negocio_Service } from '../services/Usuario_Negocio';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-usuario-negocio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule
  ],
  templateUrl: './Usuario_Negocio.html',
  styleUrls: ['./Usuario_Negocio.css']
})
export class Usuario_NegocioComponent implements OnInit {
  usuariosNegocio: Usuario_Negocio[] = [];

  newUsuarioNegocio: Usuario_Negocio = {
    UsuarioNegoID: 0,
    UsuarioNegoNombre: '',
    UsuarioNegoCorreo: '',
    UsuarioNegoContra: ''
  };

  displayedColumns: string[] = [
    'UsuarioNegoID',
    'UsuarioNegoNombre',
    'UsuarioNegoCorreo',
    'UsuarioNegoContra',
    'actions'
  ];

  isEditing = false;

  constructor(
    private usuarioNegocioService: Usuario_Negocio_Service,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUsuariosNegocio();
  }

  getUsuariosNegocio() {
    this.usuarioNegocioService.getUsuario_Negocio().subscribe({
      next: (data) => {
        this.usuariosNegocio = [...data];
        this.cd.detectChanges();
      },
      error: (err) => console.error("Error de conexión:", err)
    });
  }

  saveUsuarioNegocio() {
    if (this.isEditing) {
      this.usuarioNegocioService.updateOferta(this.newUsuarioNegocio).subscribe({
        next: () => this.resetForm(),
        error: (err) => console.error("Error al actualizar usuario-negocio:", err)
      });
    } else {
      this.usuarioNegocioService.insertUsuario_Negocio(this.newUsuarioNegocio).subscribe({
        next: () => this.resetForm(),
        error: (err) => console.error("Error al insertar usuario-negocio:", err)
      });
    }
  }

  editUsuarioNegocio(u: Usuario_Negocio) {
    this.newUsuarioNegocio = { ...u };
    this.isEditing = true;
  }

  deleteUsuarioNegocio(id: number) {
    this.usuarioNegocioService.deleteOferta(id).subscribe({
      next: () => this.getUsuariosNegocio(),
      error: (err) => console.error("Error al eliminar usuario-negocio:", err)
    });
  }

  resetForm() {
    this.newUsuarioNegocio = {
      UsuarioNegoID: 0,
      UsuarioNegoNombre: '',
      UsuarioNegoCorreo: '',
      UsuarioNegoContra: ''
    };
    this.isEditing = false;
    this.getUsuariosNegocio();
  }
}
