import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home-page/pages/home/home.component';
import { authGuard } from './utils/guard/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: 'home',
    loadChildren:() => import('./modules/home-page/home-page.module').then(m => m.HomePageModule),
    canActivate:[authGuard],

  },
];
