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

bower install sidr --save

CDN
https://github.com/jsdelivr/jsdelivr/tree/master/files/jquery.sidr/2.0.0

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <!-- Your stuff -->
    <meta name="viewport" content="width=device-width,minimum-scale=1">

    <!-- Include Sidr bundled CSS theme -->
    <link rel="stylesheet" href="javascripts/sidr/stylesheets/jquery.sidr.dark.css">
  </head>
  <body>
    <!-- Your stuff -->

    <!-- Include jQuery -->
    <script src="javascripts/jquery.js"></script>
    <!-- Include the Sidr JS -->
    <script src="javascripts/sidr/jquery.sidr.min.js"></script>
  </body>
</html>
{% endhighlight %}

##Demos & Usage

Here are described differents ways of usage for this plugin, you can read and adapt them to your website's requeriments. Below are described all options with details.

###The Simplest Usage 

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
    <p>Here are described differents ways of usage for this plugin, you can read and adapt them to your website's requeriments. Below are described all options with details.</p>
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
<script src="javascripts/jquery.touchwipe.js"></script>

<script>
      $(window).touchwipe({
        wipeLeft: function() {
          // Close
          $.sidr('close', 'sidr-main');
        },
        wipeRight: function() {
          // Open
          $.sidr('open', 'sidr-main');
        },
        preventDefaultEvents: false
      });
</script>
{% endhighlight %}

##Documentation

.sidr()
Description: It creates a sidr menu and binds the toggle function to the selector.

jQuery(selector).sidr( [options] )

options (Object)
A map of options to pass to the method.
name (String) Default: 'sidr'
Name for the sidr.
speed (Number|String) Default: 200
A string or number determining how long the animation will run.
side (String) Default: 'left'
Left or right, the location for the sidebar.
source (String|Function) Default: null
A jQuery selector, an url or a callback function.
renaming (Boolean) Default: true
When filling the sidr with existing content, choose to rename or not the classes and ids.
body (String) Default: 'body' [ Version 1.1.0 an above ]
For doing the page movement the 'body' element is animated by default, you can select another element to animate with this option.
displace (Boolean) Default: true [ Version 1.2.0 an above ]
Displace the body content or not.
onOpen (function) Default: function() {} [ Version 1.2.0 an above ]
Callback that will be executed on open.
onClose (function) Default: function() {} [ Version 1.2.0 an above ]
Callback that will be executed on close.
jQuery.sidr()
Description: A generic sidr controller. Can be used to access the sidr methods open, close or toggle

jQuery.sidr( [method] [, name] [, complete] )

method (String) Default: 'toggle'
Choose between toggle, open or close.
name (String) Default: 'sidr'
Name of the target sidr.
complete (Function) Default: none
A function to call once the animation is complete.

##Themes

There are two themes (two stylesheets) included with the plugin, a dark one and a light one. You can use them, create a new one or override them with your own styles.

Dark Theme Dark ThemeLight Theme Light Theme

##Cookbook

You can see other example codes in Github:

[https://github.com/artberri/sidr/tree/master/examples](https://github.com/artberri/sidr/tree/master/examples)

##Real Examples

Are you using this plugin on your site? Send me an email to alberto@berriart.com

SHowcase 

fox.com http://www.uscourts.gov/

##Development

If you've created a website or an application using this plugin and you want to show it in a future showcase section, send me an email with the url to alberto[at]berriart[dot]com.

Source hosted at GitHub
Report issues, questions, feature requests on GitHub Issues
Contributing: CONTRIBUTING.md
Pull requests are very welcome! Make sure your patches are well tested. Please create a topic branch for every separate change you make.


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
