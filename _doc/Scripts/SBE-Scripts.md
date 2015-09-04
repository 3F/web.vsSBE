---
layout: doc
title: SBE-Scripts
permalink: /doc/Scripts/SBE-Scripts/
---
# SBE-Scripts

SBE-Scripts - it's internal specification for additional work over [MSBuild](../MSBuild/) - conditions, subcommands, files, etc. by components.

*you can use this as an additional variant and/or if need a some features, for example, special for Visual Studio etc. what are not exists/available with [MSBuild](../MSBuild/)*

## Components

{% include doc/SBE-Scripts/Components.html %}

## Dom & Code Completion

With latest versions used [Dom](../../Dev/New Component/) for inspecting model of the SBE-Scripts core. You can see all available features with code completion (Intellisense) in editor.

*Note: Currently, all in this Wiki section added manually... it means that this may contain a some typo etc. Just use the code completion in program and this for more help. Later this can be generated automatically with additional utility from our Dom.*

## Syntax

All commands and operations should be wrapped with container:

```java 

#[ ... ]
```

If you have a problem with syntax and documentation for component can't say how this should be... don't worry, you can:

* See available Unit-tests for component: [vsSolutionBuildEventTest/SBEScripts/Components/](https://github.com/3F/vsSolutionBuildEvent/tree/master/vsSolutionBuildEventTest/SBEScripts/Components) (all tests see with [vsSolutionBuildEventTest](https://github.com/3F/vsSolutionBuildEvent/tree/master/vsSolutionBuildEventTest))
* Or, just [create the new Issue](https://bitbucket.org/3F/vssolutionbuildevent/issues/new) - we are help you!


## New Components for SBE-Scripts core

* [Creating Component](../../Dev/New Component/) ([Developer Zone](../../Dev/))


# References

* [Examples & Features](../../Examples/)
* [MSBuild](../MSBuild/)
