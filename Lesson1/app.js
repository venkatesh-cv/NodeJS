var express = require('express');
var person = require('./person');
var bp = require('body-parser');

var app = express();
app.use(bp.urlencoded({extended:false}));
app.use(bp.json());

var contextSetter = function(request, response, next){
	request.user = {
		firstName:'john',
		lastName:'doe',
		isAdmin:false
	};
	next();
}
app.use(contextSetter);

var p = new person({
 firstName:'john',
 lastName:'doe'
});

app.get('/',function(request, response){
	response.send(p);
});

app.post('/doStuff',function(request, response){		
	var param = request.body.foo;
	response.send({
		foo:param,
		isAdmin:request.user.isAdmin
	});
});

app.listen(3000);