import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Pin } from 'model';

@Component({
  selector: 'sv-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.scss']
})
export class PinListComponent implements OnInit {
  @Input() pins: Pin[];
  selectedPin: Pin;
  @Output() pinSelected: EventEmitter<Pin> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickPin(pin: Pin) {
    if (this.selectedPin === pin) {
      this.selectedPin = null;
      this.pinSelected.emit(null);
      return;
    }

    this.pinSelected.emit(pin);
    this.selectedPin = pin;
  }
}
