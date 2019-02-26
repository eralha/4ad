define('module/angular/controllers/GetallCtrll', [
	'module/angular/controllers/MainCtrll',
	], function (app) {

		
		app.controller('GetallCtrll', ['$scope', '$rootScope', 'dataService', 'langService', 'ngProgressFactory', '$state', '$sce', '$filter', '$stateParams', 'gameDataService',
		function($scope, $rootScope, dataService, langService, ngProgressFactory, $state, $sce, $filter, $stateParams, gameDataService) {

            var scope = $scope;
            var hero = {}
                hero.level = 1;

			function parseItemImageData(data){
				var folder = '/images/4ad/items_by_name/';
				for(var i in data){
					//se as imagens de base de dados não estiverem a vir do heroku colocamos a pasta de nomes estáticos
					if(String(data[i].image).indexOf('/images/4ad/') == -1){
						data[i].image = folder + data[i].name+'.png';
					}
				}//for
			}

			dataService.loadData('/json/weapons?v='+JS_VERSION).then(function(data){
				var c = 0;
				for(var i in data){
					data[i].id = c;
					c ++;
				}
				parseItemImageData(data);
				scope.dataWeapons = data;
			});

			dataService.loadData('/json/items?v='+JS_VERSION).then(function(data){
				var c = 0;
				for(var i in data){
					data[i].id = c;
					c ++;
				}
				parseItemImageData(data);
                scope.dataItems = data;
                scope.dataItems.push({ image: '/images/4ad/items_by_name/gem_1_1.png.png' });
                scope.dataItems.push({ image: '/images/4ad/items_by_name/gem_1_2.png.png' });
                scope.dataItems.push({ image: '/images/4ad/items_by_name/gem_1_3.png.png' });
                scope.dataItems.push({ image: '/images/4ad/items_by_name/gem_1_4.png.png' });
                scope.dataItems.push({ image: '/images/4ad/items_by_name/gem_1_5.png.png' });
                scope.dataItems.push({ image: '/images/4ad/items_by_name/gem_2_1.png.png' });
                scope.dataItems.push({ image: '/images/4ad/items_by_name/gem_2_2.png.png' });
                scope.dataItems.push({ image: '/images/4ad/items_by_name/gem_2_3.png.png' });
                scope.dataItems.push({ image: '/images/4ad/items_by_name/gem_2_4.png.png' });
                scope.dataItems.push({ image: '/images/4ad/items_by_name/gem_2_5.png.png' });
			});

			dataService.loadData('/json/armor?v='+JS_VERSION).then(function(data){
				var c = 0;
				for(var i in data){
					data[i].id = c;
					c ++;
				}
				parseItemImageData(data);
				scope.dataArmor = data;
			});

		}]);

    return app;

});
