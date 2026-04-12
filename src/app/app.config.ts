import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes"; // importa tus rutas

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),// aquí conectas el router
    provideHttpClient(),
    importProvidersFrom(FormsModule),
     
  ]
};
