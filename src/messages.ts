import { Pin, PinValue, PinResistor, PinDirection } from './model';

/**
 * Model interfaces and classes.
 */
export interface PinStateMessage {
  type: 'pin_state';
  payload: Pin;
}

export type Message = PinStateMessage;

/**
 * Message generating functions.
 */

export function pinState(id: number,
                         direction: PinDirection,
                         value: PinValue = 0,
                         resistor: PinResistor = 'NONE') {
  return JSON.stringify({
    type: 'pin_state',
    payload: {
      id,
      value,
      direction,
      resistor
    }
  });
}
