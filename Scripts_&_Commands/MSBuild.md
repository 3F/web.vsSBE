# MSBuild #

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

Note: also vsSBE provides additional handling for specific project.

Syntax:
```
#!java

$(name)
$(name:project) - properties from selected project in your solution
```

Escape symbol is a $: 
```
#!java

$$(name) ... $$(name:project)
```

Samples:

_                            | Result
---------------------------- | ---
$([System.Guid]::NewGuid())| 2d2c4ac4-b48d-4509-b42b-aaf6b6047866
$(SolutionDir.Substring(0,3))|  d:\
$([System.DateTime]::Now.ToString("yyyy.MM.dd HH:mm:ss"))| 2014.06.19 17:32:53
$(EntityDeployIntermediateResourcePath.Substring(0,1):boost)|  F
$([MSBuild]::GetRegistryValueFromView ('HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft SDKs\Silverlight\v3.0\ReferenceAssemblies', 'SLRuntimeInstallPath', null, RegistryView.Registry64, RegistryView.Registry32)) | C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\Silverlight\v3.0\
$([System.IO.Path]::Combine($(OS), $(Platform))) | Windows_NT\\x86
$(MSBuildBinPath)\MSBuild "$(ProjectPath.Replace('\', '/'):Version)" /t:Build /p:Configuration=Release | C:\Windows\Microsoft.NET\Framework\v4.0.30319\MSBuild "D:/prg/projects/vsSolutionBuildEvent/Version/Version.csproj" /t:Build /p:Configuration=Release


## Examples ##

```
#!java

$([System.DateTime]::Parse("07.07.2014").ToBinary())
```

```
#!java

$([System.DateTime]::UtcNow.Ticks)
```

```
#!java

$([System.TimeSpan]::FromTicks($([MSBuild]::Subtract($(tNow), $(tStart)))).TotalMinutes.ToString("0"))
```


```
#!java
$(MSBuildBinPath)\MSBuild "$(ProjectPath.Replace('\', '/'):Version)" /t:Build /p:Configuration=Release 
 
 & 
 
"$(TargetPath.Replace('\', '/'):Version)"  
  "$(SolutionDir.Replace('\', '/'))" 
  "$(ProjectDir.Replace('\', '/'):mainApp)Version.cs"  
  "$(ProjectDir.Replace('\', '/'):mainApp)source.extension.vsixmanifest"
```

