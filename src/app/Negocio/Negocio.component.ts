import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Negocio } from '../Models/Negocios';
import { NegocioServices } from '../services/negocio';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-negocio',
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
  templateUrl: './Negocio.html',
  styleUrls: ['./Negocio.css']
})
export class NegocioComponent implements OnInit {
  negocios: Negocio[] = [];

  newNegocio: Negocio = {
    Usu_NegocioID: 0,
    NegocioId: 0,
    NegocioLatitud: 0,
    NegocioLongitud: 0,
    NegocioNombre: '',
    NegocioDescripcion: '',
    NegocioTelefono: ''
  };

  displayedColumns: string[] = [
    'Usu_NegocioID',
    'NegocioId',
    'NegocioLatitud',
    'NegocioLongitud',
    'NegocioNombre',
    'NegocioDescripcion',
    'NegocioTelefono',
    'actions'
  ];

  isEditing = false;

  constructor(
    private negocioService: NegocioServices,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getNegocios();
  }

  getNegocios() {
    this.negocioService.getNegocios().subscribe({
      next: (data) => {
        this.negocios = [...data];
        this.cd.detectChanges();
      },
      error: (err) => console.error("Error de conexión:", err)
    });
  }

  saveNegocio() {
    if (this.isEditing) {
      this.negocioService.updateNegocio(this.newNegocio)
        .subscribe(() => this.resetForm());
    } else {
      this.negocioService.insertNegocio(this.newNegocio)
        .subscribe(() => this.resetForm());
    }
  }

  editNegocio(n: Negocio) {
    this.newNegocio = { ...n };
    this.isEditing = true;
  }

  deleteNegocio(id: number) {
    this.negocioService.deleteNegocio(id)
      .subscribe(() => this.getNegocios());
  }

  resetForm() {
    this.newNegocio = {
      Usu_NegocioID: 0,
      NegocioId: 0,
      NegocioLatitud: 0,
      NegocioLongitud: 0,
      NegocioNombre: '',
      NegocioDescripcion: '',
      NegocioTelefono: ''
    };
    this.isEditing = false;
    this.getNegocios();
  }
}
