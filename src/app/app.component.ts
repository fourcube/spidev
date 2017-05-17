import { Component } from '@angular/core';
import { WsService } from './ws.service';
import { Observable } from 'rxjs/Rx';
import { Pin } from 'model';

@Component({
  selector: 'sv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pins: Observable<Pin[]>;
  selectedPin: Pin;

  constructor(private ws: WsService) {
    this.pins = this.ws.pinState
      .map(status => status.pins);
  }

  showConfig(pin) {
    this.selectedPin = pin;
  }

}
