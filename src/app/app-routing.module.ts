import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
    
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'correo',
    loadChildren: () => import('./pages/correo/correo.module').then( m => m.CorreoPageModule),
  },
  {
    path: 'pregunta',
    loadChildren: () => import('./pages/pregunta/pregunta.module').then( m => m.PreguntaPageModule)
  },
  {
    path: 'qrreader',
    loadChildren: () => import('./pages/qrreader/qrreader.module').then( m => m.QrreaderPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'foro',
    loadChildren: () => import('./pages/foro/foro.module').then( m => m.ForoPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'nav',
    loadChildren: () => import('./pages/nav/nav.module').then( m => m.NavPageModule),
    canActivate: [AuthGuardService]
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

