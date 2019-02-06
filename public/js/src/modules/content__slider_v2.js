define('module/content__slider_v2', ['lib/hammer'], function (Hammer) {
  
  
      /*
       * 
       * This require a specific css style aplyed to the folowing structure
       *
       *
      <section class="main__content" data-component="module/content__slider" data-enabledrag="true" data-hashtag="localizacao">
          <!-- THIS WILL SLIDE ALL THE CONTENTS -->
          <div class="main__content-slider">
  
            <div class="content__container" style="background-image: url('http://lorempixel.com/1024/765/');">
              <!-- PUT CONTENT IN HERE -->
            </div>
  
          </div>
        </section>
      */
  
      /*
       * Specific CSS to apply
       *
          
          .main__content-slider {
            position: relative;
            min-width: 100%; // This can be whatever you want
            min-height: 100%; // This can be whatever you want
            &.anim { .transition(0.3s); } // This need to be here for slide css based animation
          }
          .content__container { //This should fill the slider viewport in order to slide from one content to another
            position: absolute;
            width: 100%;
            height: 100%;
          }
  
       */
  
       /*
       VERSION: 2
       Versão 2 acrescenta uma funcionalidade de slide diferente, o item atual fica centrado no container
       */
  
      
      function module(elem, config){
          var sup = this;
          this.elem = elem;
          this.config = config;
          this.slider = config.slider || $(elem).find('.slider');
          this.slides = config.slides || $(elem).find('.slide');
          this.slideNum = $(this.slides).length;
          this.currSlide = 0;
          this.dragLimit = $(this.slider).width() * 0.05;
          this.friction = 2.5;
          this.startOffset = 0;
          this.hammer = new Hammer($(this.slider).get(0));
          this.slideDirection = config.slideDirection || ($(elem).attr('data-direction')) ? $(elem).attr('data-direction') : 'horizontal';
  
          //init vars this need to be refreshed on window resize
          this.itemSize = $($(this.slides).get(0)).outerWidth(true);
          this.totalSize = this.itemSize * this.slideNum;
          this.distance = (this.itemSize * this.currSlide);
          this.slideAmount = config.slideAmount || Math.floor($(this.elem).width() / this.itemSize);
          //se for 0 o slide amout
          this.slideAmount = (this.slideAmount == 0)? this.slideAmount = 1 : this.slideAmount;
          this.itemPerPage = Math.floor($(this.elem).width() / $($(this.slides).get(0)).outerWidth());
          this.maxElemHeight = 0;
  
          console.log(this.slideAmount);

          //total steps, quando temos mais de 1 item por página
          this.stepTotal = Math.ceil((this.slideNum - this.itemPerPage) / this.slideAmount);
  
          //console.log(this.itemPerPage, $(this.elem).width());
  
          $(this.slider).addClass('anim');
  
  
          if(this.slideNum == 1 && this.config.version != 2) { return; }
  
          this.positionSlides();
          sup.showSlide();
  
          //this.enableSwipe();
          if($(elem).attr('data-enabledrag') == 'true' || config.enabledrag == true){
              this.enableDarg();
          }
          /*
           * Assing clicks to button components in the container
           * Next and previous arrows
           * Goto slide Links
           */
           $(elem).find('[data-showSlide]').click(function(){
              var slide = parseFloat($(this).attr('data-showSlide')) - 1;
              sup.setSlideNum(slide);
           });
  
           $(elem).find('[data-prevSlide]').click(function(){
            sup.prevSlide();
           });
  
           $(elem).find('[data-nextSlide]').click(function(){
            sup.nextSlide();
           });
  
           //on resize set new positions to slides
           $(window).resize(function(){
            sup.itemSize = $($(sup.slides).get(0)).outerWidth(true);
            sup.totalSize = sup.itemSize * sup.slideNum;
            sup.distance = (sup.itemSize * sup.currSlide);
            sup.itemPerPage = Math.floor($(sup.elem).width() / $($(sup.slides).get(0)).outerWidth());
            sup.maxElemHeight = 0;
  
            sup.positionSlides();
            sup.showSlide();
           });
      }
  
      module.prototype.getSlide = function(index){
        return $(this.slides).get(index);
      }
  
      module.prototype.updateElement = function(elementQuery, transform){
          var value = transform.join(" ");
          var el = $(elementQuery).get(0);
          el.style.webkitTransform = value;
          el.style.mozTransform = value;
          el.style.transform = value;
          ticking = false;
      }
  
      module.prototype.destroy = function(elementQuery, transform){
        this.hammer.off('panstart');
        this.hammer.off('panright');
        this.hammer.off('panleft');
        this.hammer.off('panright panleft');
        this.hammer.off('panend');
        this.hammer.off('swipeleft');
        this.hammer.off('swiperight');
  
        $(this.elem).find('[data-showSlide]').unbind();
        $(this.elem).find('[data-prevSlide]').unbind();
        $(this.elem).find('[data-nextSlide]').unbind();
      }
  
      module.prototype.positionSlides = function(){
          var i = 0;
          var sup = this;
  
          $(this.slides).each(function(){
              if(sup.slideDirection == 'horizontal'){
                  var posi = (i*sup.itemSize);
                  sup.updateElement(this, ['translate3d('+posi+'px, 0, 0)']);
  
                  $(this).attr('data-posi', Math.ceil(posi));
  
                  if($(this).height() > sup.maxElemHeight){
                    sup.maxElemHeight = $(this).height();
                  }
              }
              i ++;
          });
  
          //coloca o slider do tamanho do elemento mais alto
          $(sup.slider).height(sup.maxElemHeight);
  
          this.checkElemVisibility();
      }
  
      module.prototype.enableDarg = function(){
          var sup = this;
  
          var dirDiff = 0;
          var value;
          var lastDir;
            this.hammer.on('panright panleft', function(ev) {
              value = 0;
              var ww = $(window).width();
  
              value =  sup.startOffset + (ev.deltaX / sup.friction);
              lastDir = (ev.type != 'panend') ? ev.type : '';
  
              sup.updateElement(sup.slider, ['translate3d('+(value)+'px, 0, 0)']);
            });
            this.hammer.on('panstart', function(ev) {
              //sup.startOffset = $(sup.slider).offset().left;
              $(sup.slider).removeClass('anim');
              $(sup).trigger("panstart");
            });
            this.hammer.on('panend', function(ev) {
              if(Math.abs(ev.deltaX) > sup.dragLimit && lastDir == 'panleft'){
                  sup.nextSlide();
                  return;
              }
              if(Math.abs(ev.deltaX) > sup.dragLimit && lastDir == 'panright'){
                  sup.prevSlide();
                  return;
              }
              $(sup).trigger("panend");
              sup.showSlide();
            });
      }
  
      module.prototype.enableSwipe = function(){
          var sup = this;
  
          var dirDiff = 0;
            sup.hammer.on('swipeleft', function(ev) {
              sup.nextSlide();
            });
            sup.hammer.on('swiperight', function(ev) {
              sup.prevSlide();
            });
      }
  
      module.prototype.checkElemVisibility = function(){
  
        var sup = this;
  
        $(this.slides).each(function(){
  
          var posi = parseInt($(this).attr('data-posi'));
          var factor = sup.distance;
          var currCanvas = (factor + $(sup.elem).width());
  
          //console.log(factor, sup.itemSize, currCanvas, posi, (posi + sup.itemSize));
  
          if(sup.config.version == null){
            if(posi >= factor && posi <=  currCanvas && Math.floor(posi + sup.itemSize) <= currCanvas){
              $(this).attr('data-visible', 'true');
            }else{
              $(this).attr('data-visible', 'false');
            }
          }
  
          if(sup.config.version == 2){
            var midPoint = ($(sup.elem).width() / 2) - (sup.itemSize / 2);
            var elemInitPosi = posi - Math.abs(factor - midPoint);
            var elemBox = elemInitPosi + sup.itemSize;
  
            if(posi == 188){
              console.log(elemInitPosi, elemBox);
            }
  
            if(elemInitPosi < 0 || elemBox >= $(sup.elem).width()){
              $(this).attr('data-visible', 'false');
            }else{
              $(this).attr('data-visible', 'true');
            }
          }//para versão 2 do slider
          
  
        });
  
      }
  
      module.prototype.showSlide = function(){
          var sup = this;
          sup.currSlide = (arguments[0]) ? arguments[0] : sup.currSlide;
          $(sup.slider).addClass('anim');
  
          sup.changing = true;
  
          if(sup.slideDirection == 'horizontal' && sup.config.version == 2){
            var midPoint = ($(sup.elem).width() / 2) - (sup.itemSize / 2);
            var targetPx = $($(sup.slides).get(this.currSlide)).attr('data-posi');
  
            targetPx = targetPx - midPoint;
            targetPx = 0 - targetPx;
  
            sup.updateElement(sup.slider, ['translate3d('+(targetPx)+'px, 0, 0)']);
  
            //update start offset to set drag on right position
            sup.startOffset = targetPx;
            sup.distance = targetPx;
          }
  
          if(sup.slideDirection == 'horizontal' && sup.config.version == null){
            var targetPx = this.currSlide*sup.itemSize;
            var targetLimit = sup.totalSize - targetPx;
  
            
            if(targetPx > (sup.totalSize - $(sup.elem).width())){
              targetPx = (sup.totalSize - $(sup.elem).width());
            }
            
  
            sup.updateElement(sup.slider, ['translate3d(-'+(targetPx)+'px, 0, 0)']);
            //update start offset to set drag on right position
            sup.startOffset =  0 - (sup.itemSize * sup.currSlide);
            sup.distance = (sup.itemSize * sup.currSlide);
  
            /*
            if((sup.itemSize * sup.currSlide) > (sup.totalSize - $(sup.elem).width())){
              sup.startOffset =  0 - targetPx;
            }else{
              sup.startOffset =  0 - (sup.itemSize * sup.currSlide);
            }
            */
          }
  
          sup.checkElemVisibility();
  
          if(this.onChange){
            this.onChange(sup.currSlide, sup.lastSlide);
          }
  
          setTimeout(function(){
              sup.changing = false;
          }, 300);
      }
  
      module.prototype.nextSlide = function(){
          this.lastSlide = this.currSlide;
          this.currSlide += parseInt(this.slideAmount);
          this.currSlide = (this.currSlide >= this.slideNum) ? this.slideNum - 1 : this.currSlide;
  
          if(this.currSlide * this.itemSize > this.totalSize - $(this.elem).width()){
            this.currSlide = this.slideNum - this.itemPerPage;
          }
  
          this.showSlide();
      }
  
      module.prototype.prevSlide = function(){
          this.lastSlide = this.currSlide;
          this.currSlide -= parseInt(this.slideAmount);
          this.currSlide = (this.currSlide < 0) ? 0 : this.currSlide;
          this.showSlide();
      }
  
      module.prototype.setSlideNum = function(num){
          this.lastSlide = this.currSlide;
          this.currSlide = num;
          this.currSlide = (this.currSlide < 0) ? 0 : this.currSlide;
          this.currSlide = (this.currSlide >= this.slideNum) ? this.slideNum - 1 : this.currSlide;
  
          if(this.currSlide * this.itemSize > this.totalSize - $(this.elem).width()){
            this.currSlide = this.slideNum - this.itemPerPage;
          }
  
          this.showSlide();
      }
  
      return module;
  
  });