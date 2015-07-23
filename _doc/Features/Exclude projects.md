---
layout: doc
title: Exclude projects from build on Pre-Build event
permalink: /doc/Features/Exclude projects/
---
# Exclude projects from build on Pre-Build event

This features appeared after request from [Q/A](https://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334) ([related issue](https://bitbucket.org/3F/vssolutionbuildevent/issue/24/exclude-projects-from-build-on-pre-build))

So, if you want to activate or deactivate some projects when building a solution... well **it's possible** with vsSolutionBuildEvent

## How ?

This feature part of [SBE-Scripts](../../Scripts/SBE-Scripts/) core(controlled with [BuildComponent](../../Scripts/SBE-Scripts/Components/BuildComponent/)). Therefore you should activate support of this in the Control section.

Ok, it's simply...

You should use **IsBuildable** property for get/set value for selected project.

{% highlight java %}

#[Build projects.find("name").IsBuildable = true|false|1|0]
{% endhighlight %}
{% highlight java %}

#[Build projects.find("name").IsBuildable]
{% endhighlight %}

Where name is project name in your solution, for example:

* "bzip2.vcxproj"
* "Zenlib\ZenLib.vcxproj"

etc.

## Examples

* Set true value if next condition also has true
{% highlight java %}


#[( ($(isAllow) && $(Configuration) === "Debug") || $(sysc) == -1 ) {
    #[Build projects.find("bzip2.vcxproj").IsBuildable = true]
}]
{% endhighlight %}

* Set value from external utility:
{% highlight java %}

#[Build projects.find("bzip2.vcxproj").IsBuildable = #[File sout("vt.exe", "-s -e bzip", 60)]]
{% endhighlight %}

* Status for Release_notes.txt
{% highlight java %}

#[var pBzip = #[Build projects.find("bzip2.vcxproj").IsBuildable]]
...
#[File write("#[var odir]/Release_notes.txt"):This assembled from:
...
* Build number:     #[var revBuild];
* Branch Sha1:      #[var branchSha1];
* bzip2 status:     #[var pBzip];
...
]
{% endhighlight %}

* Manage for others projects:

{% highlight java %}

#[(#[Build projects.find("boost-regex.vcxproj").IsBuildable])
{
    #[Build projects.find("client.vcxproj").IsBuildable = true]
    #[Build projects.find("MediaInfoLib.vcxproj").IsBuildable = false]
    #[Build projects.find("zlib.vcxproj").IsBuildable = true]
}
else {
    #[Build projects.find("bzip2.vcxproj").IsBuildable = true]
}]
{% endhighlight %}

# References

* [SBE-Scripts](../../Scripts/SBE-Scripts/)
* * [BuildComponent](../../Scripts/SBE-Scripts/Components/BuildComponent/)
* * [ConditionComponent](../../Scripts/SBE-Scripts/Components/ConditionComponent/)
* * [UserVariableComponent](../../Scripts/SBE-Scripts/Components/UserVariableComponent/)
* [Examples & Features](../../Examples/)