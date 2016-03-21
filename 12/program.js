var duplex = require("duplexer2"), 
through = require('through2');

var my_count ={};
module.exports = function (counter) {
    var ws = through.obj(write,end);

    function write(line, encoding, callback){
        //console.log(line);
        if(line.country in my_count) my_count[line.country]++;
        else my_count[line.country] =1;
        callback();
    }
    function end(callback){
        counter.setCounts(my_count);
        callback();
    }
    // return a duplex stream to count countries on the writable side
    // and pass through `counter` on the readable side

    return duplex({objectMode: true}, ws, counter);
};