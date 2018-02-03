exports.debug = function(msg){
console.log(new Date()+":"+msg);
}

exports.error = function(msg){
 console.error(new Date()+":"+msg);
}