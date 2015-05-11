# SBE-Scripts

SBE-Scripts - it's internal specification for additional work over [MSBuild](MSBuild) - conditions, subcommands, files, etc. by components.

*you can use this as an additional variant and/or if need a some features, for example, special for Visual Studio etc. what are not exists with [MSBuild](MSBuild)*

## Components

* [BuildComponent](SBE-Scripts/Components/BuildComponent) - Component to managing of building the projects at runtime and similar.
* [CommentComponent](SBE-Scripts/Components/CommentComponent) - Any supported comments in scripts.
* [ConditionComponent](SBE-Scripts/Components/ConditionComponent) - Conditional statements for [scripts](../scripts).
* [DTEComponent](SBE-Scripts/Components/DTEComponent) - For work with EnvDTE.
* [FileComponent](SBE-Scripts/Components/FileComponent) - Operations with files and standard streams.
* [FunctionComponent](SBE-Scripts/Components/FunctionComponent) - Mixed supported functions.
* [InternalComponent](SBE-Scripts/Components/InternalComponent) - All internal operations with vsSBE.
* [OWPComponent](SBE-Scripts/Components/OWPComponent) - Works with OWP and similar operations.
* [UserVariableComponent](SBE-Scripts/Components/UserVariableComponent) - Works with User-Variables.

## Dom & Code Completion

With latest versions used [Dom](../Developer Zone/New Component) for inspecting model of the SBE-Scripts core. You can see all available features with code completion (Intellisense) in editor.

*Note: Currently, all in this Wiki section added manually... it means that this may contain a some typo etc. Just use the code completion in program and this for more help. Later this can be generated automatically with additional utility from our Dom.*

## Syntax

All commands and operations should be wrapped with container:

```
#!java

#[ ... ]
```

If you have a problem with syntax and documentation for component can't say how this should be... don't worry, you can:

* See available Unit-tests for component: [vsSolutionBuildEventTest/SBEScripts/Components/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEventTest/SBEScripts/Components/) (all tests see with [vsSolutionBuildEventTest](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEventTest/))
* Or, just [create the new Issue](https://bitbucket.org/3F/vssolutionbuildevent/issues/new) - we are help you!


## New Components for SBE-Scripts core

* [Developer Zone](../Developer Zone)


# References

* [Examples & Features](../Examples)
* [MSBuild](MSBuild)
