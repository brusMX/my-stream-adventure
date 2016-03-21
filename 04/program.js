var through = require('through2');
var stream = through(write, end);
function write(buffer, encoding, next ){
    var str = buffer.toString();
    str = str.toUpperCase();
    this.push(str);
    next();
}
function end (done) {
    done();
}
stream.on('error', function(error) {  
    console.error(error);
})
process.stdin.pipe(stream).pipe(process.stdout);