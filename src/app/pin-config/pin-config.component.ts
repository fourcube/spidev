import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Pin } from 'model';
import { NgForm, FormGroup, FormArray, Form } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { WsService } from '../ws.service';

@Component({
  selector: 'sv-pin-config',
  templateUrl: './pin-config.component.html',
  styleUrls: ['./pin-config.component.scss']
})
export class PinConfigComponent implements AfterViewInit {

  @Input() pin: Pin;
  @ViewChild('form') form: NgForm;

  constructor(private wsService: WsService) { }

  ngAfterViewInit(): void {
    this.form.control.valueChanges
      .distinctUntilChanged()
      .debounceTime(50)
      .subscribe((p: Pin) => {
        p.id = this.pin.id;
        this.wsService.updatePin(p);
      });
  }
}
