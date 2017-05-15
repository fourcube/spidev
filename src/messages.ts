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

export function pinState(pin: Pin) {
  return JSON.stringify({
    type: 'pin_state',
    payload: pin
  });
}
