define('module/angular/PartyCtrll', [
	'module/angular/MainCtrll',
	], function (app) {

		
		app.controller('PartyCtrll', ['$scope', '$rootScope', 'dataService', 'langService', 'ngProgressFactory', '$state', '$sce', '$filter', '$stateParams', 'gameDataService',
		function($scope, $rootScope, dataService, langService, ngProgressFactory, $state, $sce, $filter, $stateParams, gameDataService) {

			var scope = $scope;

			scope.partyId = $stateParams.partyId;

			var stored = gameDataService.getPartyData($stateParams.partyId);

			//dataLayer.push({'event' : 'Party_Loaded', 'party_name' : stored.name});

			ga('send', {
				hitType: 'event',
				eventCategory: 'Party',
				eventAction: 'Load',
				eventLabel: 'Name: '+stored.name
			  });

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
