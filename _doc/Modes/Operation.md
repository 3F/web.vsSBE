---
layout: doc
title: Operation Mode
permalink: /doc/Modes/Operation/
---

# Operation Mode

This action type allows executing the DTE-commands for your Visual Studio.

After selecting of this mode, you should write command or list of commands (separated by enter key) with arguments if needed.

## DTE-Commands

All available commands for your IDE you can see with UI-Helper:

* `vsSBE` - `Tools` - `DTE-Commands`

For testing of commands, you can try with testing tool:

* `vsSBE` - `Tools` - `Execution DTE-Commands`

*a few commands should be separated by newline in your list*


## Examples

### Activation of specific configuration & platform

```java 

Build.SolutionConfigurations(Debug)
Build.SolutionPlatforms(x86)
```

### To cancel build operation ###

```java 

Build.Cancel
```

# Multiple mixed DTE-Commands for scripts

As variant you can use powerful and flexible control with [SBE-Scripts](../../Scripts/SBE-Scripts/) engine.

* For this case you should use the [DTEComponent](../../Scripts/SBE-Scripts/Components/DTEComponent/)

```java 

#[( $(isAllow) && ($(Configuration) ^= "Release" || $(sysLim) > 16) )
{
    #[DTE exec: Build.Cancel]
    #[DTE exec: Build.SolutionConfigurations(Debug)]
}]
```
etc.


# References #

* [SBE-Scripts](../../Scripts/SBE-Scripts/)
* [MSBuild](../../Scripts/MSBuild/)
* [Processing modes](../../Modes/)
* [Examples & Features]({{site.docp}}/Examples/)