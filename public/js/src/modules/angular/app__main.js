define('module/angular/app__main', [
	'lib/ngProgress',
	'lib/ngAnimate',
	'lib/ui.router',
	'module/angular/services/main',
	'module/angular/directives/common'
	], function () {


	var app = angular.module('app', ['app.Services', 'app.Directives', 'ui.router', 'ngAnimate', 'ngProgress']);


		app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

			$locationProvider.html5Mode({
			  enabled: false,
			  requireBase: false
			});

	        $stateProvider
			    .state('home', {
				  url: "/",
				  controller: 'HomeCtrll',
			      templateUrl: "/templates/home.html"
				})
				.state('party', {
					url: "/party/:partyId",
					controller: 'PartyCtrll',
					templateUrl: "/templates/party.html"
				})
				
				;

				$urlRouterProvider.otherwise("/");

	    }]);
		


	    //generic controlers go here
	    app.controller('MainCtrll', ['$scope', '$rootScope', 'dataService', 'langService', 'ngProgressFactory', '$state', '$sce', '$filter', '$compile',
	    	function($scope, $rootScope, dataService, langService, ngProgressFactory, $state, $sce, $filter, $compile) {

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
					sc -= 120;

	    		if($(window).width() < mobile){
	    			sc -= 80;
	    		}

	    		$("html, body").stop().animate({scrollTop: sc}, 1000, 'swing');
	    	}

		}]);

		app.controller('HomeCtrll', ['$scope', '$rootScope', 'dataService', 'gameDataService', 'ngProgressFactory', '$state', '$sce', '$filter',
		function($scope, $rootScope, dataService, gameDataService, ngProgressFactory, $state, $sce, $filter) {

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

		}]);

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
		
		//generic controlers go here
	    app.controller('HeroCtrll', ['$scope', '$rootScope', 'dataService', 'ngProgressFactory', '$state', '$sce', '$filter', 'gameDataService', '$stateParams',
		function($scope, $rootScope, dataService, ngProgressFactory, $state, $sce, $filter, gameDataService, $stateParams) {

			var scope =  $scope;

			scope.numberList = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);

			scope.emptyVal = '--';
			scope.selectedClass = scope.emptyVal;

			var hero = {};
				hero.gold = 0;//level
				//class
				//atkValue
				//defValue
				hero.level = 1;
				hero.clues = 0;
				hero.madness = 0;
				//life
				hero.wounds = '0';
				//status
				//clues
				//madness
				//expertSkills
				hero.weapons = new Array();
				hero.armor = new Array();
				hero.items = new Array();
				hero.spells = new Array();
				//heroDataTbl

			
			dataService.loadHeroData().then(function(data){
				console.log(data);
				scope.heroClasses = data;
			});

			dataService.loadWeaponsData().then(function(data){
				var c = 0;
				for(var i in data){
					data[i].id = c;
					c ++;
				}
				scope.dataWeapons = data;
			});

			dataService.loadItemsData().then(function(data){
				var c = 0;
				for(var i in data){
					data[i].id = c;
					c ++;
				}
				scope.dataItems = data;
			});

			dataService.loadArmorData().then(function(data){
				var c = 0;
				for(var i in data){
					data[i].id = c;
					c ++;
				}
				scope.dataArmor = data;
			});

			dataService.loadSpellsData().then(function(data){
				var c = 0;
				for(var i in data){
					data[i].id = c;
					c ++;
				}
				scope.dataSpells = data;
			});

			scope.heroClassSelected = function(){
				var classData = scope.heroClasses[scope.selectedClass];
				hero.class = classData.class;
				hero.heroDataTbl = classData;
			}

			scope.addItem = function(placeholder, item){
				if(placeholder == 'weapons'){ item = scope.dataWeapons[item]; }
				if(placeholder == 'items'){ item = scope.dataItems[item]; }
				if(placeholder == 'armor'){ item = scope.dataArmor[item]; }
				if(placeholder == 'spells'){ item = scope.dataSpells[item]; }

				item = angular.copy(item);
				item.id = Math.random()*60000000;

				hero[placeholder].push(item);
			}
			scope.removeItem = function(placeholder, index){
				hero[placeholder].splice(index, 1);
			}

			scope.GETHEROATTACK = function(selectedWeapon) {
				var data = -2;

				var heroName = hero.class;
				var lvl = parseInt(hero.level);
				var selectedWeapon = (hero.weapons[selectedWeapon]) ? hero.weapons[selectedWeapon].name : '';

				//console.log('selectedWeapon', selectedWeapon, heroName, lvl);

				if(selectedWeapon){
					if(String(selectedWeapon).indexOf('lh') != -1){ data = -1; }
					if(String(selectedWeapon).indexOf('1h') != -1 || String(selectedWeapon).indexOf('bow') != -1){ data = 0; }
					if(String(selectedWeapon).indexOf('2h') != -1){ data = 1; }
					
					if(String(selectedWeapon).indexOf('+1') != -1){ data = data + 1; }
					if(String(selectedWeapon).indexOf('+2') != -1){ data = data + 2; }
					if(String(selectedWeapon).indexOf('+3') != -1){ data = data + 3; }
					
					if(heroName == 'Warrior'){ data = data + lvl; }
					if(heroName == 'Dwarf'){ data = data + lvl; }
					if(heroName == 'Elf'){ data = data + lvl; }
					if(heroName == 'Barbarian'){ data = data + lvl; }
					if(heroName == 'Rogue'){}
					if(heroName == 'Cleric'){ data = data + Math.floor(lvl / 2); }
					if(heroName == 'Halfling'){}
					if(heroName == 'Wizard'){}
				}
				
				return 'Attack ('+data+'+roll)';
			}

			scope.GETHERODEFENSE = function(armorSlot1, armorSlot2, armorSlot3, armorSlot4) {
				var data = 0;

				armorSlot1 = (hero.armor[armorSlot1]) ? hero.armor[armorSlot1].name : '';
				armorSlot2 = (hero.armor[armorSlot2]) ? hero.armor[armorSlot2].name : '';

				var searchArr = [armorSlot1, armorSlot2];
				
				var armorTypes = new Array({name:'light armor', mod: 1}, {name: 'heavy armor',mod: 2}, {name: 'shield', mod: 1});
				var plusMods = new Array({name:'+1', mod: 1}, {name:'+2', mod: 2}, {name:'+3', mod: 3}, {name:'+4', mod: 4});
				
				for(var i = 0; i < searchArr.length; i++){
					for(var j = 0; j < armorTypes.length; j++){
					if(String(searchArr[i]).indexOf(armorTypes[j].name) != -1){ data = data + armorTypes[j].mod; }
					}
				}
				
				for(var i = 0; i < searchArr.length; i++){
					for(var j = 0; j < plusMods.length; j++){
					if(String(searchArr[i]).indexOf(plusMods[j].name) != -1){ data = data + plusMods[j].mod; }
					}
				}
				
				return 'Deffense ('+data+')';
			}

			scope.getItemImage = function(item){
				if(String(item.name).indexOf('Scroll') != -1){ return 'https://blzmedia-a.akamaihd.net/d3/icons/items/large/p2_actbountyreagent_01_demonhunter_male.png'; }

				return item.image;
			}

			scope.hero = hero;

			//ve se existe data gravada
			setTimeout(function(){
				var sheetName = scope.sheetName;
				var stored = gameDataService.getSheetData($stateParams.partyId, sheetName);

				//console.log('partyid', $stateParams.partyId, 'sheetname', sheetName, 'stored', stored);

				if(stored){
					hero = angular.copy(stored);
					scope.hero = hero;
					$rootScope[sheetName] = scope.hero;
					scope.$apply();
				}

				scope.$watch('hero', function(){
					//console.log(hero, scope.sheetName);
					if(hero.heroDataTbl){
						hero.life = hero.heroDataTbl.startLife + parseInt(hero.level);
						hero.life = hero.life - parseInt(hero.wounds);

						hero.atkStr = scope.GETHEROATTACK(hero.SelectedWeapon);
						hero.defStr = scope.GETHERODEFENSE(hero.armorSlot1, hero.armorSlot2, '', '');
					}
	
					if(!$rootScope.sheetData){ $rootScope.sheetData = {}; }
	
					if(scope.sheetName){
						gameDataService.saveSheetData($stateParams.partyId, scope.sheetName, angular.copy(hero));
					}
				}, true);
			}, 10);

		}]);
	    
    $('.js_loading').removeClass('js_loading');
    $('.angular-loading').removeClass('angular-loading');
    
    angular.bootstrap(document, ['app']);

    return app;

});
