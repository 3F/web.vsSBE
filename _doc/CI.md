---
layout: doc
title: Continuous Integration (CI)
permalink: /doc/CI/
---
# Continuous Integration (CI) 

***world without Visual Studio***.

The vsSolutionBuildEvent also supports CI features [[?](http://en.wikipedia.org/wiki/Continuous_integration)]

It's possible with additional components:

* **[CI.MSBuild](../CI/CI.MSBuild/)** - for work via msbuild.exe (MSBuild Tools)
    * To get CI.MSBuild in one click ~10 Kb: [get.CIM.bat](http://vssbe.r-eg.net/doc/CI/get.CIM.bat) (Compiled by [GetNuTool](https://github.com/3F/GetNuTool))
* [Devenv Command-Line](../CI/Devenv Command-Line/) - for work via devenv instance of the Visual Studio

[![Example with AppVeyor](../Resources/ci_example_appveyor.png)](../CI/CI.MSBuild/)

## Other utilities

The vsSolutionBuildEvent provides [API level](../Scheme/) for work in any places, so it can be implemented by other utilities.

## VS + MSBuild & `after.<name>.sln.targets`

Don't forget about `after.<name>.sln.targets` features if you only want action [for all projects at once](../Features/Solution-wide/).

* [Read here](../Features/Solution-wide/#afternameslntargets)