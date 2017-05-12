import { Pin } from "../../src/model";

export interface PinStateMessage {
  type: "pin_state";
  payload: Pin
}

export type Message = PinStateMessage

export function pinState(id: number, state: 1 | 0) {
  return JSON.stringify({
    type: "pin_state",
    payload: {
      id,
      state
    }
  });
}
