/**************************
jQuery Horizontal Scroll

MIT LICENSE: Copyright 2021 Jeremy Rue https://github.com/jrue

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**************************/


(function($){
  
  $.horizontalScroll = function(el, options){

    const base = this;
    
    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;
    
    
    base.numOfItems = $(el).children().length;
    base.sumWidths = base.numOfItems * $(el).width();
    base.maxHeight = 0;

    
    $(el).children().each(function(){

      //get the tallest item, and use that as the standard (they can override)
      base.maxHeight = Math.max($(this).height(), base.maxHeight);

      //keep things from resizing after we build the strip
      $(this).css({
        "height": $(this).outerHeight(),
        "width": $(this).outerWidth(),
        "display": "block"
      });
    });
    
    //get any padding for absolute adjustment (they can override)
    base.paddingTop = $(el).css('padding-top');
    base.paddingLeft = $(el).css('padding-left');
    
    //default options
    $.horizontalScroll.defaultOptions = {
        "containerHeight": "300vh",
        "itemsHeight": base.maxHeight,
        "width": base.sumWidths.toString() + "px",
        "paddingTop": base.paddingTop,
        "paddingLeft": base.paddingLeft
    };

    //merge options passed in during instantiation with our defaults
    base.options = $.extend({},$.horizontalScroll.defaultOptions, options);
    
    
    base.whenResizedCaptureNewItemSizes = ()=>{
      
      base.maxHeight = 0;
      
      $(el).find('.strip-holder').children().each(function(){
        
        let ratio = $(this).height() / $(this).width();
        base.maxHeight = Math.max($(el).width() * ratio, base.maxHeight);
        
        $(this).css({
          "height": Math.ceil($(el).width() * ratio),
          "width": $(el).width(),
          "display": "block"
        });
      });
      
      $(el).find(".strip-holder").css({
        "height": base.maxHeight,
        "width": base.numOfItems * $(el).width()
      });
      
      $(el).find(".sticky-holder").css({
        "height": base.maxHeight,
        "width": $(el).width()
      });
      
      $(el).css("margin-top", base.maxHeight);
      
      base.topScrollTrigger = $(el).find('.strip-holder').offset().top + ($(el).find('.strip-holder').height()/2);
      base.bottomScrollTrigger = $(el).offset().top + $(el).height() - ($(el).find('.strip-holder').height()/2);
    }
    
    //trigger resize after 200ms from when they resize window
    $(window).on('resize', ()=>{
      clearTimeout(base.resizeTimer);
      base.resizeTimer = window.setTimeout(base.whenResizedCaptureNewItemSizes, 200);
    })
    

    base.init = ()=>{
      
      //set properties of container
      $(el).css({
        "height": base.options.containerHeight,
        "margin-top": base.options.itemsHeight,
        "position": "relative",
        "padding": 0,
        "overflow":"visible"
      });
      
      
      let holder1 = $("<div />")
        .addClass("sticky-holder")
        .css({
          "position":"sticky",
          "overflow":"hidden",
          "top": "50%",
          "left": 0,
          "transform":"translateY(-50%)",
          "width": $(el).width(),
          "height": base.options.itemsHeight
        });
      
      
      //create holder
      let holder2 = $("<div />")
        .addClass("strip-holder")
        .css({
          "position":"absolute",
          "height": base.options.itemsHeight,
          "top": base.options.paddingTop,
          "left": base.options.paddingLeft,
          "width": base.options.width
        });
      
      //go through each child item, set float left
      $(el).children().each(function(){
        $(this).css("float","left");
        $(this).detach().appendTo(holder2);
      })
      
      holder2.appendTo(holder1);
      holder1.appendTo($(el));
      
      base.topScrollTrigger = $(el).find('.strip-holder').offset().top + ($(el).find('.strip-holder').height()/2);
      base.bottomScrollTrigger = $(el).offset().top + $(el).height() - ($(el).find('.strip-holder').height()/2);
      
      $(window).on("scroll", base.onScroll)

    };
    
    base.onScroll = ()=>{
      
      let currScrollTop = $(window).scrollTop() + ($(window).height()/2);
      let startOfScroll = $(el).offset().top;
      let endOfScroll = $(el).offset().top + $(el).height() - $(".sticky-holder").height();
      let totalDistance = endOfScroll - startOfScroll;
      let percentScrolled = Math.min(Math.max(currScrollTop - startOfScroll,0) / totalDistance, 1);
      let stripHolderWidth = $(el).find(".strip-holder").width() - $(el).find(".strip-holder").children(":last-child").width();
      
      //before sticky
      if(currScrollTop < startOfScroll){
        $(".strip-holder").css("transform", "translate3d(0px,0px,0px)");
      }
      
      //trigger when stickiness has been applied
      if(currScrollTop > startOfScroll && currScrollTop < endOfScroll){
        $(".strip-holder").css("transform", `translate3d(-${percentScrolled * stripHolderWidth}px,0px,0px)`);
      }
      
      //trigger when stickiness is done
      if(currScrollTop > endOfScroll){
        $(".strip-holder").css("transform", `translate3d(-${stripHolderWidth}px,0px,0px)`);
      }
    }

    // Run initializer
    base.init();
  };
  

  $.fn.horizontalScroll = function(options){
    return this.each(function(){
      const horizontalScroll  = (new $.horizontalScroll(this, options));
    });
  };
    
})(jQuery);