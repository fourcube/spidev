import { Command, CommandResult, Pin, PinDirection, PinResistor, PinValue, ReadSpiCommand } from './model';

/**
 * Model interfaces and classes.
 */
export interface PinStateMessage {
  type: 'pin_state';
  payload: Pin;
}

export interface CommandMessage {
  type: 'command';
  payload: Command;
}

export interface CommandResultMessage {
  type: 'command_result';
  payload: CommandResult;
}

export type Message = PinStateMessage | CommandMessage | CommandResultMessage;

/**
 * Message generating functions.
 */

export function pinState(pin: Pin) {
  return jsonResponse('pin_state', pin);
}

export function command(command: Command) {
  return jsonResponse('command', command);
}

export function commandResult(command: Command) {
  return jsonResponse('command_result', command);
}

function jsonResponse(messageType: string, payload: any) {
  return JSON.stringify({
    type: messageType,
    payload
  });
}
