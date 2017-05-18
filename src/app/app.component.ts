import { Component, OnInit } from '@angular/core';
import { WsService } from './ws.service';
import { Observable } from 'rxjs/Rx';
import { Pin, Command } from 'model';

@Component({
  selector: 'sv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pins: Observable<Pin[]>;
  commands: Observable<Command[]>;
  selectedPin: Pin;

  wsConnection: number;

  constructor(private ws: WsService) {
    this.pins = this.ws.pinState
      .map(status => status.pins);

    this.commands = this.ws.commands;
  }

  ngOnInit(): void {
    setInterval(() => {
      this.wsConnection = (this.ws.getWSState());
    }, 500);
  }

  showConfig(pin) {
    this.selectedPin = pin;
  }
}