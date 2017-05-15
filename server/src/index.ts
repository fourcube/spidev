// import 'rpio';
// console.log("Starting RPIO.");

import * as WebSocket from 'ws';
import Lowdb = require('lowdb');
import { pinState, Message } from "../../src/messages";
import { Gpio } from "./gpio";

const db = new Lowdb("db.json");

const gpio = new Gpio();

const wss = new WebSocket.Server({
  perMessageDeflate: false,
  port: 8080
});

wss.on('connection', (ws) => {
  console.log("Connected.");

  ws.on('message', (message) => {
    const data = <Message>JSON.parse(message);
    switch(data.type) {
      case "pin_state":

      const pin = data.payload;
      ws.send(pinState(pin.id, pin.direction, pin.value));

      break;
    }
  });

  ws.on('close', (code, message) => {
    console.log("Closed", message, "(", code, ")");
  });

  gpio.getState().pins.forEach((p) => {
    ws.send(pinState(p.id, p.direction, p.value));
  });


});
