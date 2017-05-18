import { WsService } from '../ws.service';
import { Component, OnInit, Input } from '@angular/core';
import { Command, CommandType } from 'model';

@Component({
  selector: 'sv-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss']
})
export class CommandListComponent implements OnInit {
  @Input() commands: Command[];

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

}
