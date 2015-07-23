---
layout: doc
title: DTEComponent
permalink: /doc/Scripts/SBE-Scripts/Components/DTEComponent/
---
# DTEComponent

For work with EnvDTE 
(is an assembly-wrapped COM library containing the objects and members for Visual Studio core automation http://msdn.microsoft.com/en-us/library/EnvDTE.aspx)

## exec

DTE-command to execution

Syntax:

{% highlight java %}

#[DTE exec: command(arg)]
{% endhighlight %}

Sample:

{% highlight java %}

#[DTE exec: Build.SolutionPlatforms(x86)] 
#[DTE exec: Build.SolutionConfigurations(Debug_Exclude_Plugins_All)]
{% endhighlight %}

Note: Some commands should be available only under certain conditions, for example - some stop before some begin... etc.

## events

Operations with events.

### LastCommand

*available with v0.12+*

Last received command.

**Note:** Use our [Sniffer]({{site.baseurl}}/{{site.docp}}/Events/CommandEvent/) to find any commands.

#### Guid

Scope for Command ID

Syntax:

{% highlight java %}

string #[DTE events.LastCommand.Guid]
{% endhighlight %}

#### Id

Command ID

Syntax:

{% highlight java %}

integer #[DTE events.LastCommand.Id]
{% endhighlight %}

#### CustomIn

Custom input parameters.

Syntax:

{% highlight java %}

string #[DTE events.LastCommand.CustomIn]
{% endhighlight %}

#### CustomOut

Custom output parameters.

Syntax:

{% highlight java %}

string #[DTE events.LastCommand.CustomOut]
{% endhighlight %}

#### Pre

Flag of the execution command - Before / After

Syntax:

{% highlight java %}

boolean #[DTE events.LastCommand.Pre]
{% endhighlight %}