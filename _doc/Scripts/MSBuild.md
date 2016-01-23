---
layout: doc
title: MSBuild
permalink: /doc/Scripts/MSBuild/
---
# MSBuild

*The Microsoft Build Engine which is also known as MSBuild.*

This page contains information of how to work with MSBuild in vsSolutionBuildEvent context. 

*Additional syntax & basic samples are contained below.*

-------
`*!*` 

* For work with **MSBuild Tools** (Microsoft Build Tools) use the [CI.MSBuild](../../CI/CI.MSBuild/).
* For work with MSBuild Targets, Tasks and others, use the [Targets Mode](../../Modes/Targets/).
* You can also use the [SBE-Scripts](../SBE-Scripts/) engine for additional features as a conditions, subcommands, file operations, etc.

-------
&nbsp;

## MSBuild Property & Property Functions

* MSDN - [Property Functions](http://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx)

The vsSolutionBuildEvent uses additional syntax for select specific project. This is so because this can be used for all projects at once as [Solution-wide](http://stackoverflow.com/q/2295454) ([related issue](https://bitbucket.org/3F/vssolutionbuildevent/issue/29/projectdir-doesnt-resolve-properly))

Syntax:

```Bash 

$(...)
$(...:project) - from selected project in your solution
```

To escape an sequences use `$`: 

```Bash 

$$(...) / $$(...:project)
```
Where '**...**' - is any allowed syntax with MSBuild data. See MSDN.

## Samples

vsSBE                        | Result
---------------------------- | ---
$([System.Guid]::NewGuid())| `2d2c4ac4-b48d-4509-b42b-aaf6b6047866`
$(SolutionDir.Substring(0,3))|  d:\
$([System.DateTime]::Now.ToString("yyyy.MM.dd HH:mm:ss"))| 2014.06.19 17:32:53
$(EntityDeployIntermediateResourcePath.Substring(0,1)**:boost**)|  F
$([MSBuild]::GetRegistryValueFromView ('HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft SDKs\Silverlight\\\v3.0\ReferenceAssemblies', 'SLRuntimeInstallPath', null, RegistryView.Registry64, RegistryView.Registry32)) | C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\Silverlight\v3.0\
$([System.IO.Path]::Combine($(OS), $(Platform))) | Windows_NT\\x86
$(MSBuildBinPath)\MSBuild.exe "$(ProjectPath.Replace('\', '/')**:Version**)" /t:Build /p:Configuration=Release | C:\Windows\Microsoft.NET\Framework\v4.0.30319\MSBuild.exe "D:/prg/projects/vsSolutionBuildEvent/Version/Version.csproj" /t:Build /p:Configuration=Release
$([System.DateTime]::UtcNow.Ticks) | `635645190692933259`
$([System.DateTime]::Parse("2015/04/01").ToBinary()) | `635634432000000000`
$([MSBuild]::GetRegistryValue('HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\12.0\Debugger', 'SymbolCacheDir')) | C:\Symbols


* if you see problem with any slashes for path:

```minid 

$(SolutionPath.Replace('\', '/'))  -> D:\App\ConsoleApp1.sln to D:/App/ConsoleApp1.sln
$(SolutionPath.Replace('\', '\\')) -> to D:\\App\\ConsoleApp1.sln
```

* delta for time:

```Bash 

$([System.TimeSpan]::FromTicks($([MSBuild]::Subtract($(tNow), $(tStart)))).TotalMinutes.ToString("0"))
```

* manually build with msbuild.exe and call binary with args:

```minid 

$(MSBuildBinPath)\MSBuild.exe "$(ProjectPath.Replace('\', '/'):Version)" /t:Build /p:Configuration=Release 
 
 & 
 
"$(TargetPath:Version)"  
  "$(SolutionDir)" 
  "$(ProjectDir:mainApp)Version.cs"  
  "$(ProjectDir:mainApp)source.extension.vsixmanifest"
```


## User-variables for MSBuild core

It's a strictly limited version compared with [UserVariableComponent](../SBE-Scripts/Components/UserVariableComponent/) ([SBE-Scripts core](../SBE-Scripts/))

Syntax:

```Bash 

$(name = $(...))
```

In **v0.11.4** added strings:

* `".."` - Allows any evaluation inside string. Escaping is a `\"`
* `'..'` - All msbuild containers $() should not be evaluated for this type string. Escaping is a `\'`

*'\' and "\" used 'as is' for compatibility with MSBuild*

```Bash 

$(name = "  - Platform is a $(Platform)  ")
```

*In older versions: Allows definitions only from other variables/properties & property functions.* 

Samples:

```Bash 

$(start = $([System.DateTime]::Parse("2015/04/01").ToBinary()))
```

```Bash 

$(pdir = $(ProjectDir:project))
```

```Bash 

$(pdir = $(ProjectDir.Replace('\', '/'):project))
```

### Global MSBuild properties

* To define msbuild property via user-variable:

```Bash 

$(+name = ...)
```

* To undefine msbuild property via user-variable:

```Bash 
$(-name =)
$(-name = ...)
```

## Nested levels - recursive evaluation for MSBuild Properties

In vsSolutionBuildEvent the most variables can be evaluated with nested levels also for each project.

```Bash 

$($(...:$(...)))
```

```Bash 

$($(...:$($(...:$(...)))))
```
and similar,

This useful for any dynamic references on your data or additional evaluation with MSBuild. For example: 

if you don't put a fixed project name and need link to variable or evaluate some property from specific project in your solution, you can for example:
 
for v0.11.4+ | for older versions:
------------------------|-------------------
`$(ProjectDir:$(SolutionName))` | `$($(ProjectDir:$(SolutionName)))`
`$(ProjectDir:$(ProjectName))` | `$($(ProjectDir:$(ProjectName)))`

and similar... *see also related issue - '[$(ProjectDir) doesn't resolve properly](https://bitbucket.org/3F/vssolutionbuildevent/issue/29/projectdir-doesnt-resolve-properly)'*

## Solution Configuration & Platform

This also has a few differences as part of 'Solution-wide'(see above) features:

Property         | Description
---------------- | ----------
$(Configuration) | Active configuration **for solution**
$(Configuration:**project**) | Configuration for specific project
$(Platform) | Active platform **for solution**
$(Platform:**project**) | Platform for specific project

## Registry Properties

The [Registry Properties](https://msdn.microsoft.com/en-us/library/vstudio/ms171458.aspx) are allowed in **v0.11.4+**:

```Bash 

$(registry:Hive\MyKey\MySubKey@ValueName) - gets value for ValueName from subkey.
$(registry:Hive\MyKey\MySubKey) - gets the default subkey value.
```

**for older versions** you can also use the registry properties but only with a little trick, for example:

```Bash 

#[var k = :Hive\MyKey\MySubKey]
$(registry$(k))
```

```Bash 

#[var k = :Hive\MyKey\MySubKey@ValueName]
$(registry$(k))
```
*and similar..*

`*!*` **OR** you can read system registry values with:

* [MSBuild GetRegistryValue](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_GetRegistryValue) -  returns the value of a registry key:

```Bash 

$([MSBuild]::GetRegistryValue('keyName', 'valueName'))
```

* [MSBuild GetRegistryValueFromView](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_GetRegistryValueFromView) - gets system registry data. The key and value are searched in each registry view(e.g. 32-bit & 64-bit registry view) in order until they are found. Sample of how to look first in the 64-bit then in the 32-bit registry view:

```Bash 

$([MSBuild]::GetRegistryValueFromView('keyName', 'valueName', null, RegistryView.Registry64, RegistryView.Registry32))
```


# References

* [Examples & Features](../../Examples/)
* [SBE-Scripts](../SBE-Scripts/)
* [CI.MSBuild](../../CI/CI.MSBuild/)
* [Processing modes](../../Modes/)
    * [Targets Mode](../../Modes/Targets/)
* MSDN:
    * [MSBuild](http://msdn.microsoft.com/en-us/library/vstudio/dd393574.aspx)
    * [MSBuild Concepts](http://msdn.microsoft.com/en-us/library/vstudio/dd637714.aspx)
    * [Property Functions](http://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx)

