[Download](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/referral/118151) (SourceForge.net)                    
![statistic](http://vssbe.sourceforge.net/stat/)

*MS Visual Studio Gallery*:

* [0d1dbfd7-ed8a-40af-ae39-281bfeca2334](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/)
* (deprecated) [a83c8d51-301c-40cc-bd03-9cb85f723a72](http://visualstudiogallery.msdn.microsoft.com/a83c8d51-301c-40cc-bd03-9cb85f723a72)

```
#!text
```

# Visual Studio. Solution Build Event (vsSBE)

This extension for additional event handling in Visual Studio. Full control for the Output-Build  And other extended events such as

    Warnings-Build, Errors-Build, Output-Build, Pre-Build, Post-Build, Cancel-Build

Ability to handle events to all subprojects at once in solution as Solution-Events (feature is not provided by default for VS) or for each project a singly.

Examples of using is contained below & [Visual Studio Gallery page](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/) - *scripts, solutions, etc.,*


* [Change List](https://bitbucket.org/3F/vssolutionbuildevent/raw/master/changelog.txt)

* [Official Documentation / Screenshots](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/)

* [Archive](Archive.Examples)

## How to build vsSBE ##

### Requirements ###

* MS Visual Studio 2010 or higher
* Installed Microsoft Visual Studio SDK:
* * [For Visual Studio 2013](http://www.microsoft.com/en-us/download/details.aspx?id=40758)
* * [For Visual Studio 2012](http://www.microsoft.com/en-us/download/details.aspx?id=30668)
* * [For Visual Studio 2010](http://www.microsoft.com/en-us/download/details.aspx?id=2680) (without update SP1)
* * [For Visual Studio 2010 SP1](http://www.microsoft.com/en-us/download/details.aspx?id=21835) (after update to SP1)
* Microsoft .NET Framework:
* * [minimal v4.0 for develop on Visual Studio 2010](http://www.microsoft.com/en-US/download/details.aspx?id=17718)
* * [minimal v4.5 for develop on Visual Studio 2012](http://www.microsoft.com/en-US/download/details.aspx?id=30653) (Offline installer: [dotNetFx45_Full_x86_x64.exe](http://go.microsoft.com/fwlink/?LinkId=225702))
* * [minimal v4.5.1 for develop on Visual Studio 2013](http://www.microsoft.com/en-US/download/details.aspx?id=40779)
* [vsSBE](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/) v0.8.1 or higher
* [NuGet](https://www.nuget.org/) (starting with VS2012, NuGet is included in every edition. For VS2010, NuGet is available through the Extension Manager - [NuGet Package Manager](https://visualstudiogallery.msdn.microsoft.com/27077b70-9dad-4c64-adcf-c7cf6bc9970c))
* * more detail: http://docs.nuget.org/docs/start-here/installing-nuget
* [Moq 4](https://github.com/Moq/moq4) or higher
* [NLog v2](http://nlog-project.org/) or higher
* [Json.NET v6](http://json.codeplex.com/) or higher

### Build ###

* Install [latest vsSBE build](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/referral/118151)
* Open **.sln** file with your Visual studio
* * vsSolutionBuildEvent.sln for Visual Studio 2010
* * vsSolutionBuildEvent_2012.sln for Visual Studio 2012
* * other similar vsSolutionBuildEvent`_X`.sln where 'X' is a number version of used Visual Studio
* Find the 'vsSolutionBuildEvent' project in solution:
* * Set as SturtUp project
* * Open `Properties` → `Debug`:
* * * For `Start Action` - set as `Start External program`
* * * Then, select your **devenv**, e.g.: `C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\devenv.exe`
* * In the `Start Options` → `Command line arguments` write the: '**/rootsuffix Exp**' (without quotes)
* Click `Build` → `Build Solution`
* Libraries: NLog, Json.NET, Moq - managed by NuGet and should be received automatically to ./packages directory. Otherwise, try add manually if exist some problems.

Congratulation! Now, you can running the vsSBE extension over experimental VS IDE for debugging

**Note about Unit-Tests**:

* Tests should be automatically running for all release-configurations after building. Or you can manualy start with `Test` → `Run` → `All Tests in Solution`
* Moq library also should automatically installed with NuGet, if not - simply run the following command in the [Package Manager Console](http://docs.nuget.org/docs/start-here/using-the-package-manager-console):
`PM> Install-Package Moq`

### Have a question ? ###

If you have a question or have a some problem with build, just [create the new Issue](https://bitbucket.org/3F/vssolutionbuildevent/issues/new)

If you have a some patch, - use the **pull request** *(on Bitbucket or GitHub)*,  or send directly as **.patch** file with available contacts


# Solutions of community #

*If you have your own solutions/examples of using this extension, [you can share](https://bitbucket.org/3F/vssolutionbuildevent/wiki/create) with the community your experiences*

## List  ##
* [Version number](Examples/Version number)





...
