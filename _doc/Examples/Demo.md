---
layout: doc
title: Demo projects
permalink: /doc/Examples/Demo/
---

# Demo projects

## For users

### CI.MSBuild.Demo

#### Sample 1

* [With native C++ projects](https://github.com/3F/CI.MSBuild.Demo/tree/master/native%20C%2B%2B/Sample1).
* [With .NET projects](https://github.com/3F/CI.MSBuild.Demo/tree/master/.NET/Sample1).

This is a simple example ([Readme.txt](https://github.com/3F/CI.MSBuild.Demo/blob/master/native%20C%2B%2B/Sample1/Readme.txt)) of work with - CI.MSBuild / vsSolutionBuildEvent. You can see next features:

* Unified work in different environment with MSBuild & Visual Studio.
* Work with [FileComponent](../../Scripts/SBE-Scripts/Components/FileComponent/)
* Work with [C# Mode](../../Modes/CSharp/) / [Targets Mode](../../Modes/Targets/) / [Files Mode](../../Modes/) / [Interpreter Mode](../../Modes/)
* How to detect the first & last project of build-order in solution of Visual Studio. And how to use directly [SBE-Scripts](../../Scripts/SBE-Scripts/) engine from C# Mode, for example:

```csharp

   ...
    ProjectsMap map = new ProjectsMap(@"$(SolutionPath)");

    string data = @"

        #[( #[Build type] != Clean )
        {
            #[var firstProject = {0}] #[var lastProject = {1}]
        }
        else {
            #[var firstProject = {1}] #[var lastProject = {0}]
        }]

    ";

    cmd.SBEScript.parse(String.Format(data, map.getFirst().name, map.getLast().name));
   ...
```
[gist](https://gist.github.com/3F/b1f613511737121a4bd1)

* and others...


## For developers

### ClientDemo

* [Source code on C#](https://github.com/3F/vsSolutionBuildEvent/tree/master/ClientDemo)

It shows how to work with **client.vssbe.dll** features. For external work with events from our core library.

How to use, see **[here](../../API/#create-client-vssbe-dll)**


# References

* [Examples & Features](../../Examples/)
* [SBE-Scripts](../../Scripts/SBE-Scripts/)
* [Processing modes](../../Modes/)
* [API](../../API/)
* [C# Mode](../../Modes/CSharp/)
    * [ICommand](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/Actions/ICommand.cs) 
* [Scheme of vsSolutionBuildEvent projects](../../Scheme/)