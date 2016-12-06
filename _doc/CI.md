---
layout: doc
title: Continuous Integration (CI)
permalink: /doc/CI/
---
# Continuous Integration (CI) 

***world without Visual Studio***.

The vsSolutionBuildEvent supports CI features [[?](http://en.wikipedia.org/wiki/Continuous_integration)] and may work without Visual Studio at all.

This is possible with additional components:

* **[CI.MSBuild](../CI/CI.MSBuild/)** - for work via msbuild.exe (MSBuild Tools)
    * To get CI.MSBuild in one click ~10 Kb: [get.CIM.bat](http://vssbe.r-eg.net/doc/CI/get.CIM.bat) (Compiled by [GetNuTool](https://github.com/3F/GetNuTool))
* [Devenv Command-Line](../CI/Devenv Command-Line/) - for work via devenv instance of the Visual Studio

[![Example with AppVeyor](../Resources/ci_example_appveyor.png)](../CI/CI.MSBuild/)

### Other utilities

The vsSolutionBuildEvent provides [API level](../Scheme/). It easy to support any other places. 

* [Developer Zone](../Dev/)
* [For questions]({{site.issueNew}})

#### VS + MSBuild & `after.<name>.sln.targets`

Don't forget about `after.<name>.sln.targets` features if you only need **unified action** in your MSBuild & Visual Studio [for all projects at once](../Features/Solution-wide/).

* [Read here](../Features/Solution-wide/#afternameslntargets)