import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OurilComponent} from "./component/ouril/ouril.component";
import {OwareComponent} from "./component/oware/oware.component";
import {HomeComponent} from "./component/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'ouril',
    component: OurilComponent
  },
  {
    path: 'oware',
    component: OwareComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
