import { addCommand } from '../messages';
import { Injectable } from '@angular/core';
import { Message, pinState } from 'messages';
import { Pin, PinState, Command } from 'model';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

type PinStateMap = Map<number, Pin>;

@Injectable()
export class WsService {
  private ws: WebSocket;

  private _pinState: BehaviorSubject<PinStateMap>;
  private _commands: BehaviorSubject<Command[]>;

  constructor() {
    this.init();
    this._pinState = new BehaviorSubject(new Map());
    this._commands = new BehaviorSubject([]);
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
        };
      });
  }

  get commands(): Observable<Command[]> {
    return this._commands.asObservable();
  }

  public addCommand(command: Command) {
    this.ws.send(addCommand([command]));
  }

  init() {
    this.ws = this.createWs();

    this.ws.addEventListener('open', () => {
      console.log('Connected.');
    });

    this.ws.addEventListener('close', () => {
      console.log('Disconnected.');
      setTimeout(this.init.bind(this), 250);
    });

    this.ws.addEventListener('message', (event) => {
      const data = <Message>JSON.parse(event.data);

      switch (data.type) {
        case 'pin_state':
          const currentState = this._pinState.getValue();
          const newState = this.updatePinState(currentState, data.payload);
          this._pinState.next(newState);
          break;

        case 'all_commands':
          this._commands.next(data.payload);
          break;
      }
    });
  }

  updatePin(pin: Pin) {
    this.ws.send(pinState(pin));
  }

  private updatePinState(currentState: PinStateMap, update: Pin): PinStateMap {
    currentState.set(update.id, update);
    return currentState;
  }

  private createWs() {
    return new WebSocket('ws://' + window.location.hostname + ':8080');
  }

}
