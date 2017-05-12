import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinConfigComponent } from './pin-config.component';

describe('PinConfigComponent', () => {
  let component: PinConfigComponent;
  let fixture: ComponentFixture<PinConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
