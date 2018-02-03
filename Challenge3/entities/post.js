var mongoose = require('mongoose');
var postSchema = mongoose.Schema({
	title:String,
	post:String	
});

var post = mongoose.model('post',postSchema);


module.exports = post;