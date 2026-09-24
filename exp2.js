const EventEmitter=require('events');
class Button extends EventEmitter {};
const button = newButton();
button.on('click ,{} => { 
    console.log('Button Clicked');
});
button.on('')


