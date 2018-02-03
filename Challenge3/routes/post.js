var express = require('express');
var postService = require('../services/postService');
var postEntity = require('../entities/post');
var router = express.Router();


// this is the equivalent of a controller

// this maps to GET:/post
router.get('/', function(req, res, next){		
	var processFindAllResults = function(error,posts){			
			var response = res;
			console.log(">>>>>>>>>>>>>>>>>>>RESULT ROWS:"+posts.length+"<<<<<<<<<<<<<<<<<<<<<<");			
			response.render('post',{results:posts});
		}
	console.log(postService);
	postService.findAll(processFindAllResults); 
});

router.get('/json',function(req,res){
		var processFindAllResults = function(error,posts){			
			var response = res;
			response.send(posts);
		}
		postService.findAll(processFindAllResults);
});

// this maps to POST:/post
router.post('/', function(req, res){
	var title = req.body.title;
	var post = req.body.post;
	var processSave = function(){
		res.redirect('post')
	}
	var post = new postEntity({
		title:title,
		post:post
	});
		console.log(post.title);
	console.log(post.post);
	postService.save(post, processSave);		
});

module.exports = router;