import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OurilComponent} from './component/ouril/ouril.component';
import {PitComponent} from './component/pit/pit.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {OwareComponent} from './component/oware/oware.component';
import {HomeComponent} from './component/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    OurilComponent,
    PitComponent,
    NavbarComponent,
    OwareComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
