const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// greet event
myEmitter.on("greet", () => {
    console.log("Hello! Welcome.");
});

// exit event
myEmitter.on("exit", () => {
    console.log("Exiting the program...");
});

// Trigger events
myEmitter.emit("greet");
myEmitter.emit("exit");