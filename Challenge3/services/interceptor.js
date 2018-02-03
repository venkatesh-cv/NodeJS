		var _interceptors = function(){
			var _interceptors=  [];
			var _add = function(fnInterceptor){
						_interceptors.push(fnInterceptor);
						}		
			var _run = function(invoker){
					_interceptors.forEach(function(interceptor){
					interceptor.apply(invoker,arguments);
				});
			}
			return {
				add:_add,				
				run: _run
			}
		};
		
		module.exports = _interceptors;