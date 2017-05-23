import { WsService } from '../ws.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Command, CommandType } from 'model';

@Component({
  selector: 'sv-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss']
})
export class CommandListComponent implements OnInit {
  @Input() commands: Command[];
  @Output() commandSelected: EventEmitter<Command> = new EventEmitter();

  constructor(private ws: WsService) { }

  ngOnInit() {
  }

  createCommand(type: CommandType) {
    this.ws.addCommand({
      arguments: [],
      id: null,
      type
    } as Command);
  }

  selectCommand(command: Command) {
    this.commandSelected.emit(command);
  }

}
