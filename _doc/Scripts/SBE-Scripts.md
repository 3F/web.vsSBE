---
layout: doc
title: SBE-Scripts
permalink: /doc/Scripts/SBE-Scripts/
---
# SBE-Scripts

SBE-Scripts - it's our engine for additional work over [MSBuild](../MSBuild/) - conditions, subcommands, files, etc. by components.

*you can use this as an additional variant and/or if need a some features, for example, special for Visual Studio etc. all of that are not exists/available with [MSBuild](../MSBuild/)*

## Components

{% include doc/SBE-Scripts/Components.html %}

## Syntax

All commands and operations should be wrapped with container:

```java 

#[ ... ]
```

To escape an sequences use `#`: 

```java 

##[ ... ]
```

If you have some problems with syntax and documentation for component can't say how this should be... don't worry, you can:

* See available Unit-tests for component: [vsSolutionBuildEventTest/SBEScripts/Components/](https://github.com/3F/vsSolutionBuildEvent/tree/master/vsSolutionBuildEventTest/SBEScripts/Components) (all tests see with [vsSolutionBuildEventTest](https://github.com/3F/vsSolutionBuildEvent/tree/master/vsSolutionBuildEventTest))
* Or, just [create new Issue](https://bitbucket.org/3F/vssolutionbuildevent/issues/new) - we are help you!

## Dom & Code Completion

With latest versions used [Dom](../../Dev/New Component/) for inspecting model of the SBE-Scripts core. You can see all available features with code completion (Intellisense) in editor.

*Note: Currently, all in this Wiki section added manually... it means that this may contain a some typo etc. Just use the code completion in program and this for additional help. Later this can be generated automatically with additional utility from our Dom.*

## Work from other Modes

All [available modes](../../Modes/) provide support of this engine. Moreover, in [C# Mode](../../Modes/CSharp/#work-with-msbuild-amp-sbe-scripts-engine) you can also use this engine directly as you want!

And for all this cases you should remember about protection of evaluation from used strings:

* All elements inside quotes (`"..."`, `'...'`) will be automatically protected from evaluation.

### What to do if really need the evaluation in other Modes

Use any convenient variants to avoid the using inside quotes or use **also** SBE-Scripts for using quotes.

For example, for [C# Mode](../../Modes/CSharp/):

* With [MSBuild Property Functions](http://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx):

```csharp 

string type = $([System.String]::Format('"{0}";', #[Build type]))
```

* With [UserVariableComponent](../SBE-Scripts/Components/UserVariableComponent/)

```csharp 

#[var _type = "#[Build type]"]
...
string type = #[var _type];
```

* With User-variables *(MSBuild or SBE-Scripts)*:

```csharp 

$(q = '"')
...
string type = $(q)#[Build type]$(q);
```

and others..

As result for all above you should see, for example:

```csharp

string type = "Rebuild";
```

## New Components for SBE-Scripts core

* [Creating Component](../../Dev/New Component/) ([Developer Zone](../../Dev/))

# References

* [Examples & Features](../../Examples/)
* [MSBuild](../MSBuild/)
* [Operations with strings](../../Features/Strings/)
* [Available modes](../../Modes/)
    * [C# Mode](../../Modes/CSharp/)
