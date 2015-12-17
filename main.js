window.nar = (function( window ){
  var obj = {
    'current_version' : '0.1',
    'api' : {},
  };

  obj.version = function(){
    return 'Currently running version ' + obj.current_version + ' of TBA Analysis';
  }

  return obj;
})(window);
