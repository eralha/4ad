define('module/angular/controllers/ParseLinkCtrll', [
	'module/angular/controllers/MainCtrll',
	], function (app) {

		
		app.controller('ParseLinkCtrll', ['$scope', '$rootScope', 'dataService', 'gameDataService', 'ngProgressFactory', '$stateParams', '$sce', '$filter', '$state',
		function($scope, $rootScope, dataService, gameDataService, ngProgressFactory, $stateParams, $sce, $filter, $state) {

			var data = $stateParams.linkData;
			var json = Base64.decode(data);

			//add link data to scope variable
			$scope.linkData = angular.fromJson(json);

			$scope.overwriteData = function(){
				if(!$scope.linkData){ return; }
				gameDataService.overWriteData($scope.linkData);

				$scope.linkData = null;

				$state.go('home');
			}

			$scope.concatenateData = function(){
				if(!$scope.linkData){ return; }
				gameDataService.concatenateData($scope.linkData);

				$scope.linkData = null;

				$state.go('home');
			}

		}]);

    return app;

});
