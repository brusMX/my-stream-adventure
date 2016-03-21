var combine = require('stream-combiner')
var through = require('through2');
var split = require('split');
var zlib = require('zlib');
module.exports = function () {
    var gzip = zlib.createGzip();
    var stream = through(write,end);
    var my_genres = []; 
    function write(buffer, encoding, callback){
        if (buffer.length === 0) return callback();
        var line = JSON.parse(buffer)
        if(line.type == "genre"){
            //if(my_genres.length >0) this.push(JSON.stringify(my_genres[my_genres.length -1]) + '\n');
            var new_genre = {};
            new_genre["name"] = line.name;
            new_genre["books"] = [];
            my_genres.push(new_genre);


        }
        if(line.type == "book"){
            my_genres[my_genres.length - 1].books.push(line.name);
        }

        callback();
    }
    function end (done) {
        my_genres.forEach((elem)=>this.push(JSON.stringify(elem) + "\n"));
        //if(my_genres)this.push(JSON.stringify(my_genres[my_genres.length -1]) + '\n');
        done();
    }
    stream.on('error', function(error) {  
        console.error(error);
    })
    return combine(split(), stream, gzip)
}

