define('module/angular/controllers/MainCtrll', [], function () {


	var app = angular.module('app.Controllers', []);

	//generic controlers go here
	app.controller('MainCtrll', ['$scope', '$rootScope', 'dataService', 'langService', 'ngProgressFactory', '$state', '$sce', '$filter', '$compile',
	function($scope, $rootScope, dataService, langService, ngProgressFactory, $state, $sce, $filter, $compile) {

		$rootScope.JS_VERSION = JS_VERSION;

		$scope.progressbar = ngProgressFactory.createInstance();

		$rootScope.$on('$viewContentLoading', 
		function(event, toState, toParams, fromState, fromParams, options){ 

			$scope.progressbar.start();
		});

		$rootScope.$on('$viewContentLoaded', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			$scope.progressbar.complete();
		});
		
		$rootScope.parseHtml = function(html){
			return $sce.trustAsHtml(html);
		}

		$scope.translate = function(key){
			return langService.translate(key);
		}

		$scope.scrollToTop = function(selector){
			$("html, body").stop().animate({scrollTop: 0}, 1000, 'swing');
		}

		$scope.toggleMenu = function(){
			$scope.menuVisible = !$scope.menuVisible;
		}

		$rootScope.addLayerDice = function(dice, sheetName){
			//$rootScope.scrollToElement('.JS_ATK_DEF_INFO');
			var compiled = $compile('<div dir-Layer dir-Layer-Roll="'+dice+'" data-sheet="'+sheetName+'"></div>')($scope);
			
			$('body').append(compiled);
		}

		$rootScope.addLayerItemInfo = function(item){
			var layerScope = $scope.$new(true);
				layerScope.item = item;

			var compiled = $compile('<div dir-Layer dir-Layer-Item-Info item="item"></div>')(layerScope);
			
			$('body').append(compiled);
		}
		
		$rootScope.scrollToElement = function(selector){
			if($(selector).length == 0){ return; }

			var sc = $(selector).offset().top;

			$("html, body").stop().animate({scrollTop: sc}, 0, 'swing');
		}

	}]);


    return app;

});
