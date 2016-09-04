---
layout: doc
title: Continuous Integration (CI)
permalink: /doc/CI/
---
# Continuous Integration (CI) 

***world without Visual Studio***.

The vsSolutionBuildEvent also supports CI features [[?](http://en.wikipedia.org/wiki/Continuous_integration)]

[![Example with AppVeyor](../Resources/ci_example_appveyor.png)](../CI/CI.MSBuild/)

It's possible with additional components:

* [CI.MSBuild](../CI/CI.MSBuild/) - for work via msbuild.exe (MSBuild Tools)
* [Devenv Command-Line](../CI/Devenv Command-Line/) - for work via devenv instance of the Visual Studio

## Other utilities

The vsSolutionBuildEvent provides [API level](../Scheme/) for work in any places, so it can be implemented by other utilities.

## VS + MSBuild & `after.<name>.sln.targets`

Don't forget about `after.<name>.sln.targets` features if you only want action [for all projects at once](../Features/Solution-wide/).

* [Read here](../Features/Solution-wide/#afternameslntargets)