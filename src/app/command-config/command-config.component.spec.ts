import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandConfigComponent } from './command-config.component';

describe('CommandConfigComponent', () => {
  let component: CommandConfigComponent;
  let fixture: ComponentFixture<CommandConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
