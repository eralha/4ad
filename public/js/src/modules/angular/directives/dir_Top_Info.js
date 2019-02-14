define('module/angular/directives/dir_Top_Info', [
    'module/angular/directives/main'
    ], function (module) {
  
  
        module.directive('dirTopInfo', ['$rootScope', '$injector', function($rootScope, $injector) {
            return {
                restrict: 'EA',
                compile: function(e, a){
                    //console.log($(e).html(), arguments);
                    return function(scope, elem, attrs) {
    
                                var ww = $(window).width();
    
                                $(window).scroll(function(){
    
                                    var st = $(window).scrollTop();
                                    var showAt = 100;//px scroll
    
                                    if(ww <= ipadPortrait && st >= showAt){
                                        $(elem).addClass('visible');
                                    }else{
                                        $(elem).removeClass('visible');
                                    }
    
                                });
    
                    }
                }
            };
          }]);
  
  
      return module;
  
  });
  