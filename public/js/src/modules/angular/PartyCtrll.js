define('module/angular/PartyCtrll', [
	'module/angular/MainCtrll',
	], function (app) {

		
		app.controller('PartyCtrll', ['$scope', '$rootScope', 'dataService', 'langService', 'ngProgressFactory', '$state', '$sce', '$filter', '$stateParams',
		function($scope, $rootScope, dataService, langService, ngProgressFactory, $state, $sce, $filter, $stateParams) {

			var scope = $scope;

			scope.partyId = $stateParams.partyId;

			scope.sheetSelected = 'heroSheet1';
			scope.selectHeroSheet = function(sheetNum){
				scope.sheetSelected = 'heroSheet'+sheetNum;
			}

			scope.rollDice = function(dice){
				$rootScope.addLayerDice(dice, scope.sheetSelected);
			}

		}]);

    return app;

});
