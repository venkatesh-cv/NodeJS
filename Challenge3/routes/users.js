var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var processInfoRequest = function(req, res, next){
console.log(req.body);
 res.render('index',{
	title:"Super Express",
	name:req.body.firstName
 });
 }
 

router.get('/info',processInfoRequest);

router.post('/info',processInfoRequest);

module.exports = router;
