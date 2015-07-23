---
layout: doc
title: OWPComponent
permalink: /doc/Scripts/SBE-Scripts/Components/OWPComponent/
---
# OWPComponent

For work with OWP (Output Window Pane) and similar operations.

## log

**available with v0.11**

Provides data from events of logging.

### Message

Current message from log.

Syntax:
{% highlight java %}

#[OWP log.Message]
{% endhighlight %}

### Level

Level for current property the Message.

Syntax:
{% highlight java %}

#[OWP log.Level]
{% endhighlight %}

## item ##

**available with v0.11**

Access to item of the Output window by name.

Syntax:
{% highlight java %}

#[OWP item("name")]
{% endhighlight %}

### write ###

Writes data into selected pane.

Syntax:
{% highlight java %}

#[OWP item("name").write(boolean createIfNotExist): content]
{% endhighlight %}

### writeLine ###

Writes data with the newline char into selected pane.

Syntax:
{% highlight java %}

#[OWP item("name").writeLine(boolean createIfNotExist): content]
{% endhighlight %}

### delete ###

Removes pane. Returns false if this item not exist, and true value if is successfully deleted.

Syntax:
{% highlight java %}

#[OWP item("name").delete = true]
{% endhighlight %}

### clear ###

Clear contents of item. Returns false if this item not exist, and true value if is clean.

Syntax:
{% highlight java %}

#[OWP item("name").clear = true]
{% endhighlight %}

### activate ###

Activate(Display) item.

Syntax:
{% highlight java %}

#[OWP item("name").activate = true]
{% endhighlight %}

## out ##

Gets mixed data from the OWP. Returns the partial raw from all build log

Syntax:
{% highlight java %}

#[OWP out("name of item")]
{% endhighlight %}
Sample:
{% highlight java %}

#[OWP out("Build")]
{% endhighlight %}
Note: The "Build" item used by default.

Syntax with item by default:
{% highlight java %}

#[OWP out]
{% endhighlight %}

### The Build item ###

* Partial raw from all build log:
{% highlight java %}

#[OWP out.All]
{% endhighlight %}
{% highlight java %}

#[OWP out]
{% endhighlight %}

* Partial raw with warning/s:
{% highlight java %}

#[OWP out.Warnings.Raw]
{% endhighlight %}
{% highlight java %}

#[OWP out.Warnings]
{% endhighlight %}

*  Count of warnings:
{% highlight java %}

#[OWP out.Warnings.Count]
{% endhighlight %}

* List of warnings as C4702,4505 ... :
{% highlight java %}

#[OWP out.Warnings.Codes]
{% endhighlight %}

* Partial raw with error/s:
{% highlight java %}

#[OWP out.Errors.Raw]
{% endhighlight %}
{% highlight java %}

#[OWP out.Errors]
{% endhighlight %}

* Count of errors:
{% highlight java %}

#[OWP out.Errors.Count]
{% endhighlight %}

* List of errors as C4702,C4505 ... :
{% highlight java %}

#[OWP out.Errors.Codes]
{% endhighlight %}


