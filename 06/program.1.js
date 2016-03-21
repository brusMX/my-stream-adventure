var concat = require('concat-stream');

var str = "";

function reverse(s){
    return s.split("").reverse().join("");
}

function concatenate(body){
     console.log(reverse(body.toString()));
}

process.stdin
    .pipe(concat(concatenate))