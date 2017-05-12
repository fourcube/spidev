import { PinState, Pin } from "../../src/model";

export class Gpio {
  constructor () {}

  static initialState(): PinState {
    // TODO: When this is executed on the RPi,
    //       we should read all PINs
    const pins: Pin[] = [];
    for(let i=0;i<26;i++) {
      pins.push({
        id: i,
        state: 0
      });
    }

    return {
      pins
    };
  }
}
