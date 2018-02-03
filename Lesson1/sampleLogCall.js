var logger = require('./logger');
logger.debug('hello world');
logger.error('sorry');

var utilModule = require('./UtilModule');

var util = new utilModule();
util.debug('hello new module');
util.error('hello error module');

var person = require('./person');
var p = new person(
{
 firstName:"john",
 age:25
}
);
var isAdu = p.isAdult;
console.log(isAdu(p));
console.log(p.isAdult(p));