var concat = require('concat-stream');
var through = require('through2');
var stream = through (write,end);
var str = "";
function reverse(s){
    return s.split("").reverse().join("");
}
function write(buffer, encoding, callback){
    concat(concatenate(buffer.toString()));
    callback();
}
function end(done){
    this.push(reverse(str));
    done();
}
function concatenate(body){
     str += body.toString();
}

stream.on('error', function(error) {  
    console.error(error);
})
process.stdin
    .pipe(stream)
    .pipe(process.stdout);