import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Negocio } from '../Models/Negocios';
import { NegocioServices } from '../services/negocio';
import { MapsService } from '../services/map'; 

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import * as L from 'leaflet';

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
export class NegocioComponent implements OnInit, AfterViewInit {
  negocios: Negocio[] = [];
  results: any[] = []; 
  searchQuery: string = '';
  map: any;

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
    private mapsService: MapsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log("NegocioComponent cargando");
    this.getNegocios();
  }

ngAfterViewInit(): void {
  // Inicializa el mapa
  this.map = L.map('map').setView([27.48, -109.93], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(this.map);

  // ESTO ES LO QUE ARREGLA LOS AGUJEROS Y EL MAPA DESALINEADO
  setTimeout(() => {
    this.map.invalidateSize();
  }, 500); // Le damos medio segundo para que el CSS cargue bien
}

  // CRUD de Negocios
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

  // Consulta a SerpApi vía backend
  getPlaces() {
  if (!this.searchQuery.trim()) {
    alert("Escribe algo para buscar.");
    return;
  }

  // 1. CREAMOS UNA CONSTANTE CON LA UBICACIÓN FIJA
  // Esto engaña a la API para que siempre busque en Obregón
  const queryLocal = `${this.searchQuery} en Ciudad Obregón, Sonora`;

  // 2. PASAMOS queryLocal EN LUGAR DE this.searchQuery
  this.mapsService.searchPlaces(queryLocal).subscribe({
    next: (data) => {
      this.results = data.local_results || [];

      // Limpia marcadores anteriores
      this.map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      // Agrega marcadores nuevos
      this.results.forEach(r => {
        if (r.gps_coordinates) {
          // Tip: Si quieres usar iconos personalizados o corregir el error de imagen, 
          // recuerda definir el icon: L.icon(...) aquí.
          L.marker([r.gps_coordinates.latitude, r.gps_coordinates.longitude])
            .addTo(this.map)
            .bindPopup(`<b>${r.title}</b><br>${r.address || ''}`);
        }
      });

      // Centra el mapa en el primer resultado
      if (this.results.length > 0 && this.results[0].gps_coordinates) {
        this.map.setView([
          this.results[0].gps_coordinates.latitude,
          this.results[0].gps_coordinates.longitude
        ], 15);
      }
    },
    error: (err) => console.error("Error al consultar SerpApi:", err)
  });
}
}
