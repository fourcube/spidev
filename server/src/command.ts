import { ReorderOp } from '../../src/messages';
import { Command } from '../../src/model';
import log = require('winston');
import { Gpio } from './gpio';
import Lowdb = require('lowdb');

export class CommandService {
  private queue: Command[];
  private commandIdSeq: number;

  constructor(private gpio: Gpio,
              private db: Lowdb) {
    this.commandIdSeq = db.get('commandIdSeq').value() as number;
    this.updateQueue();
  }

  public enqueue(commands: Command[]) {
    commands.forEach((c) => {
      c.id = this.genId();
    });

    this.db.get('commands').push(...commands).write();
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

    this.db.set('commands', this.queue).write();
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
        case 'pin_setup':
          this.pin_setup(command.arguments);
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
  private pin_setup(args: number[]) {
    if (args.length < 4) {
      log.error('invalid number of arguments for pin_setup command', {args});
    }

    const [idSclk, idMiso, idMosi, idCs] = args;
    log.warn('pin_setup not implemented yet.');
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
  private genId(): number {
    let id = this.db.get('commandIdSeq').value() as number;
    this.db.set('commandIdSeq', ++id).write();
    return id;
  }
}
