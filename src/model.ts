
export type PinValue = 'LOW' | 'HIGH';
export type PinDirection = 'IN' | 'OUT';
export type PinResistor = 'NONE' | 'PULL_UP' | 'PULL_DOWN';
export interface Pin {
  id: number;
  value: PinValue;
  direction: PinDirection;
  resistor: PinResistor;
}

export interface PinState {
  pins: Pin[];
}
