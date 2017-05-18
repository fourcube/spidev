import { Component, OnInit, Input } from '@angular/core';
import { Command } from 'model';

@Component({
  selector: 'sv-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
  @Input() command: Command;

  constructor() { }

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
    console.log(`pos down ${command.id}`);
  }
  posUp(command: Command) {
    console.log(`pos up ${command.id}`);
  }
  deleteCommand(command: Command) {
    console.log(`delete command ${command.id}`);
  }
}
