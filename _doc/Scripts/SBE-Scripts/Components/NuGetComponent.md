---
layout: doc
title: NuGetComponent
description: Support of NuGet packages.
permalink: /doc/Scripts/SBE-Scripts/Components/NuGetComponent/
---
# NuGetComponent

Support of [NuGet](https://www.nuget.org/) packages.

## gnt

[ v0.12.6+ ]

For work with packages via [GetNuTool](https://github.com/3F/GetNuTool) logic.

### raw

Push raw command to GetNuTool core.

```java
void gnt.raw(string command)
```

Arguments:

* command - [Available command](https://github.com/3F/GetNuTool/blob/master/README.md) to execute.

For example:

```minid
#[NuGet gnt.raw("/p:ngpackages=\"7z.Libs/15.12.0;vsSBE.CI.MSBuild/1.5.1:../packages/CI.MSBuild\"")]
```
```minid
#[NuGet gnt.raw("/t:pack /p:ngin=\"D:\tmp\7z.Libs\" /p:ngout=\"newdir/\"")]
```

Notes: 

* The solution directory is path by default for all commands.
* The `get` command (`/t:get`) of GetNuTool is command by default as in original tool.

# References

* [NuGet](https://www.nuget.org/)
* [GetNuTool](https://github.com/3F/GetNuTool)
* [SBE-Scripts]({{site.docp}}/Scripts/SBE-Scripts/)
* [Examples & Features]({{site.docp}}/Examples/)