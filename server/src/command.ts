import { Command } from '../../src/model';
import log = require('winston');
import { Gpio } from './gpio';

export class CommandService {
  private queue: Command[] = [];

  constructor(private gpio: Gpio) {}

  public enqueue(command: Command) {
    this.queue.push(command);
  }

  public remove(id: number) {
    this.queue = this.queue.filter((c) => c.id !== id);
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
    this.queue.length = 0;
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
}
