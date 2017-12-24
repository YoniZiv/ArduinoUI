import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule, ChartModule, ToggleButtonModule, RatingModule, SliderModule} from 'primeng/primeng';
import {FormsModule} from "@angular/forms";
import {GaugeModule} from "angular-gauge";
import {NgxGaugeModule} from "ngx-gauge";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartModule,
    FormsModule,
    RatingModule,
    NgxGaugeModule,
    SliderModule,
    ButtonModule,
    ToggleButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
