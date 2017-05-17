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

export interface ReorderOp {
  id: number;
  direction: 'UP' | 'DOWN';
}
export interface ReorderCommandMessage {
  type: 'reorder_command';
  payload: ReorderOp;
}

export interface CommandResultMessage {
  type: 'command_result';
  payload: CommandResult;
}

export type Message =
  PinStateMessage |
  AddCommandMessage |
  CommandResultMessage |
  RemoveCommandMessage |
  ReorderCommandMessage;

/**
 * Message generating functions.
 */

export function pinState(pin: Pin) {
  return jsonResponse('pin_state', pin);
}

export function addCommand(commands: Command[]) {
  return jsonResponse('add_command', commands);
}

export function reorderCommand(command: Command, direction: 'UP' | 'DOWN') {
  return jsonResponse('reorder_command', {
    id: command.id,
    direction
  });
}

export function commandResult(command: Command) {
  return jsonResponse('command_result', command);
}

export function removeCommand(command: Command) {
  return jsonResponse('remove_command', {id: command.id});
}

export function jsonResponse(messageType: string, payload: any) {
  return JSON.stringify({
    type: messageType,
    payload
  });
}
