---
layout: doc
title: Install and Build
permalink: /doc/Usage/
---

# Installation

## Visual Studio

You need VSPackage (**.vsix**) file:

* Find it from [Downloads page](/Downloads/). Or see latest binaries from [GitHub Releases Page](https://github.com/3F/vsSolutionBuildEvent/releases)

### SDK10 / SDK15 versions

* Starting from VS2019 you need use only **SDK15** packages.
* VS2017: SDK10 or **SDK15** (recommended)
* VS2010, VS2012, VS2013, VS2015: **SDK10**
* CI /Build Servers, msbuild tools: **SDK10** or **SDK15**
* Devenv Command Line version: **SDK10**
* API: **SDK10** or **SDK15**

### Upgrading to Visual Studio 2019

[Known problems](https://github.com/3F/vsSolutionBuildEvent/pull/45)

* `[VS feature]` Build can be started before activation of our plugin.
    * *Solution:* Modern VS platform uses lazy loading for all plugins that produces the case when build can be started before activation of our plugin. But you can still affect for priority activation via our [Status Panel] window from `View` - `Other Windows`! **Just attach** once our status panel and it will activate our plugin for early registering handlers for events like opening solution etc.

* Deactivated [Status Panel] from `View` - `Other Windows` - *Affected VS2017 when upgrading from SDK10 release to SDK15*
    * *Solution:* **Just close** this panel. Then, open it again from `View` - `Other Windows`.

# How to build vsSolutionBuildEvent

We finally migrated to GitHub: [https://github.com/3F/vsSolutionBuildEvent](https://github.com/3F/vsSolutionBuildEvent)

* [Source Code](/Downloads/#Code) / [Nightly builds](/Downloads/#NightlyBuilds)

For build you need also [vsSolutionBuildEvent](https://github.com/3F/vsSolutionBuildEvent) v0.12.8+

* All dependencies is managed by [GetNuTool](https://github.com/3F/GetNuTool) & NuGet and will be received automatically.

The build is possible for all VS versions starting from VS2010! Via MSBuild tools and Visual Studio.

## Debug at runtime via Visual Studio IDE

#### vsSolutionBuildEvent project

Find the vsSolutionBuildEvent project in solution:

* Set as StartUp project
* Open `Properties` > `Debug`:
    * *Start Action* - set as `Start External program`
    * Then, select your **devenv.exe**, eg.: C:\Program Files (x86)\Microsoft Visual Studio 16.0\Common7\IDE\devenv.exe
    * In *Start Options* > *Command line arguments*: '**/rootsuffix Exp**' (without quotes)


#### CI.MSBuild project

Find the CI.MSBuild project in solution:

* *Properties* -> *Debug*:
    * *Start Action* - set as `Start External program`
    * Add the full path to **msbuild.exe**, for example: C:\Program Files (x86)\MSBuild\14.0\bin\msbuild.exe
    * Optional, add path to vsSolutionBuildEvent sources in `Working Directory` field, for example: D:\projects\vsSolutionBuildEvent\
    * In *Start Options* > *Command line arguments*, for example:

```{{site.msblang}}
"<path_to_SolutionFile_for_debugging>.sln" /nologo /noconsolelogger 
/l:"CI.MSBuild\bin\<Current_Configuration_Name>\CI.MSBuild.dll";lib=vsSolutionBuildEvent\bin\<Current_Configuration_Name>\ /verbosity:Diagnostic /t:Rebuild /p:Configuration=<Configuration>;Platform=<Platform>
```

#### Devenv project

Find the Devenv project in solution:

* *Properties* -> *Debug:*
    * *Start Action* - set as `Start External program`
    * Also select your devenv.exe, eg.: C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\devenv.exe
    * In *Start Options* > *Command line arguments*: '**/resetaddin Devenv.Connect**' (without quotes)
    * *Enable Debuggers* - enable the `Enable the Visual Studio hosting process`
* *Command line arguments*, for example: `"D:\app\App1.sln" /Rebuild`
    * Also add 'Devenv.AddIn' into your '%HOMEPATH%\Documents\Visual Studio 2013\Addins' with full path to assembly, for example: '<Assembly>D:/full_path_to/Devenv.dll</Assembly>'


## Build via MSBuild tools (Microsoft Build Tools)

* [Clone repository](/Downloads/#Code). Then, just command [**build**](https://github.com/3F/vsSolutionBuildEvent/tree/master/bin):

```
.\build DBG
```

We're also using the following build helpers:

* [hMSBuild](https://github.com/3F/hMSBuild)

## What's next ?

* Create [New component]({{site.docp}}/Dev/New%20Component/)
* Improve all what you want...

We are waiting for your awesome contributions! via [GitHub](https://github.com/3F/vsSolutionBuildEvent/)

/[Developer Zone]({{site.docp}}/Dev/)
