---
layout: doc
title: How to build
permalink: /doc/Dev/How to build/
---
# How to build vsSBE

Branches status:

[![master branch](https://img.shields.io/badge/master_-%7E-555555.svg?style=flat)](https://ci.appveyor.com/project/3Fs/vssolutionbuildevent/branch/master)[![Build status](https://ci.appveyor.com/api/projects/status/l38xn0j2c5an28e1/branch/master?svg=true)](https://ci.appveyor.com/project/3Fs/vssolutionbuildevent/branch/master) [![develop branch](https://img.shields.io/badge/develop-%7E-555555.svg?style=flat)](https://ci.appveyor.com/project/3Fs/vssolutionbuildevent/branch/develop)[![Build status](https://ci.appveyor.com/api/projects/status/l38xn0j2c5an28e1/branch/develop?svg=true)](https://ci.appveyor.com/project/3Fs/vssolutionbuildevent/branch/develop)

## Variant for Visual Studio ##

`Current variant is more convenient for develop & debug. Others are contained below.`

### Requirements

* MS Visual Studio 2010 or higher (You can use free [Visual Studio Community 2013](http://www.visualstudio.com/products/visual-studio-community-vs) or higher)
* Installed Microsoft Visual Studio SDK:
    * For Visual Studio 2015 - The SDK is no longer offered as a separate download and included as an optional feature in Visual Studio setup ([How to enable](https://msdn.microsoft.com/en-us/library/bb166441(v=vs.140).aspx))
    * [For Visual Studio 2013](http://www.microsoft.com/en-us/download/details.aspx?id=40758)
    * [For Visual Studio 2012](http://www.microsoft.com/en-us/download/details.aspx?id=30668)
    * [For Visual Studio 2010](http://www.microsoft.com/en-us/download/details.aspx?id=2680) (without update SP1)
    * [For Visual Studio 2010 SP1](http://www.microsoft.com/en-us/download/details.aspx?id=21835) (after update to SP1)
* Microsoft .NET Framework:
    * [minimal v4.0 for develop on Visual Studio 2010](http://www.microsoft.com/en-US/download/details.aspx?id=17718)
    * [minimal v4.5 for develop on Visual Studio 2012+](http://www.microsoft.com/en-US/download/details.aspx?id=30653) (Offline installer: [dotNetFx45_Full_x86_x64.exe](http://go.microsoft.com/fwlink/?LinkId=225702))
* [vsSBE](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/) v0.11.3+ *we use this for self-assembly*
* [NuGet](https://www.nuget.org/) (starting with VS2012, NuGet is included in every edition. For VS2010, NuGet is available through the Extension Manager - [NuGet Package Manager](https://visualstudiogallery.msdn.microsoft.com/27077b70-9dad-4c64-adcf-c7cf6bc9970c))
    * details: http://docs.nuget.org/docs/start-here/installing-nuget
* [Moq 4](https://github.com/Moq/moq4) or higher
* [NLog v2](http://nlog-project.org/) or higher
* [Json.NET v6](http://json.codeplex.com/) or higher
* [Ude v0.1](https://code.google.com/p/ude/) or higher
* [AvalonEdit v5](http://avalonedit.net/) or higher

if you have a some problems with getting libraries through NuGet, you can also use the backups from [/dev/lib/](http://sourceforge.net/projects/vssbe/files/dev/lib/)

### Build & Debug

* Install [latest vsSBE build](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/referral/118151)
* Open **.sln** file with your Visual studio IDE
    * vsSolutionBuildEvent.sln for Visual Studio 2010
    * vsSolutionBuildEvent_2012.sln for Visual Studio 2012
    * for other version it's similar - vsSolutionBuildEvent`_X`.sln where 'X' is a number version of used Visual Studio
* Find the 'vsSolutionBuildEvent' project in solution:
    * Set as StartUp project
    * Open `Properties` -> `Debug`:
        * For `Start Action` - set as `Start External program`
        * Then, select your **devenv.exe**, e.g.: C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\devenv.exe
        * In `Start Options` > `Command line arguments` write the: '**/rootsuffix Exp**' (without quotes)
* Find the 'Devenv' project in solution:
    * `Properties` -> `Debug`:
        * For `Start Action` - set as `Start External program`
        * Also select your devenv.exe, e.g.: C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\devenv.exe
        * In `Start Options` > `Command line arguments` write the: '**/resetaddin Devenv.Connect**' (without quotes)
        * `Enable Debuggers` - enable the `Enable the Visual Studio hosting process`
    * For testing in command-line mode you should change `Command line arguments` for example: '"D:\app\App1.sln" /Rebuild' (without single quotes)
        * Also add 'Devenv.AddIn' into your '%HOMEPATH%\Documents\Visual Studio 2013\Addins' with full path to assembly, for example: '<Assembly>D:/full_path_to/Devenv.dll</Assembly>'
* Find the 'CI.MSBuild' project in solution:
    * `Properties` -> `Debug`:
        * For `Start Action` - set as `Start External program`
        * Add the full path to **msbuild.exe**, for example: C:\Program Files (x86)\MSBuild\12.0\bin\msbuild.exe
        * Optional, add path to vsSolutionBuildEvent sources in `Working Directory` field, for example: D:\projects\vsSolutionBuildEvent\
        * In `Start Options` > `Command line arguments` write for example:

```bat 

"<path_to_SolutionFile_for_debugging>.sln" /nologo /noconsolelogger 
/l:"CI.MSBuild\bin\<Current_Configuration_Name>\CI.MSBuild.dll";lib=vsSolutionBuildEvent\bin\<Current_Configuration_Name>\ /verbosity:Diagnostic /t:Rebuild /p:Configuration=<Configuration>;Platform=<Platform>
```

* Click `Build` > `Build Solution`

Congratulation! Now, you can run the vsSBE extension over experimental VS IDE for debugging and also to  debug the **Devenv** & **CI.MSBuild** if you want.

Note:

*  **Unit-Tests** should automatically started for all Release-configurations. Or you can manualy start with `Test` > `Run` > `All Tests in Solution`

* **Libraries**: NLog, Json.NET, Moq, Ude, AvalonEdit - managed by NuGet and should be received automatically into `./packages` directory. Otherwise, use the following command: `nuget restore vsSolutionBuildEvent_X.sln` or try to [add manually](http://sourceforge.net/projects/vssbe/files/dev/lib/) if exists a some problems.


## Variant for Microsoft Build Tools (msbuild.exe) ##

`*` Currently this variant still requires installed the Microsoft Visual Studio SDK for your machine *(see above where to find)*

* Clone repository with git:

```bash 

git clone --branch=master https://bitbucket.org/3F/vssolutionbuildevent.git C:\projects\vssolutionbuildevent
```
* Restore all packages with [nuget.exe](https://www.nuget.org/nuget.exe) ([documentation](http://docs.nuget.org/Consume/Command-Line-Reference))

```bash 

nuget restore vsSolutionBuildEvent_2013.sln 
```
* And use msbuild.exe for build:

```bash 

"C:\Program Files (x86)\MSBuild\12.0\bin\msbuild.exe" "vsSolutionBuildEvent_2013.sln" /verbosity:detailed /l:"packages\vsSBE.CI.MSBuild.1.4.0\bin\CI.MSBuild.dll" /m:4 /p:Configuration=Debug /p:Platform="Any CPU"
```
or use [build_[CI_Debug]](https://bitbucket.org/3F/vssolutionbuildevent/src/master/build_[CI_Debug].bat) / [build_[CI_Release]](https://bitbucket.org/3F/vssolutionbuildevent/src/master/build_[CI_Release].bat)

That's all.

**Note** for example above:

* `C:\projects\vssolutionbuildevent` - your path to source code.
* `vsSolutionBuildEvent_2013.sln` - solution file for VS2013. Others available you can see in root directory.
* `C:\Program Files (x86)\MSBuild\12.0\bin\msbuild.exe` - full path to your msbuild.exe
* `C:\projects\vssolutionbuildevent\packages\vsSBE.CI.MSBuild.1.4.0\bin\CI.MSBuild.dll` - full path to the [CI.MSBuild](../../CI/CI.MSBuild/)

*this variant also used for build automation with [AppVeyor](https://ci.appveyor.com/project/3Fs/vssolutionbuildevent)*

## What's next ? ##

* Create [New component](../New%20Component/)
* Improve all what you want...

Is also ready for collaboration ? use pull request features *(on [Bitbucket](https://bitbucket.org/3F/vssolutionbuildevent/) or [GitHub](https://github.com/3F/vsSolutionBuildEvent/))*, or send this directly as **.patch** file with available contacts.
*For complex logic(as for our lexers, analyzers etc.) please also provide a correct new unit-tests.*

