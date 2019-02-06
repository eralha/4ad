define('module/horz_slider_comp', [], function () {


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
        }
        .content__container { //This should fill the slider viewport in order to slide from one content to another
          position: absolute;
          width: 100%;
          height: 100%;
        }

     */

    
    function module(elem, config){
        var sup = this;
        this.elem = elem;
        this.config = config;
        this.slider = config.slider || $(elem).find('.slider');
        this.slides = config.slides || $(elem).find('.slide');
        this.slideNum = $(this.slides).length;
        this.currSlide = 0;
        this.startOffset = 0;
        this.currPosition = 0;
        this.moveInterval = parseInt(config.moveInterval) || 20;

        //init vars this need to be refreshed on window resize
        this.itemSize = $($(this.slides).get(0)).outerWidth(true);
        this.totalSize = this.itemSize * this.slideNum;
        this.itemPerPage = Math.floor($(this.elem).width() / $($(this.slides).get(0)).outerWidth());
        this.originalSliderHtml = $(this.slider).html();

        //Duplicate slider contents in order to slid to infinity
        $(this.slider).append(this.originalSliderHtml);

        //update slides array once after we have duplicated it
        this.slides = config.slides || $(elem).find('.slide');

        this.positionSlides();

         //on resize set new positions to slides
         $(window).resize(function(){
          sup.itemSize = $($(sup.slides).get(0)).outerWidth(true);
          sup.totalSize = sup.itemSize * sup.slideNum;
          sup.itemPerPage = Math.floor($(sup.elem).width() / $($(sup.slides).get(0)).outerWidth());

          console.log(sup.totalSize);

          sup.positionSlides();
         });
         
    }//module Struct

    module.prototype.updateElement = function(elementQuery, transform){
        var value = transform.join(" ");
        var el = $(elementQuery).get(0);
        el.style.webkitTransform = value;
        el.style.mozTransform = value;
        el.style.transform = value;
        ticking = false;
    }//updateElement

    module.prototype.destroy = function(elementQuery, transform){
        /*DESTROY SLIDER*/
    }//destroy

    module.prototype.startSlider = function(){
        var sup = this;

        clearInterval(this.moveIntervalId);

        this.moveIntervalId = setInterval(function(){
            sup.moveSlider();
        }, this.moveInterval);
    }//startSlider

    module.prototype.stopSlider = function(){
        clearInterval(this.moveIntervalId);
    }//stopSlider

    module.prototype.positionSlides = function(){
        var i = 0;
        var sup = this;

        $(this.slides).each(function(){
            var posi = (i*sup.itemSize);
            sup.updateElement(this, ['translate3d('+posi+'px, 0, 0)']);

            $(this).attr('data-posi', Math.ceil(posi));
            i ++;
        });

        this.startSlider();
        
    }//positionSlides

    module.prototype.moveSlider = function(){
        this.currPosition ++;

        this.currPosition = (this.currPosition >= this.totalSize) ? 0 : this.currPosition;

        this.updateElement(this.slider, ['translate3d(-'+this.currPosition+'px, 0, 0)']);
    }//moveSlider


    return module;

});