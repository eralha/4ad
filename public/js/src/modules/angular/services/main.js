define('module/angular/services/main', [
	'angular'
	], function () {


	var module = angular.module('app.Services', []);


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
			sup = this;

			this.loadHeroData = function(){
			    var lang = langService.lang;
				var path = '/data/heros.json';

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
				var path = '/data/weapons.json';

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
				var path = '/data/items.json';

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
				var path = '/data/armor.json';

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
				var path = '/data/spells.json';

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
