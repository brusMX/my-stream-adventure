var trumpet = require('trumpet');
var tr = trumpet();
tr.pipe(process.stdout);
var ws = tr.select('.loud').createStream();
ws.on('data',function(data){
    process.stdout.write(data.toString().toUpperCase()); 
});
ws.end();
process.stdin
    .pipe(tr);