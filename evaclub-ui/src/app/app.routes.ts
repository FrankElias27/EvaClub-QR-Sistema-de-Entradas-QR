import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';
import { HomeComponent } from './modules/home-page/pages/home/home.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: 'home',
    loadChildren:() => import('./modules/home-page/home-page.module').then(m => m.HomePageModule),
    canActivate:[authGuard]
  },
];
