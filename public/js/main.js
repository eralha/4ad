var JS_VERSION = 24;

//requirejs configurations
var appCFO_baseUrl = "src";
requirejs.config({
    baseUrl: '/js/',
    urlArgs : 'v='+JS_VERSION,
    paths: {
        'lib' : './libs/',
        'module' : appCFO_baseUrl+'/modules',
        'TweenLite' : './libs/greensock/TweenLite.min',
        'angular' : 'libs/angular.min',
        'plugins' : appCFO_baseUrl+'/modules/plugins'
    },
    priority: [
        "plugins"
    ]
});

function fbShare(){
    window.open("http://www.facebook.com/sharer/sharer.php?u="+window.location+"?v="+Math.random());
}
function twShare(){
    var page_url = encodeURIComponent(window.location);
    var page_title = encodeURIComponent($(document).find("title").text());
    var user = encodeURIComponent('');// COLOCAR USER se for o caso
    
    var uri = '';
        uri += 'original_referer=' + page_url;
        uri += '&ref_src=' + encodeURIComponent('twsrc^tfw');
        uri += '&text=' + page_title;
        uri += '&tw_p=tweetbutton';
        uri += '&url=' + page_url;
        uri += '&via=' + user;

    window.open("https://twitter.com/intent/tweet?"+uri);
}
function gpShare(){
    window.open("https://plus.google.com/share?url="+window.location+"?v="+Math.random());
}
function inShare(url, title, desc){
    window.open("http://www.linkedin.com/shareArticle?mini=true&url="+window.location);
}

function parseComponent(elem, scope){
    scope = scope || {};
    var htmlElement = elem;

    if($(htmlElement).attr("data-init") == "false") { return; }

    require([$(htmlElement).attr("data-component")], function(component){
        if(typeof component == 'function'){
            var comp = new component(htmlElement, scope);
        }
    });
}

function deferImagesLoad(container, callBack){
    $(container).each(function(){
        var sup = this;
        var images = $(this).find("img");
        var imagesNr = $(images).length;
        var loaded = 0;

        $(images).one("load", function() {
          loaded ++;
          if(loaded >= imagesNr){
            //console.log('all images loaded');
            callBack(sup);
          }
        }).each(function() {
          if(this.complete) $(this).load();
        });
    });
}

function scrollToTop(){
    $("html, body").stop().animate({scrollTop:0}, '300', 'swing');
}

window.mobilecheck = function() {
var check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
return check; }

//Mobile Vars
var mobile = 600;
var ipadPortrait = 768;
var desktop = 1024;

//Jquery Initialization
require(['plugins'], function(plugins){

    $("[data-angular-module]").each(function(){
        var htmlElement = this;

        if($(this).attr("data-init") == "false") { return; }

        require([$(this).attr("data-angular-module")], function(){
            $('.js_loading').removeClass('js_loading');
            $('.angular-loading').removeClass('angular-loading');
            
            angular.bootstrap(document, ['app']);
        });
    });


    //set link to all data-href boxes
    $('[data-href]').click(function(){
        if($(this).attr('target') == '_blank'){
            window.open($(this).attr('data-href'));
            return;
        }
        window.location = $(this).attr('data-href');
    });

    (function($){
        $(document).ready(function(){



        });
    })(jQuery);

});

if ('serviceWorker' in navigator) {
    /*
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(i in registrations) {
            registrations[i].unregister();
        } 
    });
    /**/
    
    navigator.serviceWorker.register('/service_worker_cache.js').then(navigator.serviceWorker.ready)
    .then(function () {
        console.log('service worker registered')
    })
    .catch(function (error) {
        console.log('error when registering service worker', error, arguments)
    });
    /**/
}