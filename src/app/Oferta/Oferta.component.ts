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
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatInputModule, MatCardModule, MatFormFieldModule],
  templateUrl: './Oferta.html',
  styleUrls: ['./Oferta.css']
})
export class OfertaComponent implements OnInit {
  ofertas: Oferta[] = [];
  isEditing = false;
  displayedColumns: string[] = ['OfertaId', 'ProductoId', 'NegocioID', 'Descuento', 'FechaInicio', 'FechaFinal', 'actions'];

  newOferta: Oferta = {
    OfertaId: 0, ProductoId: 0, NegocioID: 0, Descuento: 0, FechaInicio: '', FechaFinal: ''
  };

  constructor(private ofertaService: OfertaService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getOfertas();
  }

  getOfertas() {
    this.ofertaService.getOferta().subscribe({
      next: (data: any) => {
        this.ofertas = data;
        this.cd.detectChanges();
      },
      error: (err: any) => console.error(err)
    });
  }

  saveOferta() {
    const request = this.isEditing 
      ? this.ofertaService.updateOferta(this.newOferta) 
      : this.ofertaService.insertOferta(this.newOferta);

    request.subscribe({
      next: () => this.resetForm(),
      error: (err: any) => console.error(err)
    });
  }

  editOferta(o: any) {
    this.newOferta = { ...o };
    this.isEditing = true;
  }

  deleteOferta(id: number) {
    this.ofertaService.deleteOferta(id).subscribe({
      next: () => this.getOfertas()
    });
  }

  resetForm() {
    this.newOferta = { OfertaId: 0, ProductoId: 0, NegocioID: 0, Descuento: 0, FechaInicio: '', FechaFinal: '' };
    this.isEditing = false;
    this.getOfertas();
  }
}