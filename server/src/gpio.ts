import { Pin, PinState } from '../../src/model';
import Lowdb = require('lowdb');

export class Gpio {
  private currentState: PinState;

  constructor(private db: Lowdb) {
    this.currentState = db.get('pinState').value() as PinState;
  }

  /**
   * Resets all pins to the given state.
   *
   * @returns {PinState} the new state
   */
  public reset(state: PinState): PinState {
    return this.currentState;
  }

  /**
   * Return the current state of all pins.
   *
   * @returns {PinState} the current pin state
   */
  public getState(): PinState {
    return this.currentState;
  }

  /**
   * Update a pin.
   */
  public update(pin: Pin) {
    this.currentState.pins = this.currentState.pins.map((p) => {
      if (p.id === pin.id) {
        return pin;
      }
      return p;
    });

    this.db.set('pinState', this.currentState).write();
  }
}
