define('module/angular/directives/dir_load_more', [
  'module/angular/directives/main'
  ], function (module, Masonry) {
    


      module.directive('dirLoadMore', ['$rootScope', '$injector', function($rootScope, $injector) {
      return {
        restrict: 'A',
        compile: function(e, a){
            //console.log($(e).html(), arguments);
            return function(scope, elem, attrs) {

              var itemLimit = parseInt(attrs.dirLoadMore);
              var items = $(elem).find(attrs.items);

          function addItems(){
            var total = 0;
            $(items).each(function(){
              if(total < itemLimit && !$(this).hasClass('visible')){
                $(this).addClass('visible');
                $(this).find('[data-src]').attr('src', $(this).find('[data-src]').attr('data-src'));

                total ++;
              }
            });

            var visible = $(elem).find(attrs.items+'.visible');
            if($(visible).length >= $(items).length){
              scope.hideMoreButton = true;
            }
          }

          scope.showMore = function(){
            addItems();
          }

          //primeira passagem para mostrar items por defeito
          addItems();
            }
        }
      };
    }]);




    return module;

});
