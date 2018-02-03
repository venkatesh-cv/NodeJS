var _ = require('underscore');

var basePerson = {
 firstName:'',
 lastName:'',
 gender:'',
 age:0,
 isAdult:function(person){
	if(person){
	return person.age >= 18;
	}else{
		return 0;
	}
 }
};

function person(argObject){
 _.extend(this,basePerson, argObject);
}
module.exports = person;