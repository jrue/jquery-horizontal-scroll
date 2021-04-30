jQuery Horiztonal Scroll Gallery
-----------------------------

This jQuery plugin slides through a horiztonal gallery of items as you scroll down. It makes use of position:sticky so that the gallery briefly fixes in place as it scrolls horizontally [See example here (scroll down the page)](https://jrue.github.io/jquery-horizontal-scroll/example/)

Ready to download? Get the minified JS file here:
[https://github.com/jrue/jquery-horizontal-scroll/blob/main/dist/jquery-horizontal-scroll.min.js](https://github.com/jrue/jquery-horizontal-scroll/blob/main/dist/jquery-horizontal-scroll.min.js)

#### Usage:

The gallery needs to be an HTML element with some child elements one-level down. It will take those first-level children, and automatically adjust them into a filmstrip element with all of the correct CSS, so there is little to do other than add the HTML. The child elements can be images, or div tags, or whatever. The film strip's height will be based on the tallest element it finds. 


#### Example HTML:

```html
<div class="horizontal-scroll">
  <div class="example">
    <img src="images/desk-1.jpg" class="img-fluid" alt="desk">
  </div>
  <div class="example">
    <img src="images/desk-2.jpg" class="img-fluid" alt="desk">
  </div>
  <div class="example">
    <img src="images/desk-3.jpg" class="img-fluid" alt="desk">
  </div>
  <div class="example">
    <img src="images/desk-4.jpg" class="img-fluid" alt="desk">
  </div>
</div>
```

This plugin requires jQuery (tested with 3x, but should work on earlier versions) and will need to be loaded after the jQuery library. 

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="jquery-horizontal-scroll.min.js"></script>
```

Target the CSS class of your containing element and run the `horizontalScroll()` method. (In the following example it's `.horizontal-scroll`) and set the options you want. The main option is how tall you want the containing element. The shorter it is, the more quickly it will scroll through the gallery. It defaults to **300vh** which is 300 percent of the viewport height. You can try different numbers to see how it affects the scroll. 

Larger numbers require more scroll effort to slide the gallery, and thus results in a slower scrolling gallery. 

```javascript
$( '.horizontal-scroll' ).horizontalScroll({
  containerHeight: "300vh"
});
```

#### Additional Options

You shouldn't need to add these additional options. In most cases they're auto detected. But I put them here just in case someone wanted to override the defaults. 

* **containerHeight** - The height of the container, which requires more scrolling.
* **itemsHeight** - Automatically based on the tallest item it finds, but you can set it yourself. An overflow hidden property will chop off anything protruding if you set it smaller than an element.
* **width** - Width of the strip of items. Automatically based on number of items multipled by the width of the main container. You can override here.
* **paddingTop** - Auto detects if you had padding on the container. But this will affect the point in which the stickiness catches.
* **paddingLeft** - Auto detects, but if you had padding-left on the container, it will ensure it carries over from the starting location of the film strip.

MIT License
