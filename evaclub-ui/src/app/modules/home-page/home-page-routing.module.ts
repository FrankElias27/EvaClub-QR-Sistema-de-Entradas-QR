import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { ZonesComponent } from './pages/zones/zones.component';
import { authGuard } from '../../utils/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/main/main.component').then(m => m.MainComponent),
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'zones',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/zones/zones.component').then(m => m.ZonesComponent),
      },
      {
        path: 'events',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/events/events.component').then(m => m.EventsComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
