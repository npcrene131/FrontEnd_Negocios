import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router'; // Necesario para el routerLink
import { MatToolbarModule } from '@angular/material/toolbar'; // Para el mat-toolbar
import { MatButtonModule } from '@angular/material/button';   // Para los mat-button

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    MatToolbarModule, 
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'FrontEnd_OfferStore';
}