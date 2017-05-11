export interface Pin {
  id: number;
  state: 1 | 0;
}

export interface PinStatus {
  pins: Pin[]
}
