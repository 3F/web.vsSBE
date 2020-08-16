---
layout: doc
title: Continuous Integration
permalink: /doc/CI/
---
# Continuous Integration (CI) 

vsSolutionBuildEvent supports CI features [[?](http://en.wikipedia.org/wiki/Continuous_integration)] and may work without Visual Studio at all.

* **[CI.MSBuild](../CI/CI.MSBuild/)** support for MSBuild Tools.
* Legacy [Devenv Command-Line](../CI/Devenv Command-Line/) support for devenv Visual Studio instance.
* Other via [API](../Scheme/). It is easy to support any other tools and environments. Start with [Developer Zone](../Dev/).

[![Example with AppVeyor](../Resources/ci_example_appveyor.png)](../CI/CI.MSBuild/)

### GUI

{% assign img = "vsSolutionBuildEvent.CIM.GUI.png" %}{% assign attr = "width='308' height='206'" %}{% include elem/lightbox %}

You can easily control scripts beyond of the Visual Studio IDE.

Read more in **[Native scripting](../Examples/NativeScripting/)**.

### after.&lt;name&gt;.sln.targets

You can simply use this feature if you only need a unified action in both MSBuild + Visual Studio environments [for all projects at once](../Features/Solution-wide/) etc. [Read here](../Features/Solution-wide/#afternameslntargets)