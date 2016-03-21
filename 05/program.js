var through = require('through2');
var split = require('split');
var stream = through (write,end);
var index = 1;
function write(buffer, encoding, callback){
    var str = buffer.toString().toLowerCase() + "\n";
    if(index%2 ==0) str = str.toUpperCase();
    this.push(str);
    index++;
    callback();
}
function end (done) {
    done();
}
stream.on('error', function(error) {  
    console.error(error);
})
process.stdin   
    .pipe(split())
    .pipe(stream)
    .pipe(process.stdout);