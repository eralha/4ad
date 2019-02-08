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
				.state('parse_link', {
					url: "/parse_link/:linkData",
					controller: 'ParseLinkCtrll',
					templateUrl: "/templates/parse_link.html"
				  })
				.state('party', {
					url: "/party/:partyId",
					controller: 'PartyCtrll',
					templateUrl: "/templates/party.html"
				})
				
				;

				$urlRouterProvider.otherwise("/");

	    }]);
		
		// Create Base64 Object
		var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}


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

		app.controller('ParseLinkCtrll', ['$scope', '$rootScope', 'dataService', 'gameDataService', 'ngProgressFactory', '$stateParams', '$sce', '$filter',
		function($scope, $rootScope, dataService, gameDataService, ngProgressFactory, $stateParams, $sce, $filter) {

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

				var link = adress + Base64.encode(angular.toJson(data));
				copyToClipboard(link);

				$scope.dataCopied = true;
				$scope.dataLink = link;
			}

			$scope.shareData = function(){
				window.open("http://www.facebook.com/sharer/sharer.php?u="+$scope.dataLink+"?v="+Math.random());
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

				//added later need to check this on store load
				hero.expertSkills = new Array();

			
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

			dataService.loadSkillsData().then(function(data){
				var c = 0;
				for(var i in data){
					data[i].id = c;
					c ++;
				}
				scope.dataExpertSkills = data;
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
				if(placeholder == 'expertSkills'){ item = scope.dataExpertSkills[item]; }

				item = angular.copy(item);

				if(placeholder == 'items' || placeholder == 'spells'){
					item.controllValue = 1;
					item.id = Math.random()*60000000;
				}

				console.log(hero);

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

					//check for missing propertis between versions
					if(!hero.expertSkills){
						hero.expertSkills = new Array();
					}

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
