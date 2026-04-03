import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Oferta } from '../Models/Ofertas';
import { OfertaService } from '../services/oferta';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-ofertas',
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
  templateUrl: './Oferta.html',
  styleUrls: ['./Oferta.css']
})
export class OfertaComponent implements OnInit {
  ofertas: Oferta[] = [];

  newOferta: Oferta = {
    OfertaId: 0,
    ProductoId: 0,
    NegocioID: 0,
    Descuento: 0,
    FechaInicio: '', 
    FechaFinal: ''
  };

  displayedColumns: string[] = [
    'OfertaId',
    'ProductoId',
    'NegocioID',
    'Descuento',
    'FechaInicio',
    'FechaFinal',
    'actions'
  ];

  isEditing = false;

  constructor(
    private ofertaService: OfertaService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getOfertas();
  }

  getOfertas() {
    this.ofertaService.getOferta().subscribe({
      next: (data) => {
        this.ofertas = [...data];
        this.cd.detectChanges();
      },
      error: (err) => console.error("Error de conexión:", err)
    });
  }

  saveOferta() {
    if (this.isEditing) {
      this.ofertaService.updateOferta(this.newOferta).subscribe({
        next: () => this.resetForm(),
        error: (err) => console.error("Error al actualizar oferta:", err)
      });
    } else {
      this.ofertaService.insertOferta(this.newOferta).subscribe({
        next: () => this.resetForm(),
        error: (err) => console.error("Error al insertar oferta:", err)
      });
    }
  }

  editOferta(o: Oferta) {
    this.newOferta = { ...o };
    this.isEditing = true;
  }

  deleteOferta(id: number) {
    this.ofertaService.deleteOferta(id).subscribe({
      next: () => this.getOfertas(),
      error: (err) => console.error("Error al eliminar oferta:", err)
    });
  }

  resetForm() {
    this.newOferta = {
      OfertaId: 0,
      ProductoId: 0,
      NegocioID: 0,
      Descuento: 0,
      FechaInicio: '',
      FechaFinal: ''
    };
    this.isEditing = false;
    this.getOfertas();
  }
}
