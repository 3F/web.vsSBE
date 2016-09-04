---
layout: doc
title: How to build
permalink: /doc/Dev/How-to-build/
---
# How to build vsSolutionBuildEvent

Branches status:

[![master branch](https://img.shields.io/badge/master_-%7E-555555.svg?style=flat)](https://ci.appveyor.com/project/3Fs/vssolutionbuildevent/branch/master)[![Build status](https://ci.appveyor.com/api/projects/status/l38xn0j2c5an28e1/branch/master?svg=true)](https://ci.appveyor.com/project/3Fs/vssolutionbuildevent/branch/master) [![develop branch](https://img.shields.io/badge/develop-%7E-555555.svg?style=flat)](https://ci.appveyor.com/project/3Fs/vssolutionbuildevent/branch/develop)[![Build status](https://ci.appveyor.com/api/projects/status/l38xn0j2c5an28e1/branch/develop?svg=true)](https://ci.appveyor.com/project/3Fs/vssolutionbuildevent/branch/develop)

* [Source Code](/Downloads/#Code)
* [Nightly builds](/Downloads/#NightlyBuilds)
* [Snapshots](/Downloads/#Snapshots)

{% assign infoColor = "#CACA35" %}
{% assign infoData  = "Please note: latest **cf21313** revision provides new structure of project files by the new vsSBE.SDK. Now you can use a single `vsSolutionBuildEvent.sln` and more freely use both .NET 4.0 and 4.5" %}
{% include elem/info %}

## Variant for Visual Studio

`Current variant is more convenient for develop & debug. Other are contained below.`

### Requirements

* C# Language version support:
    * C# 6.0+ starting after [2616b53ae03e9795584cfcde38df4b4bda56e818](https://github.com/3F/vsSolutionBuildEvent/commit/2616b53ae03e9795584cfcde38df4b4bda56e818)
    * C# 4.0+ initially
* MS Visual Studio 2010 or higher (You can use free [Visual Studio Community 2013](http://www.visualstudio.com/products/visual-studio-community-vs) or higher)
* Installed Microsoft Visual Studio SDK:
    * For Visual Studio 2015+ - The SDK is no longer offered as a separate download and included as an optional feature in Visual Studio setup ([How to enable](https://msdn.microsoft.com/en-us/library/bb166441(v=vs.140).aspx))
    * [For Visual Studio 2013](http://www.microsoft.com/en-us/download/details.aspx?id=40758)
    * [For Visual Studio 2012](http://www.microsoft.com/en-us/download/details.aspx?id=30668)
    * [For Visual Studio 2010 SP1](http://www.microsoft.com/en-us/download/details.aspx?id=21835) (after update to SP1)
    * [For Visual Studio 2010](http://www.microsoft.com/en-us/download/details.aspx?id=2680) (without update SP1)
* .NET Framework:
    * [minimal v4.5 for develop on Visual Studio 2012+](http://www.microsoft.com/en-US/download/details.aspx?id=30653) (Offline installer: [dotNetFx45_Full_x86_x64.exe](http://go.microsoft.com/fwlink/?LinkId=225702))
    * [minimal v4.0 for develop on Visual Studio 2010](http://www.microsoft.com/en-US/download/details.aspx?id=17718)
* [Moq v4.2.x](https://github.com/Moq/moq4)
* [NLog v3.1+](http://nlog-project.org/)
* [Json.NET v6+](http://json.codeplex.com/)
* [Ude v0.1+](https://code.google.com/p/ude/)
* [AvalonEdit v5+](http://avalonedit.net/)
* 7-Zip: [SevenZipSharp v0.64+](http://sevenzipsharp.codeplex.com/) & [Libraries](http://www.7-zip.org/)
* [vsSolutionBuildEvent]({{site.lnkVSGallery}}) v0.12.6+
* [GetNuTool v1.3+](https://github.com/3F/GetNuTool)
* [vsSBE.SDK v1.0+](https://www.nuget.org/packages/vsSBE.SDK/)

You can also use the backups from [{{site.lnkBackupLib[0]}}]({{site.lnkBackupLib[1]}}) if you can't get automatically any libraries above.

### Build & Debug

* Install {% assign lnkT = "vsSolutionBuildEvent" %}{% include elem/vsixlatest %} for work with [.vssbe](../../Features/.vssbe/)
* Open **.sln** file with your Visual studio IDE
    * vsSolutionBuildEvent.sln for Visual Studio 2010
    * vsSolutionBuildEvent_2012.sln for Visual Studio 2012
    * for other version it's similar - vsSolutionBuildEvent`_X`.sln where 'X' is a number version of used Visual Studio

#### vsSolutionBuildEvent project

Find the vsSolutionBuildEvent project in solution:

* Set as StartUp project
* Open `Properties` -> `Debug`:
    * For `Start Action` - set as `Start External program`
    * Then, select your **devenv.exe**, e.g.: C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\devenv.exe
    * In `Start Options` > `Command line arguments` write the: '**/rootsuffix Exp**' (without quotes)

#### Devenv project

Find the Devenv project in solution:

* `Properties` -> `Debug`:
    * For `Start Action` - set as `Start External program`
    * Also select your devenv.exe, e.g.: C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\devenv.exe
    * In `Start Options` > `Command line arguments` write the: '**/resetaddin Devenv.Connect**' (without quotes)
    * `Enable Debuggers` - enable the `Enable the Visual Studio hosting process`
* For testing in command-line mode you should change `Command line arguments` for example: '"D:\app\App1.sln" /Rebuild' (without single quotes)
    * Also add 'Devenv.AddIn' into your '%HOMEPATH%\Documents\Visual Studio 2013\Addins' with full path to assembly, for example: '<Assembly>D:/full_path_to/Devenv.dll</Assembly>'

#### CI.MSBuild project

Find the CI.MSBuild project in solution:

* `Properties` -> `Debug`:
    * For `Start Action` - set as `Start External program`
    * Add the full path to **msbuild.exe**, for example: C:\Program Files (x86)\MSBuild\12.0\bin\msbuild.exe
    * Optional, add path to vsSolutionBuildEvent sources in `Working Directory` field, for example: D:\projects\vsSolutionBuildEvent\
    * In `Start Options` > `Command line arguments` write for example:

```{{site.msblang}}
"<path_to_SolutionFile_for_debugging>.sln" /nologo /noconsolelogger 
/l:"CI.MSBuild\bin\<Current_Configuration_Name>\CI.MSBuild.dll";lib=vsSolutionBuildEvent\bin\<Current_Configuration_Name>\ /verbosity:Diagnostic /t:Rebuild /p:Configuration=<Configuration>;Platform=<Platform>
```

#### Final

Click on `Build` > `Build Solution`

Congratulation! Now you can run the vsSBE extension over experimental VS IDE for debugging *inc. Devenv & CI.MSBuild if you need*.

Note:

*  **Unit-Tests** should automatically started for all Release-configurations. Or you can manualy start with `Test` > `Run` > `All Tests in Solution`

* The **Libraries** is managed by GetNuTool & NuGet and will be received automatically into `./packages` directory. Otherwise use the following command: 
    * `gnt.core /p:ngconfig="packages.config|..."` / `nuget restore vsSolutionBuildEvent_X.sln` 
    * or [add manually]({{site.lnkBackupLib[1]}}) if you can't get it automatically.

## Variant for Microsoft Build Tools (msbuild.exe)

{% assign icon = "glyphicon-check" %}{% include elem/gicon %} Currently, this variant still requires installed the Visual Studio SDK for your machine *(see above where to find)*

* [Clone repository](/Downloads/#Code) with git:

```{{site.msblang}}
git clone --branch=master https://github.com/3F/vsSolutionBuildEvent.git ./vsSolutionBuildEvent
```
* Restore all packages with 
    * [GetNuTool](https://github.com/3F/GetNuTool): `msbuild gnt.core` (or simply [gnt](https://github.com/3F/GetNuTool/releases/download/v1.5/gnt.bat))
    * or with [nuget.exe](https://www.nuget.org/nuget.exe)

* And use [msbuild.exe](https://github.com/3F/vsSolutionBuildEvent/blob/master/tools/msbuild.bat) for build:

```{{site.msblang}}
msbuild "vsSolutionBuildEvent.sln" /l:"packages\vsSBE.CI.MSBuild\bin\CI.MSBuild.dll" /m:4 /p:Configuration=Debug
```
build-helpers here:

* [build_[CI_Debug]](https://github.com/3F/vsSolutionBuildEvent/blob/master/build_%5BCI_Debug%5D.bat) / [build_[CI_Release]](https://github.com/3F/vsSolutionBuildEvent/blob/master/build_%5BCI_Release%5D.bat)
* [msbuild.bat](https://github.com/3F/vsSolutionBuildEvent/blob/master/tools/msbuild.bat)

**Note**:

* `./vsSolutionBuildEvent` - your path for source code (it can be absolute, e.g.: `C:\projects\vsSolutionBuildEvent`).
* `packages\vsSBE.CI.MSBuild\bin\CI.MSBuild.dll` - path to [CI.MSBuild](../../CI/CI.MSBuild/)

*this variant is also used for build automation with [AppVeyor](https://ci.appveyor.com/project/3Fs/vssolutionbuildevent)*

## What's next ?

* Create [New component](../New%20Component/)
* Improve all what you want...

Is also ready for collaboration ? use pull request features *([GitHub](https://github.com/3F/vsSolutionBuildEvent/) / [Bitbucket](https://bitbucket.org/3F/vssolutionbuildevent/))*, or send it directly as **.patch** file.
*For complex logic(as for our lexers, analyzers etc.) please also provide a correct new unit-tests.*

