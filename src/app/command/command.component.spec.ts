import { CommandType, Command } from '../../model';
import { WsService } from '../ws.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandComponent } from './command.component';




describe('CommandComponent', () => {
  let component: CommandComponent;
  let fixture: ComponentFixture<CommandComponent>;

  const command: Command = {
    id: 123,
    type: 'read_spi',
    arguments: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommandComponent],
      providers: [
        {
          provide: WsService,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandComponent);
    component = fixture.componentInstance;
    component.command = command;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


