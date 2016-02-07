---
layout: doc
title: Demo projects
permalink: /doc/Examples/Demo/
---

# Demo projects

List of available demo projects as example of basic work, features and similar.

## CI.MSBuild.Demo

For work with MSBuild Tool or for work **without** Visual Studio you have a [few ways](../../Features/Solution-wide/#how-about-msbuild-tool-or-how-to-work-without-visual-studio). And if your choice the [CI.MSBuild](../../CI/CI.MSBuild/) you also should select how it will be automatically distributed on another machines (where some of this utilities may not exist at all).

The most easy variant it is the non-binary [GetNuTool](https://github.com/3F/GetNuTool) ~8kb. However, you can also use standard NuGet clients and any other tools.

In samples below we'll consider both variant.

### Sample 2 (via GetNuTool)

[/Sample2](https://github.com/3F/CI.MSBuild.Demo/tree/master/Sample2) - [![](https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat)](https://ci.appveyor.com/project/3Fs/ci-msbuild-demo/build/build-9) :: build-9: 9f3658e0

* [Artifacts](https://ci.appveyor.com/project/3Fs/ci-msbuild-demo/build/build-9/artifacts)

Tested on:

* CI.MSBuild: 
    * `v1.6.0.3805 [ 48df3db ]`
* vsSolutionBuildEvent: 
    * `v0.12.7.3805 [ 48df3db ]`

This is a simple example for work with - CI.MSBuild / vsSolutionBuildEvent. You will see next features:

* Generate the unique label for all project as version of this or similar.
* Create the archives of binaries from projects:
* Create the common 'bin' folder if needed and put the following artifacts:

```
├───bin
│       ClassLibrary1_2016.02.07_12;45;49.1366_[5EAFE1F]_[net45].7z
│       ConsoleApplication1_2016.02.07_12;45;49.1366_[5EAFE1F]_[net45].tar.xz
│       Release_notes.txt
│       Sample2_2016.02.07_12;45;49.1366_[5EAFE1F]_[net45].zip
│
```

Where:

* '.7z', '.tar.xz', '.zip' the final archives which is created by [SevenZipComponent]({{site.docp}}/Scripts/SBE-Scripts/Components/SevenZipComponent/)
* 'Release_notes.txt' - as a summary of this, for example:

```
This assembled from:

* Configuration:   'Debug'
* .NET version:     v4.5 (net45);
* MSBuild Tools:    v14.0;
* Label:            2016.02.07_12;45;49.1366_[5EAFE1F];
* Sha1:             5EAFE1FBA3BEDAA59302AB42D7E9210AC4566C6C;
```

### Sample 1 (via official NuGet client)

Note: it is old example for v1.5.0 with only update for using of the latest library v1.6.1207.

[Readme](https://github.com/3F/CI.MSBuild.Demo/blob/master/Sample1/native%20C%2B%2B/Readme.md)

* [With native C++ projects](https://github.com/3F/CI.MSBuild.Demo/tree/master/Sample1/native%20C%2B%2B).
    * [![](https://img.shields.io/badge/native_C%2B%2B-passing-brightgreen.svg?style=flat)](https://ci.appveyor.com/project/3Fs/ci-msbuild-demo/build/build-4) :: build-4: 9e1cd110
* [With .NET projects (CLR)](https://github.com/3F/CI.MSBuild.Demo/tree/master/Sample1/.NET).
    * [![](https://img.shields.io/badge/.NET_(CLR)-passing-brightgreen.svg?style=flat)](https://ci.appveyor.com/project/3Fs/ci-msbuild-demo/build/build-5) :: build-5: 9e1cd110

Tested on:

* CI.MSBuild: 
    * `v1.6.0.3805 [ 48df3db ]`
    * `v1.5.0.2692 [ 8bde22a ]`
* vsSolutionBuildEvent: 
    * `v0.12.7.3805 [ 48df3db ]`
    * `v0.12.3.2692 [ 8bde22a ]`

This is a simple example for work with - CI.MSBuild / vsSolutionBuildEvent. You will see next features:

* Unified work in different environment with MSBuild & Visual Studio.
* Work with [FileComponent](../../Scripts/SBE-Scripts/Components/FileComponent/)
* Work with [C# Mode](../../Modes/CSharp/) / [Targets Mode](../../Modes/Targets/) / [Files Mode](../../Modes/) / [Interpreter Mode](../../Modes/)
* How to detect the first & last project of build-order in solution of Visual Studio. And how to use directly [SBE-Scripts](../../Scripts/SBE-Scripts/) engine from C# Mode, for example:

{% raw %}
```csharp
    ...
    ProjectsMap map = new ProjectsMap(@"$(SolutionPath)");

    string data = @"

        #[( #[Build type] != Clean )
        {{
            #[var firstProject = {0}] #[var lastProject = {1}]
        }}
        else {{
            #[var firstProject = {1}] #[var lastProject = {0}]
        }}]
    ";

    cmd.SBEScript.parse(String.Format(data, map.getFirst().name, map.getLast().name));
   ...
```
{% endraw %}

[gist](https://gist.github.com/3F/b1f613511737121a4bd1)

* and other...

**Note:** In v0.12.4+ you can use simply [`#[Build solution.path("app.sln").First.name]`](../../Scripts/SBE-Scripts/Components/BuildComponent/#solution) etc.

As result you can see, for example:

```
 - I'm the action in 'Script Mode' for Pre-Rebuild Event :: I started Before Rebuild - 'ClassLibrary2' (btw, StartUp project - 'Sample1').
 - I'm very simple action in 'Interpreter Mode' :: I also started Before - 'ClassLibrary2'. 
 - I'm the action in 'Script Mode' for Post-Rebuild Event :: I started After Rebuild the all projects. I mean after 'ConsoleApplication1'!
 - I only for Build/Rebuild operations and I'm working only if I can't see any errors with your build.
```


## ClientDemo

* [Source code on C#](https://github.com/3F/vsSolutionBuildEvent/tree/master/ClientDemo)
    * All binaries of ClientDemo: [{{site.lnkAll_ClientDemo[0]}}]({{site.lnkAll_ClientDemo[1]}})

It shows how to work with **client.vssbe.dll** features. For external work with events **from** our core library.

How to use, see **[here](../../API/#create-client-vssbe-dll)**


![](../../Resources/Demo/DemoClient.png)

![](../../Resources/Demo/DemoClient_cim.png)


# References

* [Examples & Features](../../Examples/)
* [SBE-Scripts](../../Scripts/SBE-Scripts/)
* [Processing modes](../../Modes/)
* [API](../../API/)
* [C# Mode](../../Modes/CSharp/)
    * [ICommand](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/Actions/ICommand.cs) 
* [Scheme of vsSolutionBuildEvent projects](../../Scheme/)