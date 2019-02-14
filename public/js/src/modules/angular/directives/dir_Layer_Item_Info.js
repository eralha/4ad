define('module/angular/directives/dir_Layer_Item_Info', [
    'module/angular/directives/main'
    ], function (module) {
  
  
        module.directive('dirLayerItemInfo', ['$rootScope', '$injector', function($rootScope, $injector) {
            return {
                    restrict: 'EA',
                    scope: {
                        item: '='
                    },
                    templateUrl: '/templates/dir_item_info.html',
                compile: function(e, a){
                    //console.log($(e).html(), arguments);
                    return function(scope, elem, attrs) {
                    }
                }
            };
        }]);
  
  
      return module;
  
  });
  