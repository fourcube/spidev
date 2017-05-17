import { Command, CommandResult, Pin, PinDirection, PinResistor, PinValue, ReadSpiCommand } from './model';

/**
 * Model interfaces and classes.
 */
export interface PinStateMessage {
  type: 'pin_state';
  payload: Pin;
}

export interface AddCommandMessage {
  type: 'add_command';
  payload: Command;
}

export interface RemoveCommandMessage {
  type: 'remove_command';
  /**
   * The command id to remove.
   */
  payload: {id: number};
}

export interface CommandResultMessage {
  type: 'command_result';
  payload: CommandResult;
}

export type Message = PinStateMessage | AddCommandMessage | CommandResultMessage | RemoveCommandMessage;

/**
 * Message generating functions.
 */

export function pinState(pin: Pin) {
  return jsonResponse('pin_state', pin);
}

export function addCommand(command: Command) {
  return jsonResponse('add_command', command);
}

export function commandResult(command: Command) {
  return jsonResponse('command_result', command);
}

export function removeCommand(command: Command) {
  return jsonResponse('remove_command', {id: command.id});
}

function jsonResponse(messageType: string, payload: any) {
  return JSON.stringify({
    type: messageType,
    payload
  });
}
