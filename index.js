const logEvents = require("./logEvents");

const EventEmmiter = require("events");

class MyEmitter extends EventEmmiter {}

//initialize object
const myEmitter = new MyEmitter();

//add a litener for a log event
myEmitter.on("log", (msg) => logEvents(msg));

//emit event
myEmitter.emit("log", "log event emmited");
