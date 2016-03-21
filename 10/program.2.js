var through = require('through2');
var trumpet = require('trumpet');
var stream = through(write);
var tr = trumpet();
tr.pipe(process.stdout);
var ws = tr.select('.loud').createStream();
ws.pipe(stream)
    .pipe(ws);
//ws.end()
function write(buffer,encoding,end){   
    this.push(buffer.toString().toUpperCase());
    //process.stdout.write(buffer.toString().toUpperCase()); 
    end();
}

process.stdin
    .pipe(tr)
    //.pipe(process.stdout)