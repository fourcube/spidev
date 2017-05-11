import { Pin } from "../../src/model";

export interface PinStatusMessage {
  type: "pin_state";
  payload: Pin
}

export type Message = PinStatusMessage

export function pinStatus(id: number, state: 1 | 0) {
  return JSON.stringify({
    type: "pin_state",
    payload: {
      id,
      state
    }
  });
}
