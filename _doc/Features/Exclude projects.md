---
layout: doc
title: Exclude projects from build on Pre-Build event
permalink: /doc/Features/Exclude projects/
---
# Exclude projects from build on Pre-Build event

It appeared after request from [Q/A](https://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334) ([related issue](https://bitbucket.org/3F/vssolutionbuildevent/issue/24/exclude-projects-from-build-on-pre-build))

So if you want activate or deactivate any projects when build is started... well **it's possible** with vsSolutionBuildEvent

## How ?

This feature is part of [SBE-Scripts](../../Scripts/SBE-Scripts/) (controlled by [BuildComponent](../../Scripts/SBE-Scripts/Components/BuildComponent/)). Therefore you should activate support of this engine.

Ok, it's simply...

You should use **IsBuildable** property for get/set value of selected project(s).

```{{site.sbelang1}}
#[Build projects.find("name").IsBuildable = true|false|1|0]
```

```{{site.sbelang1}}
#[Build projects.find("name").IsBuildable]
```

Where name is project name in your solution, for example:

* "bzip2.vcxproj"
* "Zenlib\ZenLib.vcxproj"

etc.

## Examples

* Set true value if next condition also has true

```{{site.sbelang}}
#[( ($(isAllow) && $(Configuration) === "Debug") || $(sysc) == -1 ) {
    #[Build projects.find("bzip2.vcxproj").IsBuildable = false]
}]
```

* Set value from external utility:

```{{site.sbelang}}
#[Build projects.find("bzip2.vcxproj").IsBuildable = #[File sout("vt.exe", "-s -e bzip", 60)]]
```

* Status for Release_notes.txt

```{{site.sbelang}}
#[var pBzip = #[Build projects.find("bzip2.vcxproj").IsBuildable]]
...
#[File write("#[var odir]/Release_notes.txt"):This assembled from:
...
* Build number:     #[var revBuild];
* Branch Sha1:      #[var branchSha1];
* bzip2 status:     #[var pBzip];
...
]
```

* Manage for other projects:

```{{site.sbelang}}
#[(#[Build projects.find("boost-regex.vcxproj").IsBuildable])
{
    #[Build projects.find("client.vcxproj").IsBuildable = true]
    #[Build projects.find("MediaInfoLib.vcxproj").IsBuildable = false]
    #[Build projects.find("zlib.vcxproj").IsBuildable = true]
}
else {
    #[Build projects.find("bzip2.vcxproj").IsBuildable = true]
}]
```

# References

* [SBE-Scripts](../../Scripts/SBE-Scripts/)
    * [BuildComponent](../../Scripts/SBE-Scripts/Components/BuildComponent/)
    * [ConditionComponent](../../Scripts/SBE-Scripts/Components/ConditionComponent/)
    * [UserVariableComponent](../../Scripts/SBE-Scripts/Components/UserVariableComponent/)
* [Examples & Features](../../Examples/)