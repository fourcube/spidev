import { Component, OnInit, Input } from '@angular/core';
import { Pin } from '../../model';

@Component({
  selector: 'sv-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  @Input() pin: Pin;
  @Input() isSelected: boolean;

  constructor() { }

  ngOnInit() {
  }

  useContrast(color: string): boolean {
    if (color.length < 6) { return false; }

    const rgb = color.substring(1);
    const r = parseInt(rgb.substring(0, 2), 16);
    const g = parseInt(rgb.substring(2, 4), 16);
    const b = parseInt(rgb.substring(4, 6), 16);

    const brightness = Math.sqrt(0.299 * Math.pow(r, 2) + 0.586 * Math.pow(g, 2) + 0.114 * Math.pow(b, 2));

    return brightness < 128;
  }

  pinResCode(pin: Pin): string {
    if (pin.resistor === 'NONE') { return ''; };
    if (pin.resistor === 'PULL_UP') { return 'U'; };
    if (pin.resistor === 'PULL_DOWN') { return 'D'; };
  }
}
