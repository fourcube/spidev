import { WsService } from '../ws.service';
import { PinComponent } from '../pin/pin.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinListComponent } from './pin-list.component';

describe('PinListComponent', () => {
  let component: PinListComponent;
  let fixture: ComponentFixture<PinListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinListComponent, PinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
