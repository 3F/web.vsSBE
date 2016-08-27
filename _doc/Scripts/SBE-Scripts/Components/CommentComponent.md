---
layout: doc
title: CommentComponent
description: The comments for scripts.
permalink: /doc/Scripts/SBE-Scripts/Components/CommentComponent/
---
# CommentComponent

The comments for scripts.

**Tip:** the alternative way to fully avoid evaluation from containers of any components - simply remove the first symbol `#`.

**Available syntax**

The multiline comment:

```{{site.sbelang}}
#[""]
```

Samples:

```{{site.sbelang}}
#["
    Example
          " Description 1 "
          " Description 2 "
"]
```

```{{site.sbelang}}
#[" Example "]
```

```{{site.sbelang}}
#[" 
    To restore packages with GetNuTool
    It's important for packages of solution-level in VS2015
    https://github.com/NuGet/Home/issues/522
    
    TODO: later it can be as part of engine...
"]
#[($([System.Convert]::ToInt32("$(VisualStudioVersion.Replace('.', ''))")) >= 140)
{
    #[var msbuild = "$(MSBuildToolsPath)\msbuild.exe"]
    #[IO scall(#[var msbuild], "gnt.core /p:ngconfig=\".nuget/packages.config\"", 60)]
}]
```