import { PinState, Pin } from "../../src/model";

const ZERO_PINS: Pin[] = [];

for(let i=1;i<=40;i++) {
  ZERO_PINS.push({
    id: i,
    direction: "IN",
    value: "LOW",
    resistor: "NONE"
  });
}

export class Gpio {
  currentState: PinState
  constructor () {
    this.currentState = {
      pins: ZERO_PINS
    };
  }

  /**
   * Resets all pins to the given state.
   *
   * @returns {PinState} the new state
   */
  reset(state: PinState): PinState {
    return this.currentState;
  }

  /**
   * Return the current state of all pins.
   *
   * @returns {PinState} the current pin state
   */
  getState(): PinState {
    return this.currentState;
  }

  /**
   * Update a pin.
   */
  update(pin: Pin) {
    this.currentState.pins = this.currentState.pins.map((p) => {
      if(p.id === pin.id) {
        return pin;
      }
      return p;
    })
  }
}
