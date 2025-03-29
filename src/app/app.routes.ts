import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'grid-fotos',
    pathMatch: 'full',
  },
  {
    path: 'grid-fotos',
    loadComponent: () =>
      import('./components/grid-fotos/grid-fotos.component').then(
        (m) => m.GridFotosComponent
      ),
  },
];
