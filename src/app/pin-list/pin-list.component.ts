import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Pin } from "model";

@Component({
  selector: 'sv-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.scss']
})
export class PinListComponent implements OnInit {
  @Input() pins: Pin[];
  @Output() pinClicked: EventEmitter<Pin> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickPin(pin: Pin) {
    this.pinClicked.emit(pin);
  }
}
