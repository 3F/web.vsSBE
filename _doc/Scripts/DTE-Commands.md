---
layout: doc
title: EnvDTE
permalink: /doc/Scripts/DTE-Commands/
---
# EnvDTE

EnvDTE is an assembly-wrapped COM library containing the objects and members for Visual Studio core automation http://msdn.microsoft.com/en-us/library/EnvDTE.aspx

## DTE-Commands

All available commands for your IDE you can see with UI-Helper:

* `vsSBE` - `Tools` - `DTE-Commands`

For testing of commands, you can try with testing tool:

* `vsSBE` - `Tools` - `Execution DTE-Commands`

*a few commands should be separated by newline in your list*


## Examples

### Activation of specific configuration & platform
{% highlight java %}

Build.SolutionConfigurations(Debug)
Build.SolutionPlatforms(x86)
{% endhighlight %}

### Cancellation of the build ###

{% highlight java %}

Build.Cancel
{% endhighlight %}

# Multiple mixed DTE-Commands for scripts

As variant you can use powerful and flexible control with the [SBE-Scripts](../SBE-Scripts/) core.

* For operations with an commands exists the [DTEComponent](../SBE-Scripts/Components/DTEComponent/)

{% highlight java %}

#[($(isAllow) && ($(Configuration) ^= "Release" || $(sysLim) > 16)) {
    #[DTE exec: Build.Cancel]
    #[DTE exec: Build.SolutionConfigurations(Debug)]
}]
{% endhighlight %}
etc.


# References #

* [SBE-Scripts](../SBE-Scripts/)
* [MSBuild](../MSBuild/)
* [Examples & Features]({{site.baseurl}}/{{site.docp}}/Examples/)