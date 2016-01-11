---
layout: documentation
title: Sidr
subtitle: The best jQuery plugin for creating side menus and the easiest way for doing your menu responsive
excerpt: Berriart contact page
permalink: /sidr/
download: https://github.com/artberri/sidr/archive/v2.0.0.zip
repo: https://github.com/artberri/sidr
menu:
- text: Download
  url: download
- text: Get started
  url: get-started
- text: Demos &amp; Usage
  url: demos--usage
- text: Documentation
  url: documentation
- text: Themes
  url: themes
- text: Development
  url: development
ad:
  clients: ca-pub-5245097431906186
  slot: 6701087233
style: //cdn.jsdelivr.net/jquery.sidr/2.0.0/stylesheets/jquery.sidr.dark.min.css
script: /js/sidr.js
---

<div class="row doc-preview">
    <div class="large-8 columns">
        <img src="/images/documentation/sidr/screenshots.png" alt="Image explanation">
    </div>
    <div class="large-4 columns">
        <p>
        You will be able to create multiple <em>sidrs</em> on both sides of your web to make responsives menus (or not, it works perfectly on desktop too).
        </p>

        <p>Fill the <em>sidrs</em> normally, with existent content, remote content,... or what you want.</p>
    </div>
</div>

<div class="documenation-social">
    <div class="row">
        <div class="large-12 columns">
            <iframe src="http://ghbtns.com/github-btn.html?user=artberri&amp;repo=sidr&amp;type=fork&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="95" height="20"></iframe> <a href="https://twitter.com/share" class="twitter-share-button" data-related="artberri">Tweet</a> <div class="g-plusone" data-size="medium" data-callback="gplusCallback" data-href="http://www.berriart.com/sidr/"></div>
        </div>
    </div>
</div>

##Get started

Like any other plugin, you must include it after the jQuery script. For a better performance load them at the bottom of your page or in an asynchronous way.

