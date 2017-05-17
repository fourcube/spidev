import { Pin, PinState } from '../../src/model';

const ZERO_PINS: Pin[] = [];

for (let i = 1; i <= 40; i++) {
  ZERO_PINS.push({
    color: '#ccc',
    direction: 'IN',
    id: i,
    resistor: 'NONE',
    value: 'LOW',
  });
}

export class Gpio {
  private currentState: PinState;

  constructor() {
    this.currentState = {
      pins: ZERO_PINS,
    };
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
  }
}
