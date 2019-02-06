define('module/angular/directives/dir_offscreen_img', ['module/angular/directives/main'], function (module) {


		module.directive('dirOffscreenImg', ['$rootScope', '$injector', function($rootScope, $injector) {
		  return {
		  	restrict: 'EA',
		    compile: function(e, a){
		        //console.log($(e).html(), arguments);
		        return function(scope, elem, attrs) {

		        	function scrollHandler(){
						var wsct = $(window).scrollTop();
		        		var eofst = $(elem).offset().top;
		        		var wH = $(window).height();

		        		console.log(attrs.dirOffscreenImg);

	        			if((eofst - wsct) < wH + 100 && !$(elem).hasClass('image_added')){
		        			$(elem).addClass('image_added');
		        			$(elem).attr('src', attrs.dirOffscreenImg);

		        			$(window).unbind('scroll', scrollHandler);
	        			}
					}

					$(window).scroll(scrollHandler).trigger('scroll');

		        }
		    }
		  };
		}]);


    return module;

});
