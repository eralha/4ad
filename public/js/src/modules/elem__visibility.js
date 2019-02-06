define('module/elem__visibility', [], function () {


    
    function module(elem, _class, options){

      options = options || {};

      var offsetTop;

      $(window).resize(function(){
        offsetTop = $(elem).offset().top;
      }).trigger('resize');

      $(window).scroll(function(){
        
        var sct = $(window).scrollTop();
        var calc = sct + ($(window).height() - 200);
        var calc2 = offsetTop + $(elem).height();

        if(calc > offsetTop && sct < calc2){
          $(elem).addClass(_class);
        }else{
          if(options.once != true){
            $(elem).removeClass(_class);
          }
        }

      }).trigger('scroll');

    }
    

    return module;

});