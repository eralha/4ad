define('module/angular/directives/dir_Hero_Sheet_Ctrll', [
    'module/angular/directives/main'
    ], function (module) {
  
  
        module.directive('dirHeroSheetCtrll', ['$rootScope', '$injector', function($rootScope, $injector) {
            return {
                    restrict: 'EA',
                    scope: {},
                    templateUrl: '/templates/dir_hero_sheet_ctrll.html?v='+JS_VERSION,
                compile: function(e, a){
                    //console.log($(e).html(), arguments);
                    return function(scope, elem, attrs) {

                                scope.sheetName = attrs.dirHeroSheetCtrll;
                                scope.addLayerItemInfo = $rootScope.addLayerItemInfo;

                    }
                }
            };
        }]);
  
  
      return module;
  
  });
  