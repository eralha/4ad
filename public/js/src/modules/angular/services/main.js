define('module/angular/services/main', [], function () {


	var module = angular.module('app.Services', []);


        module.service('gameDataService', ['$q', '$http', '$filter', '$rootScope', function($q, $http, $filter, $rootScope) {

			var dataBaseName = 'fourADDataBase';
			var data = localStorage.getItem(dataBaseName);
				data = angular.fromJson(data);

			//se não existir data guardada associamos a um array
			/*
				estrutura:
				[
					game = {
						name: 
						id:
						party : [
							"sheet1" : {}
							"sheet2" : {}
							"sheet3" : {}
							"sheet4" : {}
						]
					}
				]
			*/
			if(!data){
				data = [];
			}

			this.getGamesData = function(){
				return data;
			}

			this.overWriteData = function(newData){
				data = angular.copy(newData);
				this.saveData();

				return data;
			}

			this.concatenateData = function(newData){
				newData = angular.copy(newData);
				data = data.concat(newData);

				for(var i in data){
					data[i].id = Math.round(Math.random()*999999999999);
				}

				this.saveData();
				
				return data;
			}

			this.createNewGame = function(gameName){
				var obj = {};
					obj.name = gameName;
					obj.id = Math.round(Math.random()*999999999999);
					obj.party = {};

				data.push(obj);

				this.saveData();

				return obj;
			}

			this.saveSheetData = function(partyId, sheetName, sheetData){
				partyId = parseInt(partyId);
				var game = $filter('filter')(data, {id: partyId}, true)[0];

				//console.log(game, sheetName, sheetData, partyId);

				//se nao encontrar nenhuma party
				if(!game){ return; }

					game.party[sheetName] = sheetData;

				this.saveData();
			}

			this.saveData = function(){
				localStorage.setItem(dataBaseName, angular.toJson(data));
			}

			this.getSheetData = function(partyId, sheetName){
				partyId = parseInt(partyId);
				var game = $filter('filter')(data, {id: partyId}, true)[0];

				//console.log('get sheet data', game);

				return (game) ? game.party[sheetName] : null;
			}

			this.getPartyData = function(partyId){
				partyId = parseInt(partyId);
				return $filter('filter')(data, {id: partyId}, true)[0];
			}

            return this;
		}]);
		

		module.service('langService', ['$q', '$http', '$filter', '$rootScope', function($q, $http, $filter, $rootScope) {
			
			this.lang;
			this.langData = {};
			this.langDefer = $q.defer();
			this.loading;
			var sup = this;

			return this;
		}]);
	    

		module.service('dataService', ['$q', '$http', '$filter', 'langService', function($q, $http, $filter, langService) {

			this.data = {};
			this.menuData;
			this.menuDefer = {};
			this.pageListDefer = {};
			this.pagesDefer = {};
			this.loading = false;

			this.deferList = {};

			sup = this;

			this.loadData = function(path){
				//var path = '/data/heros.json';

				//create defer object and call ajax
				if(this.deferList[path]){
					return this.deferList[path].promise;
				}

				this.deferList[path] = $q.defer();

				var defer = this.deferList[path];

				var pathID = String(path).split('?');
					pathID = pathID[0];

				//se já carregamos este url não o voltamos a carregar
				if(sup.data[path]){
					defer.resolve(sup.data[path]);
					return defer.promise;
				}

            	$http.get(path).then(function(data, status, headers, config) {
				  data = data.data;
				  sup.data[path] = data;
				  
				  //put the data on local storage for offline use only
				  localStorage.setItem(pathID, angular.toJson(data));

		          defer.resolve(sup.data[path]);
		        }, function(data, status, headers, config) {
					
					var data = localStorage.getItem(pathID);
						data = angular.fromJson(data);

					if(data){
						console.log('Resolving from local storage', pathID);
						defer.resolve(data);
					}else{
						console.log('defer rejected', path);
						defer.reject();
					}
		        });

            	return defer.promise;
			}

			this.loadHeroData = function(){
			    var lang = langService.lang;
				//var path = '/data/heros.json';
				var path = '/heros';

				//create defer object and call ajax
				var defer = $q.defer();

				//se já carregamos este url não o voltamos a carregar
				if(sup.data[path]){
					defer.resolve(sup.data[path]);
					return defer.promise;
				}

            	$http.get(path).then(function(data, status, headers, config) {
				  data = data.data;
		          sup.data[path] = data;
		          defer.resolve(sup.data[path]);
		        }, function(data, status, headers, config) {
		          defer.reject();
		        });

            	return defer.promise;
			}

			this.loadWeaponsData = function(){
			    var lang = langService.lang;
				//var path = '/data/weapons.json';
				var path = '/weapons';

				//create defer object and call ajax
				var defer = $q.defer();

				//se já carregamos este url não o voltamos a carregar
				if(sup.data[path]){
					defer.resolve(sup.data[path]);
					return defer.promise;
				}

            	$http.get(path).then(function(data, status, headers, config) {
				  data = data.data;
		          sup.data[path] = data;
		          defer.resolve(sup.data[path]);
		        }, function(data, status, headers, config) {
		          defer.reject();
		        });

            	return defer.promise;
			}

			this.loadItemsData = function(){
			    var lang = langService.lang;
				//var path = '/data/items.json';
				var path = '/items';

				//create defer object and call ajax
				var defer = $q.defer();

				//se já carregamos este url não o voltamos a carregar
				if(sup.data[path]){
					defer.resolve(sup.data[path]);
					return defer.promise;
				}

            	$http.get(path).then(function(data, status, headers, config) {
				  data = data.data;
		          sup.data[path] = data;
		          defer.resolve(sup.data[path]);
		        }, function(data, status, headers, config) {
		          defer.reject();
		        });

            	return defer.promise;
			}

			this.loadArmorData = function(){
			    var lang = langService.lang;
				//var path = '/data/armor.json';
				var path = '/armor';

				//create defer object and call ajax
				var defer = $q.defer();

				//se já carregamos este url não o voltamos a carregar
				if(sup.data[path]){
					defer.resolve(sup.data[path]);
					return defer.promise;
				}

            	$http.get(path).then(function(data, status, headers, config) {
				  data = data.data;
		          sup.data[path] = data;
		          defer.resolve(sup.data[path]);
		        }, function(data, status, headers, config) {
		          defer.reject();
		        });

            	return defer.promise;
			}

			this.loadSpellsData = function(){
			    var lang = langService.lang;
				//var path = '/data/spells.json';
				var path = '/spells';

				//create defer object and call ajax
				var defer = $q.defer();

				//se já carregamos este url não o voltamos a carregar
				if(sup.data[path]){
					defer.resolve(sup.data[path]);
					return defer.promise;
				}

            	$http.get(path).then(function(data, status, headers, config) {
				  data = data.data;
		          sup.data[path] = data;
		          defer.resolve(sup.data[path]);
		        }, function(data, status, headers, config) {
		          defer.reject();
		        });

            	return defer.promise;
			}

			this.loadSkillsData = function(){
			    var lang = langService.lang;
				//var path = '/data/expert_skills.json';
				var path = '/expert_skills';

				//create defer object and call ajax
				var defer = $q.defer();

				//se já carregamos este url não o voltamos a carregar
				if(sup.data[path]){
					defer.resolve(sup.data[path]);
					return defer.promise;
				}

            	$http.get(path).then(function(data, status, headers, config) {
				  data = data.data;
		          sup.data[path] = data;
		          defer.resolve(sup.data[path]);
		        }, function(data, status, headers, config) {
		          defer.reject();
		        });

            	return defer.promise;
			}


            return this;
        }]);


    return module;

});
