import { Component, OnInit, Input } from '@angular/core';
import { Pin } from "model";

@Component({
  selector: 'sv-pin-config',
  templateUrl: './pin-config.component.html',
  styleUrls: ['./pin-config.component.scss']
})
export class PinConfigComponent implements OnInit {
  @Input() pin: Pin;

  constructor() { }

  ngOnInit() {
  }

}
