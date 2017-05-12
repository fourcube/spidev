import { Component } from '@angular/core';
import { WsService } from "./ws.service";
import { Observable } from "rxjs/Rx";
import { Pin } from "model";

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

  clickPin(pin: Pin) {
    if(this.selectedPin == pin) {
      this.selectedPin = null;
      return;
    }

    this.selectedPin = pin;
    /*this.ws.updatePin({
      id: pin.id,
      state: pin.state === 1 ? 0 : 1
    });*/
  }
}
