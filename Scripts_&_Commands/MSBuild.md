# MSBuild

The Microsoft Build Engine is a platform for building applications. This engine, which is also known as MSBuild, provides an XML schema for a project file that controls how the build platform processes and builds software.

-------
`*!*` 

* Starting with v0.9, you can use the [SBE-Scripts](SBE-Scripts)
* Starting with v0.11, you can use the [CI.MSBuild](../CI/CI.MSBuild) for work through msbuild.exe (Microsoft Build Tools)

-------

MSDN References:

* [MSBuild](http://msdn.microsoft.com/en-us/library/vstudio/dd393574.aspx)
* [MSBuild Concepts](http://msdn.microsoft.com/en-us/library/vstudio/dd637714.aspx)
* [Property Functions](http://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx)

## MSBuild Property & Property Functions

The vsSolutionBuildEvent uses additional syntax for select specific project. This is so because this can be used for all projects at once as [Solution-wide](http://stackoverflow.com/q/2295454) ([related issue](https://bitbucket.org/3F/vssolutionbuildevent/issue/29/projectdir-doesnt-resolve-properly))

Syntax:
```
#!java

$(...)
$(...:project) - from selected project in your solution
```

Escape symbol is a $: 
```
#!java

$$(...) / $$(...:project)
```
Where '**...**' - is any allowed syntax with MSBuild data. See MSDN.

## Samples

_                            | Result
---------------------------- | ---
$([System.Guid]::NewGuid())| `2d2c4ac4-b48d-4509-b42b-aaf6b6047866`
$(SolutionDir.Substring(0,3))|  d:\
$([System.DateTime]::Now.ToString("yyyy.MM.dd HH:mm:ss"))| 2014.06.19 17:32:53
$(EntityDeployIntermediateResourcePath.Substring(0,1):boost)|  F
$([MSBuild]::GetRegistryValueFromView ('HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft SDKs\Silverlight\v3.0\ReferenceAssemblies', 'SLRuntimeInstallPath', null, RegistryView.Registry64, RegistryView.Registry32)) | C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\Silverlight\v3.0\
$([System.IO.Path]::Combine($(OS), $(Platform))) | Windows_NT\\x86
$(MSBuildBinPath)\MSBuild.exe "$(ProjectPath.Replace('\', '/'):Version)" /t:Build /p:Configuration=Release | C:\Windows\Microsoft.NET\Framework\v4.0.30319\MSBuild.exe "D:/prg/projects/vsSolutionBuildEvent/Version/Version.csproj" /t:Build /p:Configuration=Release
$([System.DateTime]::UtcNow.Ticks) | `635645190692933259`
$([System.DateTime]::Parse("2015/04/01").ToBinary()) | `635634432000000000`


* if you see problem with any slashes for path:
```
#!java

$(SolutionPath.Replace('\', '/'))  -> D:\App\ConsoleApp1.sln to D:/App/ConsoleApp1.sln
$(SolutionPath.Replace('\', '\\')) -> to D:\\App\\ConsoleApp1.sln
```

* delta to time
```
#!java

$([System.TimeSpan]::FromTicks($([MSBuild]::Subtract($(tNow), $(tStart)))).TotalMinutes.ToString("0"))
```

* manually build with msbuild.exe
```
#!java

$(MSBuildBinPath)\MSBuild.exe "$(ProjectPath.Replace('\', '/'):Version)" /t:Build /p:Configuration=Release 
 
 & 
 
"$(TargetPath:Version)"  
  "$(SolutionDir)" 
  "$(ProjectDir:mainApp)Version.cs"  
  "$(ProjectDir:mainApp)source.extension.vsixmanifest"
```


## User-variables for MSBuild core

It's older and strictly limited version compared with [UserVariableComponent](SBE-Scripts/Components/UserVariableComponent) ([SBE-Scripts core](SBE-Scripts))

Currently allows the only definitions from others variables/properties & property functions. 

Syntax:
```
#!java

$(name = $(...))
```


For example:

```
#!java

$(start = $([System.DateTime]::Parse("2015/04/01").ToBinary()))
```
```
#!java

$(pdir = $(ProjectDir:project))
```
```
#!java

$(pdir = $(ProjectDir.Replace('\', '/'):project))
```

## Nested levels - recursive evaluation for MSBuild Properties

In vsSolutionBuildEvent the most variables can be evaluated with nested levels.

```
#!java

$($(...:$(...)))
```

```
#!java

$($(...:$($(...:$(...)))))
```
and similar.

This useful for any dynamic references on your data or additional evaluation with MSBuild. For example: 

if you don't put a fixed project name and need link to variable or evaluate some property from specific project in your solution, you can for example:

```
#!java
$($(ProjectDir:$(SolutionName)))
```
```
#!java
$($(ProjectDir:$(ProjectName)))
```
and similar... *see also related issue - '[$(ProjectDir) doesn't resolve properly](https://bitbucket.org/3F/vssolutionbuildevent/issue/29/projectdir-doesnt-resolve-properly)'*


# References

* [Examples & Features](../Examples)
* [SBE-Scripts](SBE-Scripts)
* [Visual Studio Gallery page](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/)
