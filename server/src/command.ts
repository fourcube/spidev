import { ReorderOp } from '../../src/messages';
import { Command } from '../../src/model';
import log = require('winston');
import { Gpio } from './gpio';

const INITIAL_COMMAND_QUEUE: Command[] = [
  {
    arguments: [0x00],
    id: 0,
    type: 'read_spi',
  },
  {
    arguments: [0x01, 0xff],
    id: 1,
    type: 'write_spi',
  },
];

export class CommandService {
  private queue: Command[];

  constructor(private gpio: Gpio) {
    this.queue = INITIAL_COMMAND_QUEUE.slice(0);
  }

  public enqueue(commands: Command[]) {
    this.queue = this.queue.concat(commands);
  }

  public remove(id: number) {
    this.queue = this.queue.filter((c) => c.id !== id);
  }

  public reorder(op: ReorderOp) {
    const commandIndex = this.queue.findIndex((c) => c.id === op.id);
    if (commandIndex < 0) {
      log.warn('Unknown command for reordering', op);
      return false;
    }

    switch (op.direction) {
      case 'UP':
        this.moveCommand(commandIndex, commandIndex + 1);
      case 'DOWN':
        this.moveCommand(commandIndex, commandIndex - 1);
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
