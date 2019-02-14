define('module/angular/directives/common', [
	'module/angular/directives/main',
	'module/angular/directives/cycle',
	'module/angular/directives/dir_slider_component',
	'module/angular/directives/dir_Qty_Control',
	'module/angular/directives/dir_Hero_Sheet_Ctrll',
	'module/angular/directives/dir_Top_Info',
	'module/angular/directives/dir_Layer_Roll',
	'module/angular/directives/dir_Layer_Item_Info'
], function (module) {


		module.directive('eventClickTracker', ['$rootScope', '$injector', function($rootScope, $injector) {
		  return {
		  	restrict: 'A',
		  	priority: 10,
		    compile: function(e, a){
		        //console.log($(e).html(), arguments);
		        return function(scope, element, attrs) {

		        	if(attrs.eventClickTracker){
		        		$(element).click(function(){
		        			//console.log(attrs.eventType, attrs.eventName);
		        			ga('send', 'event', 'UI - EVENT', 'click', attrs.eventClickTracker);
		        		});
		        	}

		        }
		    }
		  };
		}]);

		module.directive('dirFbShare', ['$rootScope', '$injector', function($rootScope, $injector) {
		  return {
		  	restrict: 'EA',
		    compile: function(e, a){
		        return function(scope, elem, attrs) {
		        	$(elem).click(fbShare);
		        }
		    }
		  };
		}]);

		module.directive('dirTwShare', ['$rootScope', '$injector', function($rootScope, $injector) {
		  return {
		  	restrict: 'EA',
		    compile: function(e, a){
		        return function(scope, elem, attrs) {
		        	$(elem).click(twShare);
		        }
		    }
		  };
		}]);

		module.directive('dirMenuSelected', ['$rootScope', '$injector', 'navService', function($rootScope, $injector, navService) {
		  return {
		  	restrict: 'EA',
		    compile: function(e, a){
		        return function(scope, elem, attrs) {
		        	setTimeout(function(){
								var href = $(elem).attr('href');
								var id = attrs.dirMenuSelected;
								
								navService.getPageAreaId().then(function(areaId){
									console.log(areaId);
									if(id == areaId){ $(elem).addClass('selected'); }
								}, function(areaId){
									//reject
								});

		        	}, 200);
		        }
		    }
		  };
		}]);

		module.directive('linkExterno', ['$rootScope', '$injector', function($rootScope, $injector) {
		  return {
		  	restrict: 'EA',
		    compile: function(e, a){
		        return function(scope, element, attrs) {
		        	var href = attrs.linkExterno;

		        	if(href == 'True'){
		        		$(element).attr('target', '_blank');
		        	}

		        }
		    }
		  };
		}]);

		module.directive('dirLayer', ['$rootScope', '$injector', function($rootScope, $injector) {
		  return {
		  	restrict: 'EA',
		    compile: function(e, a){
		        //console.log($(e).html(), arguments);
		        return function(scope, elem, attrs) {

		        	$(elem).find('.content').click(function(e){
		        		e.stopPropagation();
							});
							
		        	$(elem).find('.bg').click(function(){
		        		$(elem).remove();
		        	});

		        }
		    }
		  };
		}]);

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
