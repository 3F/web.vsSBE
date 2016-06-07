---
layout: doc
title: Solution-wide Build Events
permalink: /doc/Features/Solution-wide/
---
# Solution-wide Build Events

All your actions for `Pre-Build` / `Post-Build` events are already can be **for all projects at once** or **individually for each**. 

*(You should remember this for work with [MSBuild](../../Scripts/MSBuild/) engine etc.)*

[![](../../Resources/examples/obsolete/vbs_ext.jpg)](../Confirmation dialog/)

It should be useful for most cases, for example: 

* [Automatic Version Numbering](../../Examples/Version/) for your projects.
* Or simple notification like ~ send email before/after building of all projects: `mail('yourmail@example.com', 'Build completed', date('H:i:s'));`
* and other.

Use it with simple caller (external logic) or as internal scripts with any interpreters such as php, python, PowerShell, Wscript, Node.js, etc.
Or use powerfull [MSBuild](../../Scripts/MSBuild/) & [SBE-Scripts](../../Scripts/SBE-Scripts/) engines, etc.

For more complex scripts see our **[available modes](../../Modes/)** and ~feel~free~ ...

## How about MSBuild Tool or how to work without Visual Studio

All your action may be handled without Visual Studio, for example, with msbuild.exe etc. 

Moreover, you have different ways:

* [CI Gateways](../../CI/)
    * [CI.MSBuild](../../CI/CI.MSBuild/) - *it easy way for work with all existing features. Powerful processing.*
* Call the `after.<name>.sln.targets` - *it does not require additional steps, simply action.*

### `after.<name>.sln.targets`

You should already know about this - [MSBuild: Extending the solution build](http://sedodream.com/2010/10/22/MSBuildExtendingTheSolutionBuild.aspx), 
but you also should know that this variant may work with building from msbuild.exe and not from VS IDE...

But wait, "the any action is already can be for all projects at once". So just call this target in [Targets Mode](../../Modes/Targets/).

As result you should get unified processing in Visual Studio IDE and msbuild.exe.

## What's exists for work without plugins ?

*In some cases*, any extending of Visual Studio may be not suitable or not comfortable for some reasons (for example, your some box-solution, etc.)

Firstly, yes, our product may work **without** Visual Studio. 

* You should see [CI.MSBuild](../../CI/CI.MSBuild/) (not requires installation, simply use 'as is'), and as full sample of how it's works, see [Sample 1](../../Examples/Demo/#sample-1)
    * *full [scheme of our projects](../../Scheme/)*

But a some reason may still require a very simple variant without any additions (it's really can be **only** for special case). So you can try other our solution - [Variant 2: Targets & Map of projects](http://stackoverflow.com/a/18311007) (stackoverflow.com/a/18311007)

* Complete script of this solution you can find [here](https://gist.github.com/3F/a77129e3978841241927) - *it's not recomended, but you also may like this*.


# References

* [Processing modes](../../Modes/)
* [Available Events](../../Events/)
* [Automatic Version Numbering](../../Examples/Version number/)
* [Exclude projects from build on Pre-Build event](../Exclude projects/)
* [Confirmation dialog](../Confirmation dialog/)
* [Actions for specific configuration](../Actions for specific configuration/)
* [MSBuild](../../Scripts/MSBuild/)
* [SBE-Scripts](../../Scripts/SBE-Scripts/)
* [Examples & Features](../../Examples/)