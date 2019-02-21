define('module/angular/directives/main', [], function () {


	var module = angular.module('app.Directives', []);


		module.directive('renderGpePage', ['$rootScope', '$injector', '$compile', 'dataService', 'templateService', '$timeout', '$sce',
			function($rootScope, $injector, $compile, dataService, templateService, $timeout, $sce) {
			  return {
			  	restrict: 'EA',
			    compile: function(e, a){
			        //console.log($(e).html(), arguments);
			        return function(scope, element, attrs) {

						scope.parseHtml = function(html){
							return $sce.trustAsHtml(html);
						}

						function pageLoaded(data){
							scope.page = data[0];
							$rootScope.page = data[0];

							var directive = templateService.getTemplateDirective(scope.page.Template);

							if(attrs.pageDirective){
								directive = attrs.pageDirective;
							}

							var compiled = $compile(directive)(scope);
							element.html(compiled);
						}

						function pageNotFound(){
							//console.log('page url NOT found');
							var directive = templateService.getTemplateDirective('notFound');

							var compiled = $compile(directive)(scope);
							element.html(compiled);
						}

						function loadPageFromURL(){
							dataService.loadPageData().then(function(data){
								pageLoaded(data);
							}, function(error){
								console.log(error);
								pageNotFound();
							});
						}

						function loadPageFromID(id){
							dataService.loadPage(id).then(function(data){
								pageLoaded(data);
							}, function(){
								pageNotFound();
							});
						}

						scope.$watch('lang', function(){
							if(attrs.pageId){
								loadPageFromID(attrs.pageId);
							}else{
								loadPageFromURL();
							}
						});

			        }
			    }
			  };
		}]);

		module.directive('dirLoadPage', ['$rootScope', '$injector', 'dataService', '$sce', function($rootScope, $injector, dataService, $sce) {
		  return {
		  	restrict: 'A',
		    compile: function(e, a){
		        //console.log($(e).html(), arguments);
		        return function(scope, element, attrs) {

							scope.$watch('lang', function(){
								dataService.loadPage(attrs.dirLoadPage).then(function(data){
										scope.loadedPage = data[0];

										if(typeof scope.loadedPage.Texto1 == 'string'){
											scope.loadedPage.Texto1 = $sce.trustAsHtml(scope.loadedPage.Texto1);
										}

										if(typeof scope.loadedPage.Texto2 == 'string'){
											scope.loadedPage.Texto2 = $sce.trustAsHtml(scope.loadedPage.Texto2);
										}
										scope.$emit("pageLoaded", scope.loadedPage);
								});
							});

							scope.parseHtml = $rootScope.parseHtml;

		        }
		    }
		  };
		}]);

		module.directive('gpePage', ['$rootScope', '$injector', function($rootScope, $injector) {
		  return {
		  	restrict: 'EA',
		    compile: function(e, a){
		        //console.log($(e).html(), arguments);
		        return function(scope, element, attrs) {
		        	//Code common for GPE pages
		        }
		    }
		  };
		}]);

		module.directive('compileHtml', ['$rootScope', '$injector', '$compile', function($rootScope, $injector, $compile) {
		  return {
		  	restrict: 'EA',
		    compile: function(e, a){
		        //console.log($(e).html(), arguments);
		        return function(scope, element, attrs) {
		        	
		        	var html = scope.page[attrs.compileHtml];
							var compiled = $compile(html)(scope);
							
							//console.log(attrs.compileHtml, html);

							element.html(compiled);
		        }
		    }
		  };
		}]);

		module.directive('pageNotFound', ['$rootScope', '$injector', function($rootScope, $injector) {
		  return {
		  	restrict: 'EA',
		  	templateUrl: '/templates/page_not_found.aspx',
		    compile: function(e, a){
		        //console.log($(e).html(), arguments);
		        return function(scope, element, attrs) {

		        }
		    }
		  };
		}]);

		module.directive('fullPageGpeTemp', ['$rootScope', '$injector', function($rootScope, $injector) {
		  return {
		  	restrict: 'EA',
		  	templateUrl: '/templates/full_page_gpe_temp.aspx',
		    compile: function(e, a){
		        //console.log($(e).html(), arguments);
		        return function(scope, element, attrs) {

		        }
		    }
		  };
		}]);

		module.directive('defaultGpeTemp', ['$rootScope', '$injector', function($rootScope, $injector) {
		  return {
		  	restrict: 'EA',
		  	templateUrl: '/templates/default_gpe_temp.aspx',
		    compile: function(e, a){
		        //console.log($(e).html(), arguments);
		        return function(scope, element, attrs) {

		        }
		    }
		  };
		}]);

		module.directive('dirPageListRender', ['$rootScope', '$injector', 'dataService', '$filter', '$compile', 'langService', 
			function($rootScope, $injector, dataService, $filter, $compile, langService) {
			return {
				restrict: 'EA',
				scope : {},
				compile: function(e, a){
						//console.log($(e).html(), arguments);

						var directiveHTML = $(e).html();
							directiveHTML = directiveHTML.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
						$(e).html('');

						return function(scope, element, attrs) {

							dataService.loadPageListData().then(function(data){

								console.log(data);

								scope.pageListData = data;
								
								scope.currPage = attrs.currPage;

								//console.log(attrs);
								//console.log(scope.pageListData);

								//se tivermos em mobile e existir area key para mobile 
								if(attrs.areakeyMobile && $(window).width() < mobile){
									attrs.areakey = attrs.areakeyMobile;
								}

								//filtra todas as paginas dentro de todas as areas com a Key especifica
							if(attrs.areakey){
								var areas = $filter('filter')(data.areas, {CampoLivre1: attrs.areakey});
								var paginas = new Array();

								for(f in areas){
									var p = $filter('filter')(data.paginas, {IdArea: areas[f].Id}, true);
									paginas = paginas.concat(p);
								}

								scope.pages = paginas;
							}

							//Filtra todas as páginas dentro de todas as sub areas com a key especifica
							if(attrs.subareakey){
								var subareas = $filter('filter')(data.subAreas, {CampoLivre1: attrs.subareakey});
								var paginas = new Array();

								for(f in subareas){
									var p = $filter('filter')(data.paginas, {IdSubArea: subareas[f].Id}, true);
									paginas = paginas.concat(p);
								}

								scope.pages = paginas;
							}
							
							//Filtra todas as páginas dentro de todas as sub areas com a key especifica
							if(attrs.subareaId){
								var areas = areas || data.areas; 
								var subareas = data.subAreas;
								var paginas = $filter('filter')(data.paginas, {IdSubArea: attrs.subareaId}, true);

								scope.pages = paginas;
							}

							//Filtra todas as páginas dentro de todas as sub areas que existam em menu
							if(attrs.subareamenu){
								var subareas = $filter('filter')(subareas, {Menu: attrs.subareamenu});
								var paginas = new Array();

								for(f in subareas){
									var p = $filter('filter')(data.paginas, {IdSubArea: subareas[f].Id}, true);
									paginas = paginas.concat(p);
								}

								scope.pages = paginas;
							}

							//console.log(scope.pages);

							scope.getScrollPath = $rootScope.getScrollPath;
							scope.translate = $rootScope.translate;
							scope.lang = $rootScope.lang;

							var compiled = $compile(directiveHTML)(scope);
							element.html(compiled);


						});//end promisse parse

					}
				}
			};
		}]);


    return module;

});
