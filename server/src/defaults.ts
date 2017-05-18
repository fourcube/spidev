import { Pin } from '../../src/model';

export const ZERO_PINS: Pin[] = [];

for (let i = 1; i <= 40; i++) {
  ZERO_PINS.push({
    color: '#cccccc',
    direction: 'IN',
    id: i,
    resistor: 'NONE',
    value: 'LOW',
  });
}
