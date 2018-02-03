var express = require('express');
var _interceptors = require('./interceptor');

var baseService = function(){		
		var addService= function (serviceMethod){					
			// return a proxy wrapping the actual function
			return function(){				
				var invoker = this;
				
				// The callback method MUST be always the last argument. 
				var callback = arguments[arguments.length-1];
				
				// invoke all the before interceptors
				bInterceptors.run.apply(invoker,arguments);				
				
				// wrap the callback with after interceptors
				var wrappedCallback = function(){					
					// invoke with the main service caller
					aInterceptors.run.apply(invoker,arguments);					
					console.log('invoking wrapped callback with '+arguments);
					callback.apply(invoker,arguments);					
				}
				
				// replace the original callback with the wrapped callback
				var newArgArray = [];
				var i= 0;
				var argLength = arguments.length - 1;				
				var argArray = arguments;				
				Array.prototype.slice.call(arguments).forEach(function(arg){					
					if(i !== argLength)
					{						
						newArgArray.push(arg);
						i++;
					}else
					{						
						newArgArray.push(wrappedCallback);
						
					}
				});								
				
				// now invoke the main method. wrapped callback will handle the after interceptors
				serviceMethod.apply(invoker,newArgArray);
			};		
		}				
		
		var bInterceptors = _interceptors();
		var aInterceptors = _interceptors();
		
		return{
			beforeInterceptors:bInterceptors,
			afterInterceptors:aInterceptors,
			newService:addService
		}	
}();

module.exports = baseService;