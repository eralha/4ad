define('module/angular/directives/dir_Layer_Roll', [
    'module/angular/directives/main'
    ], function (module) {
  
  
        module.directive('dirLayerRoll', ['$rootScope', '$injector', function($rootScope, $injector) {
            return {
            restrict: 'EA',
            scope: {},
            templateUrl: '/templates/dir_layer_roll.html',
              compile: function(e, a){
                  //console.log($(e).html(), arguments);
                  return function(scope, elem, attrs) {
  
                              var sheetName = attrs.sheet;
                              var dice = parseInt(attrs.dirLayerRoll);
                              scope.hero = $rootScope[sheetName];
                              scope.roll = Math.ceil(Math.random()*dice);
  
                              if(dice == 6 && scope.roll >= 6){ scope.critical = true; }
                              if(dice == 8 && scope.roll >= 7){ scope.critical = true; }
  
                              scope.remWound = function(){
                                  scope.hero.wounds = parseInt(scope.hero.wounds) - 1;
                              }
  
                              scope.addWound = function(){
                                  scope.hero.wounds = parseInt(scope.hero.wounds) + 1;
                              }
  
                  }
              }
            };
          }]);
  
  
      return module;
  
  });
  