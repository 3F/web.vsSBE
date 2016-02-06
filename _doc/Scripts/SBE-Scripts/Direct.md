---
layout: doc
title: Direct use the SBE-Scripts engine.
permalink: /doc/Scripts/SBE-Scripts/Direct/
---

# Direct use the SBE-Scripts engine

If you want to work directly with engine, you should remember about protection of evaluation from used strings:

* All elements inside quotes (`"..."`, `'...'`) will be automatically protected from evaluation.

*If you work with standard options, you also should remeber this - [Dynamic evaluation with both engines MSBuild & SBE-Scripts](../../../Features/Strings/#dynamic-evaluation-with-both-engines-msbuild-amp-sbe-scripts)*

## What to do if really need evaluation

Use any convenient variants to avoid using inside quotes or use **also** the SBE-Scripts for using quotes.

For example, for [C# Mode]({{site.docp}}/Modes/CSharp/):

* With [MSBuild Property Functions](http://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx):

```csharp
string type = $([System.String]::Format('"{0}";', #[Build type]))
```

* With [UserVariableComponent](../Components/UserVariableComponent/)

```csharp
#[var _type = "#[Build type]"]
...
string type = #[var _type];
```

* With User-variables *(MSBuild or SBE-Scripts)*:

```csharp
$(q = '"')
.. .
string type = $(q)#[Build type]$(q);
```

and others..

As result for all above you should see, for example:

```csharp
string type = "Rebuild";
```

## New Components for SBE-Scripts core

* [How to create Component in 5min]({{site.docp}}/Dev/New Component/) ([Developer Zone]({{site.docp}}/Dev/))

# References

* [Examples & Features]({{site.docp}}/Examples/)
* [MSBuild](../../MSBuild/)
* [Operations with strings]({{site.docp}}/Features/Strings/)
* [Available modes]({{site.docp}}/Modes/)
    * [C# Mode]({{site.docp}}/Modes/CSharp/)
