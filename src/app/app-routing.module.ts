import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'ouril',
    loadComponent: () => import('./component/ouril/ouril.component').then((c) => c.OurilComponent),
  },
  {
    path: 'oware',
    loadComponent: () => import('./component/oware/oware.component').then((c) => c.OwareComponent),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
