var zlib = require('zlib');
var crypto = require('crypto');
var tar = require('tar');
var concat = require('concat-stream');


var cipher_type = process.argv[2];
var cipher_pass = process.argv[3];

var decipher = crypto.createDecipher(cipher_type, cipher_pass);
var gunzip = zlib.createGunzip()
var tarser = tar.Parse();

var str = "";
tarser.on('entry', function (e) {
    var hasher = crypto.createHash('md5', { encoding: 'hex' });
    if (e.type == "File")
        e.pipe(hasher).pipe(concat(function(data){
            console.log(data + ' ' + e.path)
        }));
});

process.stdin
    .pipe(decipher)
    .pipe(gunzip)
    .pipe(tarser)
