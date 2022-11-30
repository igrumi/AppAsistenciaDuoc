import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { NavPage } from './nav.page';

const routes: Routes = [
  {
    path: '',
    component: NavPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../../pages/home/home.module').then( m => m.HomePageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'qrreader',
        loadChildren: () => import('../../pages/qrreader/qrreader.module').then( m => m.QrreaderPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'foro',
        loadChildren: () => import('../../pages/foro/foro.module').then( m => m.ForoPageModule),
        canActivate: [AuthGuardService]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavPageRoutingModule {}
