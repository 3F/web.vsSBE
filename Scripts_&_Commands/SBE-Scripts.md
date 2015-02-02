# SBE-Scripts #

SBE-Scripts - it's internal specification for additional work over MSBuild - conditions, subcommands, files, etc. by components.

## Components ##

* [BuildComponent](SBE-Scripts/Components/BuildComponent) - Component of building
* [CommentComponent](SBE-Scripts/Components/CommentComponent) - Any supported comments with scripts
* [ConditionComponent](SBE-Scripts/Components/ConditionComponent) - Conditions in scripts
* [DTEComponent](SBE-Scripts/Components/DTEComponent) - For work with DTE
* [FileComponent](SBE-Scripts/Components/FileComponent) - Support file operations - I/O, call, etc.
* [FunctionComponent](SBE-Scripts/Components/FunctionComponent) - Mixed supported functions
* [InternalComponent](SBE-Scripts/Components/InternalComponent) - All internal operation with vsSBE
* [OWPComponent](SBE-Scripts/Components/OWPComponent) - For work with OWP
* [UserVariableComponent](SBE-Scripts/Components/UserVariableComponent) - For work with User-Variables

## Dom & Code Completion ##

With latest versions used [Dom](../Developer Zone/New Component) for inspecting model of the SBE-Scripts core. You can see all available features with code completion (Intellisense) in editor.

*Note: Currently, all in this section added manually... but, later this section should be generated automatically.*

## Syntax ##

All commands and operations should be wrapped with container:

```
#!java

#[ ... ]
```

If you have a problem with syntax and documentation for component can't say how this should be... don't worry, you can:

* See available Unit-tests for component: [vsSolutionBuildEventTest/SBEScripts/Components/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEventTest/SBEScripts/Components/) (all tests see with [vsSolutionBuildEventTest](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEventTest/))
* Or, just [create the new Issue](https://bitbucket.org/3F/vssolutionbuildevent/issues/new) - we help you!


## New Components for SBE-Scripts core ##

* [Developer Zone](../Developer Zone)
