define('module/angular/directives/cycle', [
	'module/angular/directives/main',
	], function (module) {


		module.directive('cycleComp', ['$rootScope', '$injector', '$compile', function($rootScope, $injector, $compile) {
		  return {
		  	restrict: 'EA',
		    compile: function(e, a){
		        //console.log($(e).html(), arguments);
		        return function(scope, elem, attrs) {
		        	var cycleController;
		        	var config = {
			            slides: $(elem).attr('data-slides'),
			            fx : $(elem).attr('data-fx') || 'scrollHorz',
			            speed: $(elem).attr('data-speed') || 1100,
			            timeout: parseInt($(elem).attr('data-timeout')) || 3000,
			            swipe: true,
			            autoHeight: 'calc'
			        };

			        cycleController = ($(elem).find($(elem).attr('data-container')).length > 0) ? $(elem).find($(elem).attr('data-container')) : $(elem);


        			$(elem).find('[data-prevSlide]').click(function(){
			            cycleController.cycle('prev');
			        });

			        $(elem).find('[data-nextSlide]').click(function(){
			            cycleController.cycle('next');
			        });

			        scope.$on("$destroy", function() {
		        		cycleController.cycle('destroy');
				    });

				    setTimeout(function(){
				    	$(elem).removeClass('loading');
				    	
				    	if($(elem).find(config.slides).length == 0){
				            $(elem).css('display', 'none');
				            return;
				        }

				        if($(elem).find(config.slides).length <= 1){
				        	$(elem).find('[data-prevSlide]').css('display', 'none');
				        	$(elem).find('[data-nextSlide]').css('display', 'none');
				        	return;
				        }
	        			

				        if($(config.slides).length > 1){
				            $(elem).find('[data-cycle-prev], [data-cycle-next]').css('display', 'block');
				        }

				    	initCycleWithPager(config, cycleController, $(elem).find($(elem).attr('data-pager')));
				    }, 500);

		        }
		    }
		  };
		}]);


    return module;

});
