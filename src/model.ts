export type PinValue = 'LOW' | 'HIGH';
export type PinDirection = 'IN' | 'OUT';
export type PinResistor = 'NONE' | 'PULL_UP' | 'PULL_DOWN';
export interface Pin {
  id: number;
  value: PinValue;
  direction: PinDirection;
  resistor: PinResistor;
  color: string;
}

export interface PinState {
  pins: Pin[];
}

export type CommandType = 'read_spi' | 'write_spi' | 'wait_interrupt';

export interface BasicCommand {
  id: number;
  type: CommandType;
  arguments: any[];
}

export interface ReadSpiCommand extends BasicCommand {
  type: 'read_spi';
}

export interface WriteSpiCommand extends BasicCommand {
  type: 'write_spi';
}

export interface WaitInterruptCommand extends BasicCommand {
  type: 'wait_interrupt';
}

export type Command = ReadSpiCommand | WriteSpiCommand | WaitInterruptCommand;

export interface CommandResult extends BasicCommand {
  results: any[];
}
