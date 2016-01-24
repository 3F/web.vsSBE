---
layout: doc
title: Continuous Integration (CI)
permalink: /doc/CI/
---
# Continuous Integration (CI) 

*and other work* ***without Visual Studio***.

The vsSolutionBuildEvent is also can be used for [continuous Integration](http://en.wikipedia.org/wiki/Continuous_integration) etc.

[![Example with AppVeyor](../Resources/ci_example_appveyor.png)](../CI/CI.MSBuild/)

It's possible with additional features:

* [CI.MSBuild](../CI/CI.MSBuild/) - for work through msbuild.exe (MSBuild Tools)
* [Devenv Command-Line](../CI/Devenv Command-Line/) - for work through devenv of the Visual Studio

## Other utilities

The vsSolutionBuildEvent provides [API level](../Scheme/) for work in any places, so it can be implemented by other utilities.

## VS + MSBuild & `after.<name>.sln.targets`

Don't forget about `after.<name>.sln.targets` features if you only want action [for all projects at once](../Features/Solution-wide/).

* [Read here](../Features/Solution-wide/#after-lt-name-gt-sln-targets)