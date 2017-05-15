import { Pin } from "./model";

/**
 * Model interfaces and classes.
 */
export interface PinStateMessage {
  type: "pin_state";
  payload: Pin
}

export type Message = PinStateMessage

/**
 * Message generating functions.
 */

export function pinState(id: number, state: 1 | 0) {
  return JSON.stringify({
    type: "pin_state",
    payload: {
      id,
      state
    }
  });
}
