var http  = require('http');
http.createServer(function(request,response){
	response.writeHead(200,{'content-type':'text/plain'});
	response.end('hello there');
}).listen('8080');
console.log('server started on http://localhost:8080');