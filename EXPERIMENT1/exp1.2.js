const EventEmitter = require("events");

const button = new EventEmitter();

// Click event
button.on("click", () => {
    console.log("Button clicked!");
});

// Mouseover event
button.on("mouseover", () => {
    console.log("Mouse over button!");
});

// Simulate events
button.emit("click");
button.emit("mouseover");
button.emit("click");