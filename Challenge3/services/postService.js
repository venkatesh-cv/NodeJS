var mongoose = require('mongoose');
var post = require('../entities/post');
var baseService = require('./baseService');

exports.save = baseService.newService(function(post, callmeback){
	console.log('save');
	if(post)
	{		
		console.log('title:'+post.title);
		console.log('post:'+post.post);
		post.save(function(err){
			if(err)
			{
				console.log('error occurred during save');
			}
			callmeback();
		});		
	}
});

exports.findAll =   baseService.newService(function(callmeback){	
	console.log('findAll');	
	post.find().exec(function(err, results){
		var invoker = this;
		console.log(results.length);
		if(err){
			console.log(err);			
			err = '500:an error occured when performing the query. please retry or contact the administrator';
		}				
		console.log(callmeback);
		callmeback.apply(invoker,[err, results]);
	});	
});