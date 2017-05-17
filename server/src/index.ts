// import 'rpio';
// console.log("Starting RPIO.");

import Lowdb = require('lowdb');
import log = require('winston');

import * as WebSocket from 'ws';

import { Message, pinState } from '../../src/messages';
import { Gpio } from './gpio';

const db = new Lowdb('db.json');

const gpio = new Gpio();

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
      case 'command':
      log.warn('Command message not implemented yet.');
      break;

      default:
      log.warn('Unknown message', {message});
    }
  });

  ws.on('close', (code, message) => {
    log.info('Closed', {message, code});
  });

  gpio.getState().pins.forEach((p) => {
    ws.send(pinState(p));
  });

});
