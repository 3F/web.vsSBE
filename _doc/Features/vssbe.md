---
layout: doc
title: vsSolutionBuildEvent/vsSBE (.vssbe) File
permalink: /doc/Features/.vssbe/
---
# .vssbe

All shared settings will be located in solution directory as **.vssbe** text-based file.

**[v0.9+](/Changelist/#vsix)** uses the [JSON format](http://json.org) (text-based language-independent data interchange format)

You can also ignore this from your repo with scm if needed ([.gitignore](http://git-scm.com/docs/gitignore), .hgignore, .bzrignore, svn:ignore, etc.,)

## .vssbe for each .sln (Solution File)

For [v0.11.2+](/Changelist/#vsix) you can also define the special version of configuration file for specific solution.

`<SolutionFile>.vssbe`

For example:

If you have a different solution files:

* app_2012.sln
* app_2013.sln
etc.

you can also define specific configuration like this:

* app_2012.vssbe
* app_2013.vssbe
etc.

The specific configuration in the priority if the **.vssbe** used along with **[SolutionFile].vssbe**. 

## .vssbe.user

The `.vssbe.user` appeared in [v0.12.4](/Changelist/#vsix) as user configuration (for specific user).

We strongly recommend to ignore this from your SCM, 
because this contains settings e.g.: 
value of zooming & Word wrapping of main editor, DebugMode & CacheData of binaries for [C# Mode](../../Modes/CSharp/), etc.

# Unified Project name for different .sln

You can see the inconvenience with [MSBuild](../../Scripts/MSBuild/) / [SBE-Scripts](../../Scripts/SBE-Scripts/) engines or any incorrect behaviour in UI if you have a few .sln versions for your project.

This is so because it's default behaviour for naming projects by name of files in visual studio.

For example, [current project](https://github.com/3F/vsSolutionBuildEvent) is also uses a few solution files, for example:

* vsSolutionBuildEvent.sln, vsSolutionBuildEvent_2012.sln, vsSolutionBuildEvent_2015.sln

This files contains a few projects with different settings, for example:

* Devenv.csproj, Devenv_2012.csproj, Devenv_2015.csproj

So the `ProjectName` can be as 'Devenv_2012', 'Devenv_net40' etc. if you open .sln

Some projects may be manually configured for using with one unified project file (*.csproj, *.vcxproj, etc.), like:

```xml
<Project DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003" ToolsVersion="4.0">
  ...
  <Import Project="MyProject.csproj" />
  <PropertyGroup Condition="'$(VisualStudioVersion)'=='12'">
    <PlatformToolset>v120</PlatformToolset>
    <ToolsVersion>12.0</ToolsVersion>
    <OldToolsVersion>4.0</OldToolsVersion>
  </PropertyGroup>
  ...
```

or for example

```xml
  <PropertyGroup>
    <VisualStudioVersion Condition="'$(VisualStudioVersion)' == ''">0</VisualStudioVersion>
    <VsSDKVersion Condition="'$(VsSDKVersion)' == ''">0</VsSDKVersion>
    <TargetFrameworkVersion Condition="'$(VisualStudioVersion)' &gt; '10' or '$(VsSDKVersion)' &gt; '10'">v4.5</TargetFrameworkVersion>
    <csprojPostfix Condition="'$(VisualStudioVersion)' == '14.0' or '$(VsSDKVersion)' == '14.0'">_2015</csprojPostfix>
    <csprojPostfix Condition="'$(VisualStudioVersion)' == '11.0' or '$(VsSDKVersion)' == '11.0'">_2012</csprojPostfix>
  </PropertyGroup>
  <ItemGroup Condition="$(SpecLibForEnvCI) != true">
    <ProjectReference Include="..\vsSolutionBuildEvent$(csprojPostfix).csproj">
      <Project>{32E44995-F621-4E77-B46A-8F65D64E7FEA}</Project>
      <Name>vsSolutionBuildEvent</Name>
    </ProjectReference>
  </ItemGroup>
```


But some not...

And if your project cannot be shared between versions of Visual Studio (for example, if you use the Experimental instance for debugging, etc.)
Or if you only need the unified name and similar: you should define the **unified project** name for all used .sln with **ProjectName** property for specific project file.

## Via User-Variables & Global MSBuild properties

The most easy way, just:

* Add action for `Sln-Opened` event (or similar).
* Enable [MSBuild](../../Scripts/MSBuild/) support.
* Define new `ProjectName` property:

```{{site.msblang}}
$(+ProjectName = 'MyUnifiedName')
```

* Activate event and click [Apply]

That's all. Restart your IDE and have fun.

## Obsolete variant or variant for old versions

{% assign infoData = "Obsolete. Please use the variant above - '[Via User-Variables](#via-user-variables--global-msbuild-properties)'" %}
{% include elem/info %}

You can define the `ProjectName` property in your project files (*.csproj, *.vcxproj, etc.)

### The Rename feature

Use this:

![rename project](../../Resources/projectName/vs_rename_project_219.png)

Or:

### Define directly

* Open your solution file in Visual Studio, right click on your project in 'Solution Explorer' and click `Unload Project`:

![Step 1](../../Resources/projectName/step1.png)

* Click on `Edit ...`

![Step 2](../../Resources/projectName/step2.png)

* Find or define new **PropertyGroup** and place inside the property **ProjectName**

```xml
  <PropertyGroup>
      ...
      <ProjectName>YourProjectName</ProjectName>
      ...
  </PropertyGroup>
```

for example:

![Step 3](../../Resources/projectName/step3.png)

* Save, Close tab with project file and reload project:

![Step 4](../../Resources/projectName/step4.png)

Repeat all steps for other files.

# Optional 'Command__' property

Appeared in [v0.12.4](/Changelist/#vsix) for convenient using directly in file (reading or direct modifications). 

However, the 'Command__' property is temporary and used for compatibility with format **v0.9**.

This can be inconvenient and we also added settings (until upgrade of format) to turn off this field:

* `Settings` - `Plugin` - `Suppress 'Command__' property`