You have to include a Sidr Theme stylesheet too, choose between the dark or the light one, or if you prefer create one by your own.

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <!-- Your other stuff  (you can have problems if you don't add minimum scale in the viewport) -->
    <meta name="viewport" content="width=device-width,minimum-scale=1">
    <!-- Include a Sidr bundled CSS theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/jquery.sidr/2.0.0/stylesheets/jquery.sidr.dark.min.css">
  </head>
  <body>
    <!-- More stuff -->
    <!-- Include jQuery -->
    <script src="//cdn.jsdelivr.net/jquery/2.1.4/jquery.min.js"></script>
    <!-- Include the Sidr JS -->
    <script src="//cdn.jsdelivr.net/jquery.sidr/2.0.0/jquery.sidr.js"></script>
  </body>
</html>
{% endhighlight %}

### Using bower or NPM

Instead of downloading the plugin, you can install it with with [bower](http://bower.io/) or [npm](https://www.npmjs.com/):

{% highlight sh %}
bower install sidr --save
{% endhighlight %}

{% highlight sh %}
npm install sidr --save
{% endhighlight %}

### From a CDN

If you want to load the scripts from a CDN to save bandwith or improve the performance you can use [jsDelivr](https://www.jsdelivr.com/projects/jquery.sidr).

##Demos & Usage

Here are described differents ways of usage for this plugin, you can read and adapt them to your website's requeriments. Below are described all options with details.

###The Simplest Usage 

<a id="simple-menu" class="demo button" href="#sidr"><i id="menu-icon" class="fi-list"></i> Simple menu</a>

Create a div called sidr and place your menu there. Then activate the plugin binding it to a link. By default, the menu wont't be visible and it will be displayed or hidden by clicking on the link.

{% highlight html %}
<a id="simple-menu" href="#sidr">Toggle menu</a>

<div id="sidr">
  <!-- Your content -->
  <ul>
    <li><a href="#">List 1</a></li>
    <li class="active"><a href="#">List 2</a></li>
    <li><a href="#">List 3</a></li>
  </ul>
</div>

<script>
$(document).ready(function() {
  $('#simple-menu').sidr();
});
</script>
{% endhighlight %}

###Create Multiple Menus

<a id="left-menu" class="demo button" href="#left-menu">Left Menu</a> <a id="right-menu" class="demo button" href="#right-menu">Right Menu</a>

You can create as many menus as you want in the same page, and you can place them at the right or left side. When creating more than one menu, you need to name them. As it is shown in the example, if you don't create the menu div container, the plugin will create it for you.

{% highlight html %}
<a id="left-menu" href="#left-menu">Left Menu</a> 
<a id="right-menu" href="#right-menu">Right Menu</a>
 
<script>
$(document).ready(function() {
    $('#left-menu').sidr({
      name: 'sidr-left',
      side: 'left' // By default
    });
    $('#right-menu').sidr({
      name: 'sidr-right',
      side: 'right'
    });
});
</script>
{% endhighlight %}

###The Menu Content

<a id="existing-content-menu" class="demo button" href="#existing-content-menu">Existing content</a> <a id="remote-content-menu" class="demo button" href="#remote-content-menu">Load remotelly</a> <a id="callback-menu" class="demo button" href="#callback-menu">Callback loaded</a>

There are four ways to load content in the menus, choose yours with the source option.

 * We have shown the first way at the 'Simplest Usage' demo, no more than placing the content into the div menu.
 * The most common way is to load existing html into the menu, you can add as many selectors as you want and they will be loaded in order.
 * There is the possibility to load remote content easily via AJAX.
 * If you need a more complex way to load content into the menu you can just create a callback function.

{% highlight html %}
<a id="existing-content-menu" href="#existing-content-menu">Existing content</a> 
<a id="remote-content-menu" href="#remote-content-menu">Load remotelly</a> 
<a id="callback-menu" href="#callback-menu">Callback loaded</a>

<header id="demoheader">
    <h1>Demos &amp; Usage</h1>
</header>

<div id="demo-content">
    <p>Here are described differents ways of usage for this plugin, you can 
    read and adapt them to your website's requeriments. Below are described 
    all options with details.</p>
</div>

<script>
$(document).ready(function() {
    $('#existing-content-menu').sidr({
      name: 'sidr-existing-content',
      source: '#demoheader, #demo-content'
    });
    $('#remote-content-menu').sidr({
      name: 'sidr-remote-content',
      source: 'http://www.example.com/remote-menu.html'
    });
    $('#callback-menu').sidr({
      name: 'sidr-callback',
      source: function(name) {
        return '<h1>' + name + ' menu</h1><p>Yes! You can use a callback too ;)</p>';
      }
    });
});
</script>
{% endhighlight %}

###Responsive Menus

<a data-proofer-ignore id="responsive-menu-button" class="demo button" href="#sidr-main">Responsive Menu</a>

The major reason for creating this plugin was just being able to easily add existing content (like a menu, a search box, social icons,...) to a menu in small screens. Simply load existing html into a sidr, and then, hide this html and show the menu button with media queries.

{% highlight html %}
<style>
#mobile-header {
    display: none;
}
@media only screen and (max-width: 767px){
    #mobile-header {
        display: block;
    }
}
</style>

<div id="mobile-header">
    <a id="responsive-menu-button" href="#sidr-main">Menu</a>
</div>

<div id="navigation">
    <nav class="nav">
        <ul>
            <li><a href="#download">Download</a></li>
            <li><a href="#getstarted">Get started</a></li>
            <li><a href="#usage">Demos &amp; Usage</a></li>
            <li><a href="#documentation">Documentation</a></li>
            <li><a href="#themes">Themes</a></li>
            <li><a href="#support">Support</a></li>
        </ul>
    </nav>
</div>

<script>
    $('#responsive-menu-button').sidr({
      name: 'sidr-main',
      source: '#navigation'
    });
</script>
{% endhighlight %}

###Open/Close Programatically 

There are some methods you can use to open or close menus as you want, or to bind them to any event. For example, in this page the right/left swipe touch event opens or closes the responsive menu (Note: this plugin doesn't implement touch events, in this case I'm using an external library).

{% highlight html %}
<!-- For this example I include an external library to handle touch events -->
<script src="//cdn.jsdelivr.net/jquery.touchswipe/1.6.15/jquery.touchSwipe.min.js"></script>

<script>
    $('body').swipe( {
        //Single swipe handler for left swipes
        swipeLeft: function () {
            $.sidr('close', 'sidr-main');
        },
        swipeRight: function () {
            $.sidr('open', 'sidr-main');
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold: 45
    });
</script>
{% endhighlight %}

###Cookbook

You can see other recipes in the code repository:

[https://github.com/artberri/sidr/tree/master/examples](https://github.com/artberri/sidr/tree/master/examples)

##Documentation

<div class="function">
  <h3>.sidr()</h3>
  <div class="usage">
    <p><strong>Description:</strong> It creates a <em>sidr</em> menu and binds the toggle function to the <em>selector</em>.</p>

    <h4>jQuery(selector).sidr( [options] )</h4>

    <div class="parameter">
      <p><strong>options</strong> (Object)</p>
      <p>A map of options to pass to the method.</p>

      <div class="option">
        <p><strong>name</strong> (String) Default: 'sidr'</p>
        <p>Name for the <em>sidr</em>.</p>
      </div>

      <div class="option">
        <p><strong>speed</strong> (Number|String) Default: 200</p>
        <p>A string or number determining how long the animation will run.</p>
      </div>

      <div class="option">
        <p><strong>side</strong> (String) Default: 'left'</p>
        <p>Left or right, the location for the sidebar.</p>
      </div>

      <div class="option">
        <p><strong>source</strong> (String|Function) Default: null</p>
        <p>A jQuery selector, an url or a callback function.</p>
      </div>

      <div class="option">
        <p><strong>renaming</strong> (Boolean) Default: true</p>
        <p>When filling the <em>sidr</em> with existing content, choose to rename or not the classes and ids.</p>
      </div>

      <div class="option">
        <p><strong>body</strong> (String) Default: 'body' <small>[ Version 1.1.0 an above ]</small></p>
        <p>For doing the page movement the 'body' element is animated by default, you can select another element to animate with this option.</p>
      </div>

      <div class="option">
        <p><strong>displace</strong> (Boolean) Default: true <small>[ Version 1.2.0 an above ]</small></p>
        <p>Displace the body content or not.</p>
      </div>

      <div class="option">
        <p><strong>onOpen</strong> (function) Default: function() {} <small>[ Version 1.2.0 an above ]</small></p>
        <p>Callback that will be executed on open.</p>
      </div>

      <div class="option">
        <p><strong>onClose</strong> (function) Default: function() {} <small>[ Version 1.2.0 an above ]</small></p>
        <p>Callback that will be executed on close.</p>
      </div>
    </div>
  </div>
</div>
<div class="function">
  <h3>jQuery.sidr()</h3>

  <div class="usage">
    <p><strong>Description:</strong> A generic <em>sidr</em> controller. Can be used to access the <em>sidr</em> methods <em>open</em>, <em>close</em> or <em>toggle</em></p>

    <h4>jQuery.sidr( [method] [, name] [, complete] )</h4>

    <div class="parameter">
      <p><strong>method</strong> (String) Default: 'toggle'</p>
      <p>Choose between toggle, open or close.</p>
    </div>

    <div class="parameter">
      <p><strong>name</strong> (String) Default: 'sidr'</p>
      <p>Name of the target <em>sidr</em>.</p>
    </div>

    <div class="parameter">
      <p><strong>complete</strong> (Function) Default: none</p>
      <p>A function to call once the animation is complete.</p>
    </div>
  </div>
</div>


##Themes

There are two themes (two stylesheets) included with the plugin, a dark one and a light one. You can use them, create a new one or override them with your own styles.

<div class="row themes">
  <div class="medium-6 columns">
    <a data-proofer-ignore data-toggle="dark-reveal"><img src="/images/documentation/sidr/dark.theme.thumb.png" alt="Dark Theme" /></a>
    <h3><a data-proofer-ignore data-toggle="dark-reveal">Dark Theme</a></h3>
  </div>
  <div class="medium-6 columns">
    <a data-proofer-ignore data-toggle="light-reveal"><img src="/images/documentation/sidr/light.theme.thumb.png" alt="Light Theme" /></a>
    <h3><a data-proofer-ignore data-toggle="light-reveal">Light Theme</a></h3>
  </div>
</div>


###Showcase 

Here you can see some famous sites using Sidr and others with a really nice implementation of Sidr.

<div class="showcase row small-up-2 medium-up-3">
  <div class="column">
    <div class="case">
      <img src="/images/documentation/sidr/showcase-fox.png" alt="Sidr Menu on FOX Broadcasting Company website">
      <div class="info">
        <p>FOX Broadcasting Company</p>
        <p><a href="http://www.fox.com">www.fox.com</a></p>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="case">
      <img src="/images/documentation/sidr/showcase-uscourts.png" alt="Sidr Menu on United States Courts website">
      <div class="info">
        <p>United States Courts</p>
        <p><a href="http://www.uscourts.gov">www.uscourts.gov</a></p>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="case">
      <img src="/images/documentation/sidr/showcase-sdsu.png" alt="Sidr Menu on San Diego State University website">
      <div class="info">
        <p>San Diego State University</p>
        <p><a href="http://www.sdsu.edu/">www.sdsu.edu</a></p>
      </div>
    </div>
  </div>
</div>

If you've created a website or an application using this plugin and you want to show it in this section, send me an email with the url to alberto[at]berriart[dot]com.

##Development

- Source hosted at [GitHub](https://github.com/artberri/sidr)
- If you have problems implenting this, ask about it in [StackOverflow](http://stackoverflow.com/search?q=sidr)
- Report issues and feature requests in [GitHub Issues](https://github.com/artberri/sidr/issues)
- Contributing: [CONTRIBUTING.md](https://github.com/artberri/sidr/blob/master/CONTRIBUTING.md)

Pull requests are very welcome! Make sure your patches are well tested. Please create a topic branch for every separate change you make.

<div id="dark-reveal" data-reveal class="reveal">
  <img src="/images/documentation/sidr/dark.theme.png" alt="Dark Theme" />
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>

<div id="light-reveal" data-reveal class="reveal">
  <img src="/images/documentation/sidr/light.theme.png" alt="Light Theme" />
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>

<div id="sidr">
  <!-- Your content -->
  <ul>
    <li><a href="#menu-button">List 1</a></li>
    <li class="active"><a href="#menu-button">List 2</a></li>
    <li><a href="#menu-button">List 3</a></li>
  </ul>
</div>

<!-- Social -->
<script type="text/javascript">
    window.twttr = (function (d,s,id) {
      var t, js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
      js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
      return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
    }(document, "script", "twitter-wjs"));
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);

  })();
</script>
