define('module/cycle__component', [], function () {


    
    function module(elem, _scope){

      var cycleController;
      var config = {
          slides: $(elem).find($(elem).attr('data-slides')),
          fx : $(elem).attr('data-fx') || 'scrollHorz',
          speed: $(elem).attr('data-speed') || 1100,
          timeout: parseInt($(elem).attr('data-timeout')) || 3000,
          swipe: true,
          autoHeight: 'calc'
      };

      if(config.slides.length == 0){
          $(elem).css('display', 'none');
          return;
      }

      if(config.slides.length > 1){
          $(elem).find('[data-cycle-prev], [data-cycle-next]').css('display', 'block');
      }

      cycleController = ($(elem).find($(elem).attr('data-container')).length > 0) ? $(elem).find($(elem).attr('data-container')) : $(elem);

      initCycleWithPager(config, cycleController, $(elem).find($(elem).attr('data-pager')));

      $(elem).find('[data-prevSlide]').click(function(){
          cycleController.cycle('prev');
      });

      $(elem).find('[data-nextSlide]').click(function(){
          cycleController.cycle('next');
      });


    }

    return module;

});