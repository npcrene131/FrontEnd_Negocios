import { Routes } from '@angular/router';
import { NegocioComponent } from './Negocio/Negocio.component';
import { OfertaComponent } from './Oferta/Oferta.component';
import { Usuario_NegocioComponent } from './UsuarioNegocio/Usuario_Negocio.component';

export const routes: Routes = [
  { path: 'negocios', component: NegocioComponent },
  { path: 'ofertas', component: OfertaComponent },
  { path: 'usuario-negocio', component: Usuario_NegocioComponent },
  { path: '', redirectTo: '/negocios', pathMatch: 'full' }
];
