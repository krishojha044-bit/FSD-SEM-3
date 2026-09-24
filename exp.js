const fs = require('fs');
console.log('1:start(sync)');

setTimeout(() => {
    console.log('2:inside setTimeout (macrotask-runs LAST)');
}, 2000);

Promise.resolve().then(() => {
    console.log('3:inside promise.then (microtask-runs BEFORE setTimeout)');
});

fs.readFile(__filename, () => {
    console.log('4:inside fs.readFile callback (I/O)');
});

console.log('5:end (sync)');
// vcconsole.log('1: Start (sync)');

// setTimeout(() => {
//     console.log('2: setTimeout (macrotask - timers phase)');
// }, 0);

// setImmediate(() => {
//     console.log('3: setImmediate (macrotask - check phase)');
// });

// process.nextTick(() => {
//     console.log('4: process.nextTick (highest priority microtask)');
// });

// Promise.resolve().then(() => {
//     console.log('5: Promise.then (microtask)');
// });
// console.log('6:end(sync');