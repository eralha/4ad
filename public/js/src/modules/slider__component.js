define('module/slider__component', ['module/content__slider_v2'], function (contentSlider) {
  
      
      function module(elem, _scope){
        var sup = this;
            sup.elem = elem;
  
        
        setTimeout(function(){
          sup.init(elem);
        }, 100);
      }
  
      module.prototype.startCycle = function(timeout){
        var sup = this;
  
        //Cycle automático das noticias
          sup.intervalId = setInterval(function(){
  
            var visibleCount = $(sup.elem).find('[data-visible="true"]').length;
  
            //console.log(sup.slider.currSlide, (sup.slider.slideNum - visibleCount));
  
            if(sup.slider.currSlide == (sup.slider.slideNum - visibleCount)){
              sup.slider.setSlideNum(0);
            }else{
              sup.slider.nextSlide();
            }
          }, timeout);
      }
  
      module.prototype.stopCycle = function(){
        clearInterval(this.intervalId);
      }
      
      module.prototype.init = function(elem){
        var sup = this;
        var config = {};
  
            config.slider = $(elem).find($(elem).attr('data-slider')) || $(elem).find('.c-galeria__thumbs_slider');
            config.slides = $(elem).find($(elem).attr('data-slides')) || $(elem).find('.c-galeria__thumb');
            config.version = $(elem).attr('data-version') || null;
            config.timeout = $(elem).attr('data-timeout') || 4000;
            config.enabledrag = true;
            config.slideAmount = $(elem).attr('data-slide-amount') || undefined;//num items to slide when showing a next page
  
        var thumbs = ($(elem).find('.c-galeria__thumbs').length > 0) ? $(elem).find('.c-galeria__thumbs') : elem;
        var slider = new contentSlider(thumbs, config);
            this.slider = slider;
  
          slider.onChange = function(currSlide, lastSlide){
            sup.stopCycle();
            sup.startCycle(config.timeout);
            var visibleItems = $(config.slider).find('[data-visible="true"]').length;
            if(sup.onChange){
              sup.onChange(currSlide, lastSlide);
            }
          }
  
          //navegação dos thumbs
          $(elem).find('[data-prev]').click(function(){
            slider.prevSlide();
          });
          $(elem).find('[data-next]').click(function(){
            slider.nextSlide();
          });
  
          //start anim
          this.startCycle(config.timeout);
          
      }
  
      return module;
  
  });