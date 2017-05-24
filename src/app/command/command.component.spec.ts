import { BasicCommand, CommandType } from '../../model';
import { WsService } from '../ws.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandComponent } from './command.component';




describe('CommandComponent', () => {
  let component: CommandComponent;
  let fixture: ComponentFixture<CommandComponent>;

  beforeEach(async(() => {
    const command: BasicCommand = {
      id: 123,
      type: 'read_spi',
      arguments: []
    };
    TestBed.configureTestingModule({
      declarations: [CommandComponent],
      providers: [
        {
          provide: WsService,
          useValue: command
        }
      ]
    })
    fixture = TestBed.createComponent(CommandComponent);
    component = fixture.componentInstance;
    let wsService = TestBed.get(WsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


