---
layout: doc
title: InternalComponent
permalink: /doc/Scripts/SBE-Scripts/Components/InternalComponent/
---
# InternalComponent

All internal operations with vsSBE.

## events

Work with events.

Available events:
{% highlight text %}

Pre, Post, Cancel, Warnings, Errors, OWP, Transmitter, Logging
{% endhighlight %}

Syntax:
{% highlight java %}

#[vsSBE events.Type.item("name")]
{% endhighlight %}
{% highlight java %}

#[vsSBE events.Type.item(index)]
{% endhighlight %}

Sample:
{% highlight java %}

#[vsSBE events.Pre.item("Act1")]
{% endhighlight %}

### Enabled

Gets or Sets Enabled status for selected event-item.

Syntax:
{% highlight java %}

#[vsSBE events.Pre.item("Act1").Enabled = false]
{% endhighlight %}
{% highlight java %}

#[vsSBE events.Pre.item("Act1").Enabled]
{% endhighlight %}

### Status ###

Available statuses for selected event-item.

#### HasErrors ####

Checking existence of errors after executed action for selected event-item.

Syntax:
{% highlight java %}

#[vsSBE events.Pre.item("Act1").Status.HasErrors]
{% endhighlight %}

Sample:
{% highlight java %}

#[(#[vsSBE events.Pre.item("Act1").Enabled]){
    #[Build projects.find("zlib").IsBuildable = false]
}]
{% endhighlight %}
