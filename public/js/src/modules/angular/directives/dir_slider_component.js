define('module/angular/directives/dir_slider_component', [
  'module/angular/directives/main',
  'module/slider__component'
  ], function (module, sliderComp) {


    module.directive('dirSliderComponent', ['$rootScope', '$injector', '$compile', function($rootScope, $injector, $compile) {
      return {
        restrict: 'EA',
        compile: function(e, a){
            //console.log($(e).html(), arguments);
            return function(scope, elem, attrs) {

              var slider;

              function init(){
                $(elem).removeClass('loading');

                  slider = new sliderComp(elem);
                  var sliderElem = $(elem).find($(elem).attr('data-slider'));
                  var slides = $(elem).find($(elem).attr('data-slides'));

                  /*Pager*/
                  setTimeout(function() {
                    scope.pager = new Array();
                    for(var i = 0; i < (slider.slider.stepTotal); i++){
                      scope.pager.push(i);
                    }
                    scope.$apply();
                    console.log(scope.pager, slider.stepTotal);
                  }, 150);

                  scope.setSlideNum = function(num){
                    slider.slider.setSlideNum(num);
                  }

                  slider.onChange = function(currSlide, lastSlide){
                    //console.log(currSlide, lastSlide);
                    scope.selectPage = currSlide;
                    //scope.$apply();
                  }

                  if(Boolean(attrs.autoHeight) == true){
                    var h;

                    $(window).resize(function(){
                      h = 0;
                      $(slides).each(function(){
                        h = ($(this).outerHeight(true) > h) ? $(this).outerHeight(true) : h;
                      });
                      $(elem).height(h);
                    }).trigger('resize');

                    //console.log(h);
                    $(elem).height(h);
                  }
              }

              function run(){

                /*
                  se ja existir um slider instanciado forçamos um trigger à window resize
                  isto vai fazer com que o componente de slide se actualize.
                */
                if(slider){
                  $(window).trigger('resize');
                }

                if(attrs.noImageLoad){ 
                  init(); 
                }else{
                  deferImagesLoad(elem, init);//end defer images load
                }
              }//end run init

              /*
                se for dada instrução para esperar pelo carregamento de lista de paginas esperamos
                senão corre de imediato
              */
              if(attrs.waitPageList == 'true'){
                $rootScope.$on("pageListLoaded", function(e, attrs){
                  setTimeout(run, 100);
                });
              }else{
                run();
              }

              
            }//end return
        }
      };
    }]);


    return module;

});
