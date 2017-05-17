import { Subscription } from 'rxjs/Rx';
import { OnChanges, OnDestroy } from '@angular/core/core';
import { WsService } from '../ws.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pin } from 'model';

@Component({
  selector: 'sv-pin-config',
  templateUrl: './pin-config.component.html',
  styleUrls: ['./pin-config.component.scss']
})
export class PinConfigComponent implements OnInit, OnDestroy, OnChanges {
  private _formSubscribtion: Subscription;

  @Input() pin: Pin;
  @ViewChild('form') form: NgForm;

  constructor(private wsService: WsService) { }

  ngOnInit(): void {
    this._formSubscribtion = this.form.control.valueChanges
      .distinctUntilChanged()
      .debounceTime(50)
      .subscribe((p: Pin) => {
        p.id = this.pin.id;
        this.wsService.updatePin(p);
      });
  }

  ngOnDestroy() {
    this._formSubscribtion.unsubscribe();
  }

  ngOnChanges() {

    console.log('foo', arguments);
  }
}
