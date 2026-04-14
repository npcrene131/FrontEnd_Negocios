import { Routes } from '@angular/router';
import { NegocioComponent } from './Negocio/Negocio.component';
import { OfertaComponent } from './Oferta/Oferta.component';
import { Usuario_NegocioComponent } from './UsuarioNegocio/Usuario_Negocio.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'negocio', component: NegocioComponent },
  { path: 'oferta', component: OfertaComponent },
  { path: 'usuario-negocio', component: Usuario_NegocioComponent },
  { path: '', redirectTo: 'menu', pathMatch: 'full' }
];