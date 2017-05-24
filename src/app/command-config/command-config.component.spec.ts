import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandConfigComponent } from './command-config.component';

describe('CommandConfigComponent', () => {
  let component: CommandConfigComponent;
  let fixture: ComponentFixture<CommandConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandConfigComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandConfigComponent);
    component = fixture.componentInstance;
    component.command = { id: 0, type: 'read_spi', arguments: [] };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
