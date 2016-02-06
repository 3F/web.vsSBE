---
layout: doc
title: Targets Mode
permalink: /doc/Modes/Targets/
---
# Targets Mode

This action type for work with MSBuild [Targets](https://msdn.microsoft.com/en-us/library/vstudio/ms171462.aspx) / [Tasks](https://msdn.microsoft.com/en-us/library/vstudio/ms171466.aspx) [etc.](https://msdn.microsoft.com/en-us/library/vstudio/dd393574.aspx) 'as is' (classic compatible mode).

# Blank Project

* v0.12.4+:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="12.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">

    <Target Name="Init">
        <!-- ... -->
    </Target>

    <!--
        Additional properties:
            $(ActionName)
            $(BuildType)
            $(EventType)
            $(SupportMSBuild)
            $(SupportSBEScripts)
            $(SolutionActiveCfg)
            $(StartupProject)
    -->
</Project>
```

* Obsolete variant:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Project DefaultTargets="Build" ToolsVersion="12.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
    <!-- ... -->
</Project>
```

## ToolsVersion

Use any available version for you, for example:

* "12.0", "14.0", "2.0", "3.5", "4.0"

# Samples

* [MSDN](https://msdn.microsoft.com/en-us/library/vstudio/dd393574.aspx)
    * [MSBuild Concepts](https://msdn.microsoft.com/en-us/library/vstudio/dd637714.aspx)
* Basic example of work with [Targets](https://msdn.microsoft.com/en-us/library/vstudio/ms171462.aspx) / [Tasks](https://msdn.microsoft.com/en-us/library/vstudio/ms171466.aspx): the [Map of projects](https://gist.github.com/3F/a77129e3978841241927) ([from here](http://stackoverflow.com/a/18311007))


Use [MSDN](https://msdn.microsoft.com/en-us/library/vstudio/dd637714.aspx) and feel free...

```xml
<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="12.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">

    <Target Name="Init">
        <Error Condition="'$(BuildType)'!='Rebuild'" 
                Text="This action requires 'Rebuild' build type. Current: '$(BuildType)'" />
                
        <CallTarget Targets="_BuildSpec" />
    </Target>
    <Import Project="$(SolutionDir)\stasks.targets" />
    
</Project>
```


# References

* [Processing modes](../../Modes/)
* [Examples & Features](../../Examples/)
* [The Microsoft Build Engine](https://msdn.microsoft.com/en-us/library/vstudio/dd393574.aspx)
    * [MSBuild Concepts](https://msdn.microsoft.com/en-us/library/vstudio/dd637714.aspx)
        * [MSBuild Targets](https://msdn.microsoft.com/en-us/library/vstudio/ms171462.aspx)
        * [MSBuild Tasks](https://msdn.microsoft.com/en-us/library/vstudio/ms171466.aspx)