var http = require('http');
var through = require('through2');
var stream = through(write,end);
function write(line, encoding, callback){
    this.push(line.toString().toUpperCase());
    callback();
}
function end(end){
    end();
}
function serve(req,res){
    if (req.method === 'POST') {
        req.pipe(stream).pipe(res);
    }
}
var server = http.createServer(serve);
server.listen(process.argv[2]);