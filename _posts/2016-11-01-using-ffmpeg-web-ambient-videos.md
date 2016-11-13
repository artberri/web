---
layout: post
title: Creating Background Ambient Videos In HTML5 using FFMPEG
excerpt: >
    FFMPEG is a cross-platform command line that can be used to convert videos in order
    to use them as a background using the 'video' HTML5 tag.
ogImage: /images/blog/2016/using-ffmpeg-web-ambient-videos-og.png
featuredImage: /images/blog/2016/using-ffmpeg-web-ambient-videos.png
category: [linux]
---

The use of ambient videos as background is not something new, [Smashing Magazine was already talking
about it][1] more than five years ago, but at that time it was still quite tricky to make it work in every browser.
I'd say that in 2013-2014 it started becoming a trend, and nowadays we can say that it's just another common resource
to make our website look fancy.

## HTML Markup and styles

Thanks to HTML5, CSS3 and the new JavaScript API, Flash is "no longer neccesary" as Steve Jobs already stated in 2010, so,
we'll just take a look to [the specification][2] to see how can we use HTML videos (as you probably know, CSS do not
support them).

{% highlight html %}
<video class="video" autoplay loop>
    <source src="/static/video.webm" type='video/webm; codecs="vp8, vorbis"' />
    <source src="/static/video.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
    <source src="/static/video.ogv" type='video/ogg; codecs="theora, vorbis"' />
    <img src="/static/video-background.jpg">
</video>
{% endhighlight %}

You could see that I've already added some attributes to the tag and some content. These are the common items that
a `video` tag usually has when it is used as background:

- **`autoplay` attribute:** It is needed for the video to start automatically.
background videos.
- **`loop` attribute:** It is needed to loop the video infinitelly which is the common behaviour in
background videos.
- **`source` tags:** Unfortunately, it is needed to add multiple video sources due to [the differences between browsers][3]
and the codecs' copyrights.
- **`img` tag:** This can be used as fallback in browsers where the `video` tag is not supported.

Taking into account that our purpose is to use this video as a background we will need some CSS to do it,
`position: absolute` or `position: fixed` will make the job. The following example can be used to set the video as a
fixed background:

{% highlight css %}
.video {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: -1;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
}
{% endhighlight %}

But we can also use it as background in a div, for example:

{% highlight html %}
<div class="video-container">
    <video class="video" autoplay loop>
        <source src="/static/video.webm" type='video/webm; codecs="vp8, vorbis"' />
        <source src="/static/video.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
        <source src="/static/video.ogv" type='video/ogg; codecs="theora, vorbis"' />
        <img src="/static/video-background.jpg">
    </video>
    <h2 class="video-claim">Some title here</h2>
    <a href="#" class="button">Some CTA</a>
</div>
{% endhighlight %}

{% highlight css %}
.video-container {
  height: 400px;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  color: #fff;
}

.video {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
{% endhighlight %}

## The video conversion

The developers usually receive the videos with .mkv, .mov, .avi or .mp4 extensions, but you can see in the code above
that the proper video formats are quite different. To convert videos into the proper formats, some developers
use online video converters, but we can take more control over the conversion by using the [FFMPEG][4] command line tool
by ourselves.

### The format

Converting videos to the proper format is quite easy and you can achieve it by executing the `ffmpeg` command with
the proper codec parameters:

{% highlight bash %}
ffmpeg -i inputvideo.ext -c:v h264 -c:a aac output.mp4 # Convert to MP4
ffmpeg -i inputvideo.ext -c:v libtheora -c:a libvorbis output.ogv # Convert to OGV
ffmpeg -i inputvideo.ext -c:v libvpx -c:a libvorbis output.webm # Convert to Webm
{% endhighlight %}

### The audio

If you take a look to the commands above, you will se that I'm passing also the codec needed for the audio conversions. This may be
useful when we are planning to embed a video inside the webpage content, but if what we are doing is to create a background, it's obvious that we
should avoid audio. We can do it by running the following commands instead:

{% highlight bash %}
ffmpeg -i inputvideo.ext -c:v h264 -an output.mp4 # Convert to MP4
ffmpeg -i inputvideo.ext -c:v libtheora -an output.ogv # Convert to OGV
ffmpeg -i inputvideo.ext -c:v libvpx -an output.webm # Convert to Webm
{% endhighlight %}

As you can see we've just replace the audio codec paramenter with `-an`, this will remove the audio completely. Apart from making the
website more pleasant for the user, by removing the audio we are reducing the size of our video which is also nice for the user. But... Which is
the proper size for a web video?

### The size

Remember that web videos are streamed, so, we should not think on their size as we do with images. When dealing with videos, the bitrate
is more important than the size. To understand what is the bitrate, take a look to this formula:

**Bitrate (kilobits per second) = file size / duration**

With this formula in mind, we can conclude that the size per second of our video is more important for the performance of the website than the full size of
the video, and this bitrate value should be chosen by taking into account the average connection speed of our target users or, maybe, a value a bit
lower than the average. For example, if we are trying to address people that access our website through a 3G connection, our video should have less
than 1Mb per second (125KB/s).

There are a lot of statistics about internet connection speed in internet, some of them segmented by country or region so, don't worry, you won't
probably need to gather that data by your own. As an example, I usually take the values shown in the throttling options of the Google Chrome's Dev
Tools as reference:

<img src="/images/blog/2016/network-speed-chrome.png">

If the bitrate of your video is greater than the connection speed of your audience, they will have visualization problems and the user experience
of your webpage won't be the one you expected. This is why you should reduce the size of your video, but, take into account that this will
reduce also it's quality.

If you still don't understand how the size affects streaming, you can check [this article][5] where you can find a deeper and better explanation
than mine.

#### Frame rate

Reducing the frame rate to 24fps when the video has been recorded with a bigger amount, like 60fps or 30fps, is one of the first actions to take,
this is the typical film rate and it's smooth enough for most of the situations. If your video has not much motion you can even reduce it a bit more. Unfortunately,
if your bitrate is too high for your user's connection, this action will not be enough, and it will be useless if your origin video already have 24fps.

{% highlight bash %}
ffmpeg -i inputvideo.ext -c:v h264 -an -r:v 24 output.mp4 # Convert to MP4
ffmpeg -i inputvideo.ext -c:v libtheora -an -r:v 24 output.ogv # Convert to OGV
ffmpeg -i inputvideo.ext -c:v libvpx -an -r:v 24 output.webm # Convert to Webm
{% endhighlight %}

Reducing each frame size by scaling down the video dimensions or by compressing the frame images is how we are going to achieve the bigger size
reduction.

### Croping

## Headers on web servers

## Video sources

Usually,

[1]: https://www.smashingmagazine.com/2011/01/creative-use-of-background-video-web-design-showcase/
[2]: https://www.w3.org/TR/2011/WD-html5-20110113/video.html
[3]: https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats
[4]: https://www.ffmpeg.org/
[5]: http://www.ezs3.com/public/What_bitrate_should_I_use_when_encoding_my_video_How_do_I_optimize_my_video_for_the_web.cfm
