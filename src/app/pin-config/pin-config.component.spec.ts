import { WsService } from '../ws.service';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinConfigComponent } from './pin-config.component';

describe('PinConfigComponent', () => {
  let component: PinConfigComponent;
  let fixture: ComponentFixture<PinConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ PinConfigComponent ],
      providers: [
        WsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinConfigComponent);
    component = fixture.componentInstance;
    component.pin = {
      id: 0,
      value: 'HIGH',
      direction: 'IN',
      resistor: 'NONE',
      color: '#fff'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
