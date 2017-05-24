import { WsService } from '../ws.service';
import { CommandComponent } from '../command/command.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandListComponent } from './command-list.component';

describe('CommandListComponent', () => {
  let component: CommandListComponent;
  let fixture: ComponentFixture<CommandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandListComponent, CommandComponent ],
      providers: [
        {
          provide: WsService,
          useValue: true
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
