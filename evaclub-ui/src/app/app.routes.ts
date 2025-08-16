import { Routes } from '@angular/router';
import { PruebitaComponent } from './pages/pruebita/pruebita.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: 'pr',
    component: PruebitaComponent,
    pathMatch:'full'
  },
  {
    path: 'home',
    loadChildren:() => import('./modules/home-page/home-page.module').then(m => m.HomePageModule),
  },
];
