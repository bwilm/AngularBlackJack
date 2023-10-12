import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DealerComponent } from './dealer/dealer.component';
import { PlayerComponent } from './player/player.component';
import { ControlsComponent } from './controls/controls.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';
import { StatsComponent } from './stats/stats.component';
import { TrendModule } from 'ngx-trend';
import { GraphComponent } from './graph/graph.component';


@NgModule({
  declarations: [
    AppComponent,
    DealerComponent,
    PlayerComponent,
    ControlsComponent,
    ModalComponent,
    StatsComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TrendModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
