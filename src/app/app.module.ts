import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WsService } from 'app/ws.service';
import { PinListComponent } from './pin-list/pin-list.component';
import { PinConfigComponent } from './pin-config/pin-config.component';
import { PinComponent } from './pin/pin.component';
import { CommandListComponent } from './command-list/command-list.component';
import { CommandComponent } from './command/command.component';
import { CommandConfigComponent } from './command-config/command-config.component';

@NgModule({
  declarations: [
    AppComponent,
    PinListComponent,
    PinConfigComponent,
    PinComponent,
    CommandListComponent,
    CommandComponent,
    CommandConfigComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    WsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
