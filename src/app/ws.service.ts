import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject,Observable } from "rxjs/Rx";
import { Pin, PinState } from "model";
import { pinState, Message } from '../../server/src/messages';

type PinStateMap = Map<number, Pin>;

@Injectable()
export class WsService {
  private ws: WebSocket;

  private _pinState: BehaviorSubject<PinStateMap>;

  constructor() {
    this.init();
    this._pinState = new BehaviorSubject(new Map());
  }

  get pinState(): Observable<PinState> {
    return this._pinState.asObservable()
      .map(x => Array.from(x))
      .map(x => {
        x.sort(([a, _1], [b, _2]) => a - b);
        return x;
      })
      .map((arr) => {
        return {
          pins: arr.map(([_, pin]) => pin)
        }
      });
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

      switch(data.type) {
        case "pin_state":
          const currentState = this._pinState.getValue();
          const newState = this.updatePinState(currentState, data.payload);
          this._pinState.next(newState);
        break;
      }
    });
  }

  updatePin(pin) {
    this.ws.send(pinState(pin.id, pin.state));
  }

  private updatePinState(currentState: PinStateMap, update: Pin): PinStateMap {
    currentState.set(update.id, update);
    return currentState;
  }

  private createWs() {
    return new WebSocket('ws://' + window.location.hostname + ':8080');
  }

}