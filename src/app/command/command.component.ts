import { WsService } from '../ws.service';
import { Component, OnInit, Input } from '@angular/core';
import { Command } from 'model';

@Component({
  selector: 'sv-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
  @Input() command: Command;
  @Input() index: number;

  constructor(private wsService: WsService) { }

  ngOnInit() {
  }

  renderArguments(): string {
    const args = this.command.arguments;

    if (args.length < 1) {
      return '';
    }

    return args
      .map(this.asHex)
      .reduce((acc, next) => `${acc}, ${next}`);
  }

  private asHex(n: number): string {
    const hex = n.toString(16);
    if (hex.length < 2) {
      return '0x0' + hex;
    }

    return '0x' + hex;
  }
  posDown(command: Command) {
    this.wsService.moveComandDown(command);
  }
  posUp(command: Command) {
    this.wsService.moveComandUp(command);
  }
  deleteCommand(command: Command) {
    this.wsService.removeCommand(command);
  }
}
