const fs = require('fs')
fs.writeFile('example.txt','Node.js File System Practice',(err)=>{
    if(err) throw err;
    console.log('file created!');
    fs.readFile('example.txt','utf8',(err,data)=>{
        console.log('file content:',data)
    });
});
fs.writeFile('example.txt','this is the updated content.',(err)=>{
    if(err) throw err;
    console.log('file overwritten (updated)!');
});
fs.appendFile('example.txt','\nthis line was deleted',(err)=>{
    if(err)throw err;
    console.log('file updated (appednded)!');
});
fs.unlink('example.txt',(err)=>{
    if(err)throw err
})


