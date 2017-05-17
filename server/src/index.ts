import { addCommand, Message, pinState, removeCommand } from '../../src/messages';
import { Command } from '../../src/model';
import { CommandService } from './command';
import { Gpio } from './gpio';
import Lowdb = require('lowdb');
import log = require('winston');
import * as WebSocket from 'ws';
// import 'rpio';
// console.log("Starting RPIO.");

const db = new Lowdb('db.json');

const gpio = new Gpio();
const commandService = new CommandService(gpio);

const wss = new WebSocket.Server({
  perMessageDeflate: false,
  port: 8080,
});

wss.on('connection', (ws) => {
  log.info('New connection.');

  ws.on('message', (message) => {
    const data = JSON.parse(message) as Message;
    switch (data.type) {
      case 'pin_state':
        const pin = data.payload;
        gpio.update(pin);

        ws.send(pinState(pin));

        break;
      case 'add_command':
        const newCommand = data.payload;
        commandService.enqueue(newCommand);
        // TODO: Commands should only run when the user clicks "run"
        commandService.execute();
        ws.send(addCommand(newCommand));
        break;

      case 'remove_command':
        const toBeDeleted = data.payload as Command;

        commandService.remove(toBeDeleted.id);
        ws.send(removeCommand(toBeDeleted));
        break;

      default:
        log.warn('Unknown message', { message });
    }
  });

  ws.on('close', (code, message) => {
    log.info('Closed', { message, code });
  });

  gpio.getState().pins.forEach((p) => {
    ws.send(pinState(p));
  });

});
