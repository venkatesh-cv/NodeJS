
UtilModule = function(){
 console.log('initialized');
};

UtilModule.prototype.debug = function(msg){
  console.log(new Date()+":"+msg);
};

UtilModule.prototype.error = function(msg){
  console.error(new Date()+":"+msg);
};

module.exports = UtilModule;