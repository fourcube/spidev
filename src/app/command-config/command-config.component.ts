import { Command } from '../../model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sv-command-config',
  templateUrl: './command-config.component.html',
  styleUrls: ['./command-config.component.scss']
})
export class CommandConfigComponent implements OnInit {
  @Input() command: Command;

  constructor() { }

  ngOnInit() {
  }

}
