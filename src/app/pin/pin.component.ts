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

  pinResCode(pin: Pin): string {
    if (pin.resistor === 'NONE') { return ''; };
    if (pin.resistor === 'PULL_UP') { return 'U'; };
    if (pin.resistor === 'PULL_DOWN') { return 'D'; };
  }
}
