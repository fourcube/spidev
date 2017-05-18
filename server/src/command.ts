import { ReorderOp } from '../../src/messages';
import { Command, DbCommand } from '../../src/model';
import log = require('winston');
import { Gpio } from './gpio';
import Lowdb = require('lowdb');

let COMMAND_ID = 0;

export class CommandService {
  private queue: Command[];

  constructor(private gpio: Gpio,
              private db: Lowdb) {
    this.updateQueue();
  }

  public enqueue(commands: Command[]) {
    commands.forEach((c) => {
      c.id = COMMAND_ID++;
    });

    this.db.get('commands').push(commands).write();
    this.updateQueue();
  }

  public remove(id: number) {

    this.db.get('commands')
      .remove({id})
      .write();

    this.updateQueue();
  }

  public reorder(op: ReorderOp) {
    const commandIndex = this.queue.findIndex((c) => c.id === op.id);
    if (commandIndex < 0) {
      log.warn('Unknown command for reordering', op);
      return false;
    }

    switch (op.direction) {
      case 'UP':
        this.moveCommand(commandIndex, commandIndex - 1);
      case 'DOWN':
        this.moveCommand(commandIndex, commandIndex + 1);
      default:
    }
  }

  public execute() {
    this.queue.forEach((command) => {
      log.info('executing', { command });

      switch (command.type) {
        case 'read_spi':
          this.read_spi(command.arguments);
          break;
        case 'write_spi':
          this.write_spi(command.arguments);
          break;
        case 'wait_interrupt':
          this.wait_interrupt(command.arguments);
          break;
        default:
          log.error('unknown command type', { command });
      }

      return;
    });
  }

  get commands() {
    return this.queue;
  }

  private updateQueue() {
    this.queue = this.db.get('commands', []).value() as Command[];
  }

  private read_spi(args: any[]) {
    log.warn('read_spi not implemented yet.');
  }
  private write_spi(args: any[]) {
    log.warn('write_spi not implemented yet.');
  }
  private wait_interrupt(args: any[]) {
    log.warn('wait_interrupt not implemented yet.');
  }
  private moveCommand(srcIndex: number, destIndex: number) {
    if (destIndex >= this.queue.length) {
      return;
    }

    if (destIndex < 0) {
      return;
    }

    this.queue.splice(destIndex, 0, this.queue.splice(srcIndex, 1)[0]);
  }
}
