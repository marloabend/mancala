import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PitComponent} from './component/pit/pit.component';
import {OurilComponent} from './component/ouril/ouril.component';

@NgModule({
  declarations: [
    AppComponent,
    PitComponent,
    OurilComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
