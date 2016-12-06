---
layout: doc
title: Native scripting. World without Visual Studio
permalink: /doc/Examples/NativeScripting/
---
## Native scripting. World without Visual Studio

You already should know that we can work without Visual Studio at all. Read about **[CI Features](../../CI/)**, configure and have fun.

But wait ! What about if you need some scripting via vssbe, but you do not have the .sln, .csproj, .vcxproj, ... and any other project files for X place (where you need this).

The basic example of this case - [GetNuTool](https://github.com/3F/GetNuTool) project.

### How to

* Execute the following command inside parent folder of your files:

```bash
echo Microsoft Visual Studio Solution File, Format Version 11.00> vssbe.sln
```

* Now you can configure [.vssbe](../../Features/.vssbe/) as you like (via IDE or change it manually)
* Then create ~ `build.bat`:
    * To restore vsSolutionBuildEvent via [GetNuTool](https://github.com/3F/GetNuTool): `gnt /p:ngpackages="vsSBE.CI.MSBuild"` etc.
    * To activate basic [Events](../../Events/) and [Actions](../../Modes/) as you need, for example: `call "vsSBE.CI.MSBuild\bin\CI.MSBuild" "vssbe.sln" /v:m /m:4`

That's all. [Script what you like](../../Modes/).

### Advanced settings

#### I don't have project files, but I want to use VS IDE

You can also add `Project` records into your `.sln` if you plan to work through VS IDE with some your files.

Via IDE, or manually:

##### To add custom files

```bash
Project("{2150E333-8FDC-42A3-9474-1A3956D46DE8}") = "root", "root", "{4318D139-1E55-4525-838D-3853DFAC722B}"
    ProjectSection(SolutionItems) = preProject
        gnt.core = gnt.core
        build.bat = build.bat
    EndProjectSection
EndProject
```

Where:

* {4318D139-1E55-4525-838D-3853DFAC722B} - The GUID for new Project record. Generate any new.
* {2150E333-8FDC-42A3-9474-1A3956D46DE8} - The Solution Folder type.
* `root` - The name of Solution Folder.
* `gnt.core`, `build.bat` - list of files that should be available after open .sln


##### To add .targets-base files

You can also split logic into several steps as project of solution:

```bash
Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "step1.targets", "step1.targets", "{08B06F1F-FC33-4D1E-869B-6BE7E4502294}"
EndProject

Global
    GlobalSection(SolutionConfigurationPlatforms) = preSolution
        Release|Any CPU = Release|Any CPU
    EndGlobalSection
    GlobalSection(ProjectConfigurationPlatforms) = postSolution
        {08B06F1F-FC33-4D1E-869B-6BE7E4502294}.Release|Any CPU.ActiveCfg = Release|Any CPU
        {08B06F1F-FC33-4D1E-869B-6BE7E4502294}.Release|Any CPU.Build.0 = Release|Any CPU
    EndGlobalSection
EndGlobal
```

Where:

* `GlobalSection(SolutionConfigurationPlatforms)` - Solution configurations - `name|Platform`
* `GlobalSection(ProjectConfigurationPlatforms)` - Project configurations that linked to solution configurations. 
    * `Release|Any CPU.ActiveCfg` - Configuration name
    * `Release|Any CPU.Build.0` - flag of build (this line exists when flag is true)


## References

* [CI Features](../../CI/)
* [Processing modes](../../Modes/)
* [Events](../../Events/)
* [Examples & Features]({{site.docp}}/Examples/)
* [GetNuTool](https://github.com/3F/GetNuTool)