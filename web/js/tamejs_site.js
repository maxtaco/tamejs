$(function() {
	prettyPrint(); // prettify JS
	$("#floating_container").floatingFixed();
});

//----------------------------------------
// jquery extension to float elements
//----------------------------------------

(function($) {
  var fulfills = [];
  $.fn.floatingFixed = function(options) {
    options = $.extend({}, $.floatingFixed.defaults, options);
    var r = $(this).each(function() {
      var $this = $(this), pos = $this.position();
      $this.data("floatingFixedTop", pos.top);
      $this.data("floatingFixedLeft", pos.left);
      $this.data("floatingFixedOptions", options);
      $this.data("floatingFixedTopOrigTop", $this.css("top"));
      fulfills.push($this);
    });
    windowScroll();    
    return r;
  }
  
  $.floatingFixed = $.fn.floatingFixed;
  $.floatingFixed.defaults = {
    padding: 0
  }
  
  var $window = $(window);
  var windowScroll = function() {
    if(fulfills.length === 0) { return; }
    var scrollY = $window.scrollTop();
    for(var i = 0; i < fulfills.length; i++) {
      var t = fulfills[i], opt = t.data("floatingFixedOptions"), top = t.data("floatingFixedTop");
      if(top < scrollY + opt.padding && !t.data("isFloating")) {        
//        t.css({position: 'fixed', top: opt.padding, left: t.data("floatingFixedLeft") }).data("isFloating", true);
        t.css({position: 'fixed', top: opt.padding }).data("isFloating", true);
      } else if(top >= scrollY + opt.padding && t.data("isFloating")) {
        t.css({position: 'static', top: null, left: null}).data("isFloating", false);
      }
    }
  };
  
  $window.scroll(windowScroll).resize(windowScroll);
})(jQuery);
