---
layout: doc
title: Native scripting. World without Visual Studio
permalink: /doc/Examples/NativeScripting/
---
## Native scripting

***World without Visual Studio.***

You can easily control scripts beyond of the Visual Studio IDE.

Moreover this may be the only way for projects like [hMSBuild](https://github.com/3F/hMSBuild) or [GetNuTool](https://github.com/3F/GetNuTool) and so on.

{% assign img = "vsSolutionBuildEvent.CIM.GUI.png" %}{% assign attr = "width='660' height='442'" %}{% include elem/lightbox %}

### Modern versions 1.14.1+

Just command this:

> [`gnt`](https://3F.github.com/GetNuTool/releases/latest/gnt/)` /p:ngpackages="vsSolutionBuildEvent/{{site.lnkCur_VSPackage[0]}}"` [[ ? ](https://github.com/3F/GetNuTool#getnutool)]

Or run helper [{{site.lnkCur_getCIM[1]}}]({{site.lnkCur_getCIM[2]}})

Then call from working dir:

```bash
packages\vsSolutionBuildEvent.{{site.lnkCur_VSPackage[0]}}\GUI.bat
```

After, create ~ `build.bat` for restoring and activation if no VS IDE.

To activate [Events](../../Events/) and [Actions](../../Modes/), for example:

```bash
call packages\vsSolutionBuildEvent.{{site.lnkCur_VSPackage[0]}}\cim.cmd /v:m /m:4
```

Or use available bootstrap from projects such as [Conari](https://github.com/3F/Conari/blob/master/build.bat), and [so on.](https://github.com/3F?tab=repositories)

That's all. [Script what you like](../../Modes/).

### Obsolete versions before 1.14.1

Execute the following command inside folder where planned :

```bash
echo Microsoft Visual Studio Solution File, Format Version 11.00> vssbe.sln
```

* Now you can configure [.vssbe](../../Features/.vssbe/) as you need (via IDE or change it manually)
* Then, repeat [steps above](#modern-versions-1141), like for 1.14.1 except activation.

To activate basic [Events](../../Events/) and [Actions](../../Modes/), command this, for example:

```bash
call "{path_to_package}\bin\CI.MSBuild" "vssbe.sln" /v:m /m:4
```

To restore package via [GetNuTool](https://github.com/3F/GetNuTool): 

```
gnt /p:ngpackages="vsSolutionBuildEvent"
```
or before v1.14:
```
gnt /p:ngpackages="vsSBE.CI.MSBuild"
```

### Advanced settings for .sln

You can also add `Project` records into your `.sln` if you've plan to work through VS IDE with some your files.

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