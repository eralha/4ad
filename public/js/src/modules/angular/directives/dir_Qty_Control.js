define('module/angular/directives/dir_Qty_Control', [
    'module/angular/directives/main'
    ], function (module) {
  
  
        module.directive('dirQtyControl', ['$rootScope', '$injector', function($rootScope, $injector) {
            return {
                    restrict: 'EA',
                    scope: {
                        obj: '=',
                        prop: '@'
                    },
                    templateUrl: '/templates/dir_qty_control.html?v='+JS_VERSION,
                    compile: function(e, a){
                        //console.log($(e).html(), arguments);
                        return function(scope, elem, attrs) {

                                    //console.log(scope);

                                    scope.remVal = function(){
                                        if(scope.obj[scope.prop] == undefined){ scope.obj[scope.prop] = 1; }
                                        scope.obj[scope.prop] = parseInt(scope.obj[scope.prop]) - 1;
                                    }

                                    scope.addVal = function(){
                                        if(scope.obj[scope.prop] == undefined){ scope.obj[scope.prop] = 1; }
                                        scope.obj[scope.prop] = parseInt(scope.obj[scope.prop]) + 1;
                                    }

                        }
                    }
            };
        }]);
  
  
      return module;
  
  });
  