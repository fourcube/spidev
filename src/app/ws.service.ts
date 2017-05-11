import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject,Observable } from "rxjs/Rx";
import { Pin, PinStatus } from "model";
import { pinStatus, Message } from '../../server/src/messages';

@Injectable()
export class WsService {
  private ws: WebSocket;

  private _pinStatus: BehaviorSubject<PinStatus>;

  constructor() {
    this.init();
    const pins: Pin[] = [];

    for(let i=0;i<26;i++) {
      pins.push({
        id: i,
        state: 0
      });
    }

    this._pinStatus = new BehaviorSubject({
      pins
    });
  }

  get pinStatus(): Observable<PinStatus> {
    return this._pinStatus.asObservable()
      .do(x => console.log(x));
  }

  init() {
    this.ws = this.createWs();

    this.ws.addEventListener('open', () => {
      console.log("Connected.");
    });

    this.ws.addEventListener('close', () => {
      console.log("Disconnected.");
      setTimeout(this.init.bind(this), 250);
    });

    this.ws.addEventListener('message', (event) => {
      const data = <Message>JSON.parse(event.data);
      console.log(data);
      switch(data.type) {
        case "pin_state":
          const currentStatus = this._pinStatus.getValue();

          currentStatus.pins = currentStatus.pins.map((p) => {
            if(p.id == data.payload.id) {
              return data.payload;
            }

            return p;
          });

          this._pinStatus.next(currentStatus);
        break;
      }
    });
  }

  updatePin(pin) {
    this.ws.send(pinStatus(pin.id, pin.state));
  }

  private createWs() {
    return new WebSocket('ws://' + window.location.hostname + ':8080');
  }

}
