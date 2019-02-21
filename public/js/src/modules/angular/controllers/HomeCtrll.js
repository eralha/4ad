define('module/angular/controllers/HomeCtrll', [
	'module/angular/controllers/MainCtrll',
	], function (app) {

		
		app.controller('HomeCtrll', ['$scope', '$rootScope', 'dataService', 'gameDataService', 'ngProgressFactory', '$state', '$sce', '$filter',
		function($scope, $rootScope, dataService, gameDataService, ngProgressFactory, $state, $sce, $filter) {

			$rootScope.$on('$viewContentLoaded', 
			function(event, toState, toParams, fromState, fromParams, options){ 
			    $scope.dataCopied = null;
				$scope.dataLink = null;
			});

			$rootScope.gamesData = gameDataService.getGamesData();

			$scope.showNewGameModal = function(){
				$scope.newGameName = '';
				$scope.isCreateGameVisible = true;
			}

			$scope.closeNewGameModal = function(){
				$scope.isCreateGameVisible = false;
			}

			$scope.startNewGame = function(){
				if($scope.newGameName == ''){ return; }

				var gameObj = gameDataService.createNewGame($scope.newGameName);

				$scope.closeNewGameModal();
				$state.go('party', {partyId: gameObj.id});
			}

			function copyToClipboard(_text) {
				var $temp = $("<input>");
				$("body").append($temp);
				$temp.val(_text).select();
				document.execCommand("copy");
				$temp.remove();
			  }

			$scope.getLinkToData = function(){
				var adress = 'http://fouragainstdarkness.herokuapp.com/#!/parse_link/';
				//var adress = 'http://localhost:8080/#!/parse_link/';
				var data = gameDataService.getGamesData();

				var link = adress + window.Base64.encode(angular.toJson(data));
				copyToClipboard(link);

				$scope.dataCopied = true;
				$scope.dataLink = link;
			}

			$scope.shareData = function(){
				window.open("http://www.facebook.com/sharer/sharer.php?u="+$scope.dataLink+"?v="+Math.random());
			}

		}]);

    return app;

});
